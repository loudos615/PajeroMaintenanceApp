import { Camera, Check, ImagePlus, PenLine, RotateCcw } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";
import {
  captureOdometerCrop,
  cropImageFile,
  OdometerOcrError,
  recognizeOdometer,
  validateMileage
} from "../ocr/odometerOcr";
import type { OdometerReading, VehicleProfile } from "../types";
import { formatKm } from "../utils/format";
import { createId } from "../utils/id";

interface OdometerScanProps {
  profile: VehicleProfile;
  initialMode: "manual" | "scan";
  onSave: (reading: OdometerReading) => Promise<void>;
}

interface DetectedMileage {
  value: number;
  rawText: string | null;
  method: "manual" | "ocr";
}

function messageFromCameraError(error: unknown): string {
  if (error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "SecurityError")) {
    return "Camera permission denied";
  }

  if (error instanceof DOMException && (error.name === "NotFoundError" || error.name === "NotReadableError")) {
    return "Camera not available";
  }

  return "Camera not available";
}

export function OdometerScan({ profile, initialMode, onSave }: OdometerScanProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [mode, setMode] = useState<"manual" | "scan">(initialMode);
  const [manualValue, setManualValue] = useState(profile.currentOdometerKm ? String(profile.currentOdometerKm) : "");
  const [detected, setDetected] = useState<DetectedMileage | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (mode !== "scan" || detected) return;

    let mounted = true;

    async function startCamera() {
      setCameraError(null);
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera not available");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }
          },
          audio: false
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        setCameraError(messageFromCameraError(error));
      }
    }

    void startCamera();

    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [mode, detected]);

  async function handleManualSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = Number(manualValue);
    const error = validateMileage(value, profile.currentOdometerKm);

    if (error && !error.includes("lower than")) {
      setOcrError(error);
      return;
    }

    if (error?.includes("lower than")) {
      const confirmed = window.confirm(`${error} Save ${formatKm(value)} anyway?`);
      if (!confirmed) return;
    }

    setDetected({
      value,
      rawText: null,
      method: "manual"
    });
  }

  async function runOcr(canvas: HTMLCanvasElement) {
    setBusy(true);
    setOcrError(null);
    setProgress("Preparing OCR");

    try {
      const result = await recognizeOdometer(canvas, (message, amount) => {
        const percent = amount !== null ? ` ${Math.round(amount * 100)}%` : "";
        setProgress(`${message}${percent}`);
      });
      const validation = validateMileage(result.value, profile.currentOdometerKm);

      if (validation && !validation.includes("lower than")) {
        throw new OdometerOcrError(validation);
      }

      setDetected({
        value: result.value,
        rawText: result.rawText,
        method: "ocr"
      });
    } catch (error) {
      setOcrError(error instanceof Error ? error.message : "OCR failed");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }

  async function handleCapture() {
    if (!videoRef.current) {
      setCameraError("Camera not available");
      return;
    }

    try {
      await runOcr(captureOdometerCrop(videoRef.current));
    } catch (error) {
      setOcrError(error instanceof Error ? error.message : "OCR failed");
    }
  }

  async function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await runOcr(await cropImageFile(file));
    } catch (error) {
      setOcrError(error instanceof Error ? error.message : "OCR failed");
    } finally {
      event.target.value = "";
    }
  }

  async function confirmDetected() {
    if (!detected) return;

    const validation = validateMileage(detected.value, profile.currentOdometerKm);
    if (validation?.includes("lower than")) {
      const confirmed = window.confirm(`${validation} Save ${formatKm(detected.value)} anyway?`);
      if (!confirmed) return;
    }

    await onSave({
      id: createId("odo"),
      date: new Date().toISOString(),
      odometerKm: detected.value,
      method: detected.method,
      rawOcrText: detected.rawText,
      confirmed: true
    });

    setManualValue(String(detected.value));
    setDetected(null);
    setMode("manual");
  }

  return (
    <main className="page">
      <section className="section-block">
        <p className="eyebrow">Odometer</p>
        <h1>Update mileage</h1>
        <p className="muted">Current saved reading: {formatKm(profile.currentOdometerKm)}</p>

        <div className="segmented-control" role="tablist" aria-label="Odometer update mode">
          <button className={mode === "manual" ? "chip chip--active" : "chip"} type="button" onClick={() => setMode("manual")}>
            <PenLine aria-hidden="true" size={18} />
            Manual
          </button>
          <button className={mode === "scan" ? "chip chip--active" : "chip"} type="button" onClick={() => setMode("scan")}>
            <Camera aria-hidden="true" size={18} />
            Camera OCR
          </button>
        </div>
      </section>

      {detected ? (
        <section className="confirm-panel">
          <p className="eyebrow">Confirm reading</p>
          <h2>Detected mileage: {formatKm(detected.value)}</h2>
          {detected.rawText ? <p className="muted">OCR text: {detected.rawText || "No text returned"}</p> : null}
          <div className="button-grid">
            <button className="primary-button" type="button" onClick={confirmDetected}>
              <Check aria-hidden="true" size={20} />
              Confirm
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setManualValue(String(detected.value));
                setDetected(null);
                setMode("manual");
              }}
            >
              <PenLine aria-hidden="true" size={20} />
              Edit manually
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setDetected(null);
                setMode("scan");
              }}
            >
              <RotateCcw aria-hidden="true" size={20} />
              Scan again
            </button>
          </div>
        </section>
      ) : null}

      {mode === "manual" && !detected ? (
        <section className="section-block">
          <form className="form-stack" onSubmit={handleManualSubmit}>
            <label>
              Odometer km
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                type="number"
                value={manualValue}
                onChange={(event) => setManualValue(event.target.value)}
                placeholder="245000"
                required
              />
            </label>
            {ocrError ? <p className="form-error">{ocrError}</p> : null}
            <button className="primary-button" type="submit">
              Save reading
            </button>
          </form>
        </section>
      ) : null}

      {mode === "scan" && !detected ? (
        <section className="section-block camera-section">
          <div className="camera-frame">
            <video ref={videoRef} muted playsInline autoPlay />
            <div className="camera-guide" aria-hidden="true" />
          </div>

          {cameraError ? <p className="form-error">{cameraError}</p> : null}
          {ocrError ? <p className="form-error">{ocrError}</p> : null}
          {progress ? <p className="muted">{progress}</p> : null}

          <button className="primary-button" type="button" onClick={handleCapture} disabled={busy || !!cameraError}>
            <Camera aria-hidden="true" size={20} />
            {busy ? "Reading..." : "Capture"}
          </button>

          <label className="file-fallback">
            <ImagePlus aria-hidden="true" size={20} />
            Use photo fallback
            <input accept="image/*" capture="environment" type="file" onChange={handleFileInput} />
          </label>
        </section>
      ) : null}
    </main>
  );
}
