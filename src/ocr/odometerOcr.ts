import { createWorker, type LoggerMessage } from "tesseract.js";

export interface OcrResult {
  value: number;
  rawText: string;
}

export type OcrProgressHandler = (message: string, progress: number | null) => void;

export class OdometerOcrError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OdometerOcrError";
  }
}

function drawProcessedCrop(
  draw: (context: CanvasRenderingContext2D, width: number, height: number) => void,
  width: number,
  height: number
): HTMLCanvasElement {
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new OdometerOcrError("OCR failed");
  }

  context.imageSmoothingEnabled = true;
  draw(context, canvas.width, canvas.height);

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = image.data;

  for (let index = 0; index < data.length; index += 4) {
    const gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
    const contrasted = Math.max(0, Math.min(255, (gray - 128) * 1.85 + 128));
    const thresholded = contrasted > 138 ? 255 : 0;
    data[index] = thresholded;
    data[index + 1] = thresholded;
    data[index + 2] = thresholded;
  }

  context.putImageData(image, 0, 0);
  return canvas;
}

export function captureOdometerCrop(video: HTMLVideoElement): HTMLCanvasElement {
  const sourceWidth = video.videoWidth;
  const sourceHeight = video.videoHeight;

  if (!sourceWidth || !sourceHeight) {
    throw new OdometerOcrError("Camera not available");
  }

  const cropWidth = sourceWidth * 0.78;
  const cropHeight = sourceHeight * 0.24;
  const cropX = (sourceWidth - cropWidth) / 2;
  const cropY = (sourceHeight - cropHeight) / 2;

  return drawProcessedCrop(
    (context, width, height) => {
      context.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
    },
    cropWidth,
    cropHeight
  );
}

export async function cropImageFile(file: File): Promise<HTMLCanvasElement> {
  const image = await loadImage(file);
  const cropWidth = image.naturalWidth * 0.82;
  const cropHeight = image.naturalHeight * 0.28;
  const cropX = (image.naturalWidth - cropWidth) / 2;
  const cropY = (image.naturalHeight - cropHeight) / 2;

  return drawProcessedCrop(
    (context, width, height) => {
      context.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
    },
    cropWidth,
    cropHeight
  );
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new OdometerOcrError("OCR failed"));
    };
    image.src = url;
  });
}

export function extractMileage(rawText: string): number | null {
  const compactDigits = rawText.replace(/\D/g, "");
  const spacedCandidates = rawText
    .replace(/\D/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const candidates = [...spacedCandidates, compactDigits]
    .map((value) => value.replace(/\D/g, ""))
    .filter((value) => value.length >= 5 && value.length <= 7)
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value > 50000 && value < 999999);

  if (!candidates.length) return null;

  return [...new Set(candidates)].sort((a, b) => {
    const lengthDifference = String(b).length - String(a).length;
    return lengthDifference || b - a;
  })[0];
}

export async function recognizeOdometer(
  canvas: HTMLCanvasElement,
  onProgress?: OcrProgressHandler
): Promise<OcrResult> {
  let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

  try {
    worker = await createWorker("eng", 1, {
      logger: (message: LoggerMessage) => {
        onProgress?.(message.status, typeof message.progress === "number" ? message.progress : null);
      }
    });

    await worker.setParameters({
      tessedit_char_whitelist: "0123456789"
    });

    const result = await worker.recognize(canvas);
    const rawText = result.data.text.trim();
    const value = extractMileage(rawText);

    if (value === null) {
      throw new OdometerOcrError("Could not detect mileage");
    }

    return { value, rawText };
  } catch (error) {
    if (error instanceof OdometerOcrError) throw error;
    throw new OdometerOcrError("OCR failed");
  } finally {
    await worker?.terminate();
  }
}

export function validateMileage(value: number, previousKm: number | null): string | null {
  if (!Number.isInteger(value)) return "Mileage must be a whole number.";
  if (String(value).length < 5 || String(value).length > 7) return "Mileage must be 5 to 7 digits.";
  if (value <= 50000) return "Mileage must be higher than 50,000 km.";
  if (value >= 999999) return "Mileage must be lower than 999,999 km.";
  if (previousKm !== null && value < previousKm) {
    return "Mileage is lower than the saved odometer.";
  }
  return null;
}
