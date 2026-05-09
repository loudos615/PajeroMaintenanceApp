# Maintenance and inspection plan for the 2001 V78W 4M41 automatic Pajero

This database is for the entity["vehicle","Mitsubishi Pajero","third-generation V78W long-wheelbase 4M41 automatic"] identified by the supplied VIN as a Europe-destination, left-hand-drive, 5-door, automatic, long-wheelbase V7-series vehicle with the 4M41 3.2 DI-D engine and 2001 model year. The 2001 factory workshop material also confirms that V78W is the long-wheelbase 4M41 model line and that the relevant automatic transmission family is V5A51. citeturn15search0turn16search1turn41view0

The highest-confidence official interval table that is easily accessible online is a later factory Pajero periodic-maintenance manual for the 4M41 platform. It is not the exact 2001 Europe/JDM owner pack, but it is still very useful because it covers the 4M41 diesel, Pajero 4WD systems, EGR checks, valve-clearance checks, common-rail learning, transfer and differential oils, brake fluid, and severe-use definitions. A later Australia-market official schedule disagrees on a few intervals, especially engine oil, fuel filter, and ATF. Because of that, the table below separates **official** intervals from **community/preventive** intervals and uses the conservative value for app recommendations on an older 2001 vehicle. citeturn30search0turn32search1turn34search6turn34search8turn34search9

## Interval policy for the app

For this vehicle, the safest app logic is:

- store the **official interval** exactly as verified from factory material where available;
- store a separate **preventive interval** for age, mileage, tow use, dusty roads, salted winters, and unknown history;
- treat missing factory replacement intervals as **condition-based items** with recurring inspections;
- flag a **one-time after-purchase baseline service** for all fluids, filters, brake/HBB checks, timing-chain listening/inspection, 4WD vacuum checks, and corrosion checks. citeturn30search0turn41view1turn43view0turn44search0turn29search1turn29search25

## Maintenance database for powertrain and driveline

### Engine

| System | Item | Action type: Replace / Inspect / Clean / Lubricate / Adjust / Test / Flush / Diagnose | Official interval in km | Official interval in months or years | Community or preventive interval in km | Community or preventive interval in months or years | First service after purchase with unknown history | Priority | Difficulty | Parts or fluids needed | Fluid specification and capacity, if relevant | Symptoms if neglected | Notes specific to Pajero III V78W 4M41 automatic | Source type | Source citation or link |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|
| Engine | Engine oil | Replace | 20,000 | 12 mo | 7,500 | 12 mo | Yes | Critical | Easy DIY | Engine oil, drain-plug washer | Later official 4M41 owner-manual pages show **9.8 L total** including filter and cooler; use the correct diesel oil spec and confirm first-service refill on this exact vehicle | Sooted oil, timing-chain wear, turbo wear, low pressure | Official schedules disagree by market: one factory Pajero schedule shows 20,000 km/12 mo normal and 10,000 km severe; later Australia schedule shows 15,000 km/12 mo normal and 7,500 km severe. The safe app interval is 7,500 km | Official manual / Owner manual | O3; O4; O8 |
| Engine | Oil filter | Replace | 20,000 | 12 mo | 7,500 | 12 mo | Yes | Critical | Easy DIY | Oil filter | Change with engine oil | Dirty oil, delayed pressure, increased wear | Do not separate it from oil service on an older 4M41 | Official manual / Owner manual | O3; O4; O8 |
| Engine | Air cleaner element | Inspect | 20,000 | 12 mo | 10,000 | 6 mo | Yes | High | Easy DIY | Air filter | — | Smoke, poor power, higher fuel use, turbo dusting risk | Official severe-use regime is shorter in dust and off-road use | Official manual | O3 |
| Engine | Air cleaner element | Replace | 40,000 | 24 mo | 20,000 | 12 mo | Yes | High | Easy DIY | Air filter | — | Restricted airflow, smoke, turbo contamination | Factory schedule gives 40,000 km normal for diesel; on an old off-road truck 20,000 km is safer | Official manual | O3 |
| Engine | Fuel filter | Replace | 40,000 | 24 mo | 20,000 | 12 mo | Yes | Critical | Medium DIY | Fuel filter, seals | — | Hard start, surging, rail-pressure faults, pump wear | Later Australia schedule points to about 30,000 km; conservative app value is 20,000 km/12 mo | Official manual / Forum | O3; O8; C9 |
| Engine | Fuel-filter water / contamination | Inspect | — | — | 5,000 | 6 mo | Yes | High | Easy DIY | Drain hose, container | — | Filter lamp, hesitation, corrosion in injection parts | Check immediately if the fuel-filter lamp or water warning appears | Owner manual / Forum | O4; C9 |
| Engine | Coolant level and cooling system | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | Critical | Easy DIY | Correct premix coolant, clamps as needed | Match coolant chemistry, do not mix unknown types | Overheating, heater weakness, hidden coolant loss | On LWB vehicles, rear heater pipes are a known corrosion leak point | Official manual / Forum | O3; C6 |
| Engine | Coolant | Flush | 60,000 | 48 mo | 40,000 | 36 mo | Yes | Critical | Medium DIY | Coolant, drain sealing washers | Exact 2001 V78W refill figure was not cleanly verifiable from accessible factory pages; confirm actual refill on first measured service | Corrosion, overheating, water-pump wear | Store the vehicle-confirmed refill amount in the app after the first flush | Official manual / Forum | O3; C6 |
| Engine | Thermostat / radiator / main hoses | Inspect | — | — | 40,000 | 24 mo | Yes | High | Medium DIY | Thermostat, gasket, hoses, clamps if needed | — | Slow warm-up, unstable temp, overheating, coolant smell | No clean factory replacement interval found; treat as condition-based but inspect at every coolant service | Official manual / Forum | O3; C6 |
| Engine | Accessory belts | Inspect / Adjust | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Medium DIY | Belts | Later factory 4M41 procedure gives measured tension values | Squeal, no charging, poor cooling | Especially important because the 4M41 belt condition affects alternator and cooling support systems | Official manual | O3 |
| Engine | Accessory belts | Replace | — | — | 60,000 | 48 mo | Yes | High | Medium DIY | Belts | — | Belt breakage, charging loss, overheating | No exact factory replacement interval found in the accessible 2001 material; use age-based preventive replacement | Official manual / Specialist | O3; C2 |
| Engine | Belt pulleys / idlers / tensioners | Inspect | — | — | 20,000 | 12 mo | Yes | High | Medium DIY | Idlers, pulleys if needed | — | Chirp, rough bearing noise, belt throw | Replace with belts if any roughness or wobble is found | Specialist / Forum | C2; C8 |
| Engine | Vacuum-pump oil hose | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Medium DIY | Hose, clamps | — | Oil seepage, vacuum-related issues | Explicitly listed in the factory diesel maintenance schedule | Official manual | O3 |
| Engine | Intake air hose / turbo oil hose / intercooler path | Inspect | 40,000 | 24 mo | 20,000 | 12 mo | Yes | High | Easy DIY | Hoses, clamps, seals | — | Boost leaks, oily misting, poor power | Check charge-air hoses and intercooler for oil accumulation and leaks | Official manual / Forum | O3; C3 |
| Engine | Turbocharger | Inspect | — | — | 20,000 | 12 mo | Yes | Critical | Workshop | Intake seals, feed/return sealing parts if removed | — | Whine, smoke, power loss, oil use | Inspect shaft play and compressor condition when intake hoses are removed | Official manual / Forum | O3; C8 |
| Engine | Crankcase ventilation / breather hoses | Clean / Inspect | — | — | 20,000 | 12 mo | Yes | Medium | Easy DIY | Hoses, clips | — | Oil mist, manifold sludge, external seepage | Oil mist from the breather mixes with EGR soot and forms the 4M41 intake sludge seen by owners | Forum / Specialist | C3 |
| Engine | EGR system | Inspect / Clean | 20,000 | 12 mo | 40,000 | 24 mo | Yes | High | Medium DIY | Gaskets, cleaner | — | Low-speed hesitation, smoke, sticky intake parts | Factory schedule includes an EGR inspection item; many older vehicles benefit from periodic cleaning | Official manual / Forum | O3; C3 |
| Engine | Intake manifold carbon buildup | Clean | — | — | 80,000 | 48 mo | Yes | High | Advanced DIY | Intake gaskets, cleaner | — | Power loss, smoke, airflow restriction | Community consensus is that manifold cross-section can reduce badly if EGR and oil mist are left alone | Forum / Specialist | C3 |
| Engine | Glow plugs | Test / Replace on condition | — | — | 100,000 | 60 mo | Yes | Medium | Medium DIY | Glow plugs | — | Hard cold start, white smoke, cold misfire | No verified fixed replacement interval found; treat as condition-based test item | Official manual / Forum | O3; C9 |
| Engine | Injectors / small injection quantity learning | Test | 20,000 | 12 mo | 20,000 | 12 mo | No | High | Workshop | Diagnostic tool, injector seals if removed | In applicable common-rail factory documentation, new injectors require code entry | Rough idle, smoke, knock, economy loss | The later factory schedule explicitly includes small-injection-quantity learning; store completed learning in service history | Official manual | O3; O7 |
| Engine | Supply pump / SCV / rail-pressure system | Diagnose | — | — | 40,000 | 24 mo | Yes | High | Workshop | SCV if needed, seals | — | Surging, stalling, hard starting, reduced power | Community pattern strongly links 4M41 surging and light-throttle hunting to SCV/fuel-pressure control faults | Forum / Specialist | C9 |
| Engine | Valve clearance | Adjust | 20,000 | 12 mo | 20,000 | 12 mo | No | High | Workshop | Rocker cover gasket as needed | — | Ticking, rough idle, starting trouble | The later official 4M41 schedule lists valve-clearance inspection every 20,000 km/12 mo; many owners defer it, but the factory interval is the safest app value | Official manual | O3 |
| Engine | Timing chain / guides / tensioner | Inspect / Diagnose | — | — | 100,000 | 60 mo | Yes | Critical | Workshop | Timing-chain kit as needed, seals/gaskets | Factory bulletin identifies 4M41 timing-chain kits and replacement procedure | Cold-start rattle, metallic timing noise, catastrophic failure if ignored | 4M41 uses a chain, not a belt; early Gen 3 community/specialist reports repeatedly warn about top-guide wear and breakage | Official bulletin / Forum / Specialist | O2; C1; C2 |
| Engine | Engine mounts / oil-pressure-switch leak / general 4M41 high-mileage checks | Inspect | — | — | 20,000 | 12 mo | Yes | High | Workshop | Mounts or oil-pressure switch as needed | — | Vibration, sudden oil leak near turbo/block, clunks | The oil-pressure switch leak is a recurring 4M41 complaint and should be checked at every oil service | Forum / Specialist | C8; C9 |

### Automatic transmission, transfer case and differentials

| System | Item | Action type: Replace / Inspect / Clean / Lubricate / Adjust / Test / Flush / Diagnose | Official interval in km | Official interval in months or years | Community or preventive interval in km | Community or preventive interval in months or years | First service after purchase with unknown history | Priority | Difficulty | Parts or fluids needed | Fluid specification and capacity, if relevant | Symptoms if neglected | Notes specific to Pajero III V78W 4M41 automatic | Source type | Source citation or link |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|
| Automatic transmission | ATF level and condition | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Medium DIY | ATF | Use **ATF SP III** only; later 5AT owner-manual page shows **9.7 L total** on a later Pajero, so confirm first-service refill for this V5A51 | Burnt smell, slip, flare, delayed engagement | Check hot and log colour/odour in the app | Official manual / Owner manual | O3; O4 |
| Automatic transmission | ATF | Replace | 80,000 | — | 40,000 | 36 mo | Yes | Critical | Workshop | ATF SP III, drain washer | Exact 2001 V5A51 total-fill figure was not cleanly verified; use measured refill volumes on first major service | Harsh or soft shifts, shudder, temp warning | Official sources disagree because some later schedules refer to newer 5AT calibrations. For a 2001 V5A51, 40,000 km / 3 years is the safe app interval | Official manual / Forum | O3; O8; C10 |
| Automatic transmission | Internal filter / strainer / pan service | Replace / Clean | — | — | 80,000 | 72 mo | Yes | High | Workshop | Internal oil filter, strainer seals, pan sealant, O-rings | V5A51 workshop manual shows an internal oil filter, oil strainer, magnets and **sealant on the pan**, not a simple serviceable external filter | Debris circulation, poor shift quality, contaminated ATF | On unknown history, do an early pan-drop service rather than assuming “sealed for life” | Official manual / Forum | O5; C10 |
| Automatic transmission | Cooler lines and cooler / heat exchanger | Inspect | — | — | 20,000 | 12 mo | Yes | High | Easy DIY | Hoses, clamps, seals if needed | — | ATF leak, overheating, low fluid | Extra important if towing or driving slowly off-road | Official manual / Forum | O3; C10 |
| Automatic transmission | ATF service method on unknown history | Diagnose | — | — | — | — | Yes | High | Workshop | ATF SP III, pan-service parts | — | Post-service shift problems if done badly | Community and specialist threads favour pan service plus staged drain-and-fills or a controlled specialist flush over a blind aggressive machine flush on a neglected older box | Forum / Specialist | C10 |
| Transfer case and 4WD system | Transfer case oil | Replace | 100,000 | — | 40,000 | 36 mo | Yes | High | Medium DIY | Gear oil, plug gaskets | GL-3 75W-85 or GL-4 75W-85, **2.8 L** | Chain/bearing wear, noisy case, poor shifting | Do not use rear-diff GL-5 as the default transfer oil unless a verified equivalent specifically covers the factory requirement | Official manual | O3 |
| Transfer case and 4WD system | Transfer case oil leakage / level | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Easy DIY | Plug gaskets if needed | — | Low oil, whining, oil misting | Official schedule includes leak/level checks | Official manual | O3 |
| Transfer case and 4WD system | Super Select 4WD functional exercise | Test | — | — | 5,000 | 6 mo | No | High | Easy DIY | — | — | Flashing lamps, sticky engagement, reluctant mode changes | Community consensus is clear: regular exercise helps keep the system free | Forum | C5 |
| Transfer case and 4WD system | Front axle actuator / vacuum lines / vacuum solenoids | Inspect / Diagnose | — | — | 10,000 | 12 mo | Yes | High | Medium DIY | Vacuum hoses, solenoids, actuator boot as needed | — | Flashing front-wheel lamps, failure to engage/disengage, grinding | One of the best-documented Gen 3 real-world fault patterns | Forum | C5 |
| Transfer case and 4WD system | 4WD switches and sensors / indicator diagnosis | Inspect / Diagnose | — | — | 20,000 | 12 mo | Yes | High | Workshop | Detector switches as needed | V5A51 transfer documentation lists 2WD, 4H, centre-diff-lock and 4LLc-related switches | Persistent blinking lamps, false mode display | Sticky or worn detection switches are a common Gen 3 cause of flashing lights | Official manual / Forum | O5; C5 |
| Differentials and driveline | Front differential oil | Replace | 80,000 | — | 40,000 | 36 mo | Yes | High | Medium DIY | GL-5 gear oil, plug gaskets | GL-5 SAE 80 or 90, **1.15 L** | Whine, bearing wear | Official check method says oil should not be more than 8 mm below filler-hole lower edge | Official manual | O3 |
| Differentials and driveline | Rear differential oil | Replace | 80,000 | — | 40,000 | 36 mo | Yes | High | Medium DIY | GL-5 gear oil, plug gaskets | GL-5 SAE 80 or 90, **1.6 L** for the standard rear diff shown in factory material | Whine, gear wear, chatter if wrong lube used | Verify whether this exact vehicle has an LSD or locker before final fluid assignment | Official manual / Parts-catalog style verification | O3; O1 |
| Differentials and driveline | Rear LSD / locker verification | Inspect | — | — | — | — | Yes | High | Easy DIY | — | — | Wrong oil selection, poor locking behaviour | V78W equipment varies by market/trim; confirm hardware before hard-coding fluid SKUs in the app | Official manual / Forum | O1; C5 |
| Differentials and driveline | Prop shafts, U-joints and slip joints | Lubricate | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Easy DIY | Multipurpose grease | — | Clunk, vibration, seized U-joints | Factory schedule explicitly includes propeller-shaft greasing | Official manual | O3 |
| Differentials and driveline | CV boots and axle seals | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Easy DIY | Boot kits, CV grease, axle seals if needed | — | Grease fling, clicks, oil contamination | Severe-use schedule shortens boots checks | Official manual | O3 |
| Differentials and driveline | Wheel bearings | Inspect | 60,000 | 36 mo | 20,000 | 12 mo | Yes | High | Workshop | Bearings / hub parts as needed | — | Rumble, wheel play, hot hub, ABS issues | Community experience repeatedly warns against poor-quality aftermarket bearings on Gen 3/4 Pajeros | Official manual / Forum | O3; C8 |

## Maintenance database for brakes, suspension and body

### Brakes, HBB, steering and suspension

| System | Item | Action type: Replace / Inspect / Clean / Lubricate / Adjust / Test / Flush / Diagnose | Official interval in km | Official interval in months or years | Community or preventive interval in km | Community or preventive interval in months or years | First service after purchase with unknown history | Priority | Difficulty | Parts or fluids needed | Fluid specification and capacity, if relevant | Symptoms if neglected | Notes specific to Pajero III V78W 4M41 automatic | Source type | Source citation or link |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|
| Brakes | Brake fluid | Flush | 40,000 | 24 mo | 20,000 | 24 mo | Yes | Critical | Medium DIY | Brake fluid | DOT 3 or DOT 4 from a sealed container | Soft pedal, corrosion, poor HBB/ABS behaviour | More important than average because this vehicle uses a hydraulic brake booster system | Official manual / Owner manual | O3; O4 |
| Brakes | Pads and discs | Inspect | 20,000 | 12 mo | 10,000 | 6 mo | Yes | Critical | Easy DIY | Pads/discs as needed | — | Noise, pull, vibration, reduced braking | Official severe-use schedule shortens brake inspection | Official manual | O3 |
| Brakes | Calipers and guide pins | Clean / Lubricate | — | — | 20,000 | 12 mo | Yes | High | Medium DIY | Pin grease, boots if needed | — | Uneven pad wear, dragging brakes | Common ageing-service item even though not listed as a separate factory replacement row | Official manual / Forum | O3; C4 |
| Brakes | Parking brake (drum-in-disc) | Inspect / Adjust | 20,000 | 12 mo | 20,000 | 12 mo | Yes | High | Medium DIY | Shoe hardware if needed | — | Long travel, poor hill-hold | Store post-adjustment lever travel in the app if possible | Official manual | O3 |
| Brakes | Brake hoses and hard lines | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | Critical | Easy DIY | Hoses/line sections/clips | — | Cracks, leaks, sudden line failure | Pay extra attention to rear sections and wheel-arch exits on salted-road vehicles | Official manual / Forum | O3; C7 |
| Brakes | ABS / HBB code scan and warning-lamp diagnosis | Diagnose | — | — | 20,000 | 12 mo | Yes | High | Workshop | Scan tool | — | ABS lamp, brake lamp, buzzer, pump cycling | Log codes in the app, not just parts replaced | Official manual | O6 |
| Brakes | HBB pump operation and accumulator health | Test | — | — | 20,000 | 12 mo | Yes | Critical | Workshop | — | — | Long pump run, buzzing, hard pedal, warning lamp | Factory troubleshooting sets **code 55** if the pump motor runs for 300 seconds and **code 57** if accumulator pressure is too low | Official manual / Forum | O6; C4 |
| Brakes | HBB accumulator / pump motor / relays | Diagnose / Replace on test failure | — | — | — | — | Yes | Critical | Workshop | Accumulator, motor, relays as required | — | Warning buzzer, poor reserve assist, repeated pump run | Community and official diagnostic trees both show this is one of the major Gen 3 braking weak points | Official manual / Forum | O6; C4 |
| Suspension and steering | Suspension system general | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Easy DIY | — | — | Clunks, looseness, tyre wear | Good baseline under-vehicle inspection item | Official manual | O3 |
| Suspension and steering | Upper and lower ball joints / dust boots | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | Critical | Workshop | Ball joints, cotter pins | — | Play, knock, alignment drift | One of the must-check front-end items on a high-mileage Gen 3 | Official manual / Forum | O3; C8 |
| Suspension and steering | Control-arm bushes / stabiliser links / stabiliser bushes | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Workshop | Bushes, links | — | Harshness, small-bump rattles, wandering | No separate factory replacement interval; inspect with every suspension check | Official manual / Forum | O3; C8 |
| Suspension and steering | Tie rods / steering linkage / seals and boots | Inspect | 20,000 | 12 mo | 10,000 | 12 mo | Yes | Critical | Workshop | Tie rods, boots | — | Steering play, toe wear, wandering | Factory schedule includes steering-linkage inspection | Official manual | O3 |
| Suspension and steering | Steering-column joints / intermediate shaft | Inspect | — | — | 20,000 | 12 mo | Yes | Medium | Workshop | Joint parts as needed | — | Column clunk, notchiness | Less common than tie-rod wear but worth annual attention on an ageing truck | Forum | C8 |
| Suspension and steering | Shocks and springs / ride height | Inspect | — | — | 20,000 | 12 mo | Yes | High | Easy DIY | Shocks, springs if required | — | Bounce, float, rear sag | High-mileage owner experience regularly points to softness before obvious leakage | Forum | C8 |
| Suspension and steering | Wheel alignment | Inspect / Adjust | 20,000 | 12 mo | 10,000 | 12 mo | Yes | High | Workshop | Alignment hardware as needed | — | Tyre wear, pull, off-centre wheel | Recheck after any ball-joint, bush or shock work | Official manual | O3 |

### Body and chassis

| System | Item | Action type: Replace / Inspect / Clean / Lubricate / Adjust / Test / Flush / Diagnose | Official interval in km | Official interval in months or years | Community or preventive interval in km | Community or preventive interval in months or years | First service after purchase with unknown history | Priority | Difficulty | Parts or fluids needed | Fluid specification and capacity, if relevant | Symptoms if neglected | Notes specific to Pajero III V78W 4M41 automatic | Source type | Source citation or link |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|
| Body and chassis | Chassis and underbody corrosion | Inspect | — | 12 mo | — | 12 mo | Yes | Critical | Easy DIY | Rust-treatment materials | — | Structural rust, seized fixings | Must be annual at minimum on salted-road European vehicles | Forum / Specialist | C6; C7 |
| Body and chassis | Brake-line and fuel-line corrosion points | Inspect | — | 12 mo | — | 12 mo | Yes | Critical | Easy DIY | Line clips, repair material as needed | — | Wet lines, scale, MOT failure | Concentrate on rear wheel-arch exits and underbody channels | Forum | C7 |
| Body and chassis | Rear wheel arches / sills / door bottoms / tailgate seams | Inspect | — | 12 mo | — | 12 mo | Yes | High | Easy DIY | Trim clips, wax, rust materials | — | Bubble rust, hidden seam corrosion | Common hidden-rust zones on ageing Pajero/Shogun bodies | Forum | C7 |
| Body and chassis | Fuel-tank area / straps / nearby lines | Inspect | — | 12 mo | — | 12 mo | Yes | High | Workshop | Tank straps or hardware as needed | — | Rust at tank cradle, seepage | Mud and salt collect here | Forum | C7 |
| Body and chassis | Body mounts and fasteners | Inspect | — | — | 40,000 | 24 mo | Yes | Medium | Workshop | Body mounts as needed | — | Body movement, clunks, seized mount bolts | Important before heavy rustproofing or major chassis work | Forum / Specialist | C7 |
| Body and chassis | Sunroof drains | Clean | — | — | 20,000 | 12 mo | No | Medium | Easy DIY | Drain-cleaning tools | — | Wet headlining, damp carpets | If fitted, treat as annual preventive maintenance | Forum / Owner experience | C7 |
| Body and chassis | Underbody wax / cavity protection | Renew | — | — | 24,000 | 24 mo | No | High | Workshop | Cavity wax, underbody wax | — | Rust progression each winter | Best done after cleaning and drying, not over trapped damp corrosion | Forum / Specialist | C7 |
| Body and chassis | Rear heater pipes / rear HVAC hard lines | Inspect | — | — | 20,000 | 12 mo | Yes | High | Workshop | Coolant/A/C line repair parts | — | Coolant loss, weak rear heat/cool, underbody rust | Very common long-wheelbase issue and worth its own app reminder | Forum | C6 |

## Maintenance database for electrical, HVAC and interior

| System | Item | Action type: Replace / Inspect / Clean / Lubricate / Adjust / Test / Flush / Diagnose | Official interval in km | Official interval in months or years | Community or preventive interval in km | Community or preventive interval in months or years | First service after purchase with unknown history | Priority | Difficulty | Parts or fluids needed | Fluid specification and capacity, if relevant | Symptoms if neglected | Notes specific to Pajero III V78W 4M41 automatic | Source type | Source citation or link |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|
| Electrical | Battery state / electrolyte / case condition | Test | 20,000 | 12 mo | — | 6 mo | Yes | High | Easy DIY | Battery, distilled water if serviceable | — | Slow crank, low-voltage faults, HBB/ABS nuisance faults | Later owner/manual material says serviceable batteries should be checked very regularly; six-month app checks are sensible even if a battery tester is not used every time | Official manual / Owner manual | O3; O4 |
| Electrical | Alternator charging voltage / belt load | Test | — | — | 20,000 | 12 mo | Yes | High | Easy DIY | Multimeter | — | Dim lamps, battery not charging | Record actual charging voltage in service notes | Owner manual / Workshop practice | O4 |
| Electrical | Grounds / earth points / starter cables | Clean / Inspect | — | — | 20,000 | 12 mo | Yes | High | Easy DIY | Abrasive pads, dielectric protection | — | Slow crank, strange sensor faults, intermittent electrical issues | Age and corrosion make this a very worthwhile preventive task | Forum | C9 |
| Electrical | Fuses / relays / lighting / dash warning bulbs | Inspect / Test | — | — | 12,000 | 12 mo | Yes | Medium | Easy DIY | Fuses, relays, bulbs | — | Hidden faults if warning lamps do not work | Important because 4WD and HBB systems often rely on dash warnings | Official manual / Forum | O6; C5 |
| Electrical | OBD / MUT scan of engine, A/T, ABS/HBB and 4WD | Diagnose | — | — | 20,000 | 12 mo | Yes | High | Workshop | Scan tool | — | Hidden pending faults, no-code drivability issues | Store codes and freeze-frame notes, not just a “done” flag | Official manual | O6; O7 |
| Electrical | Common failing engine-control sensors | Diagnose | — | — | 20,000 | 12 mo | Yes | Medium | Workshop | MAF/MAP/crank/oil-pressure-switch parts as needed | — | Surging, no-start, reduced power, oil leak | Community reports repeatedly mention SCV, MAF/MAP, crank-angle/rpm signal problems and oil-pressure-switch leakage on 4M41s | Forum / Specialist | C9 |
| HVAC | Cabin / air-purifier filter | Replace | 15,000 | 12 mo | 15,000 | 12 mo | Yes | Medium | Easy DIY | Cabin filter | — | Weak airflow, odour, fogging | One of the cleanest verified factory intervals available | Official manual | O3 |
| HVAC | A/C service / leak test / refrigerant service | Test / Recharge on condition | — | — | — | 24 mo | Yes | Medium | Workshop | Refrigerant, oil, O-rings as required | Later owner-manual snippets show HFC-134a and later-model fill figures, but exact 2001 V78W charge must be confirmed from the under-bonnet label | Warm air, poor cooling, noisy compressor | Do not hard-code later-model refrigerant mass into the app without checking this vehicle’s label | Owner manual / Forum | O4; C6 |
| HVAC | Condenser / evaporator drain / blower motor / heater core / rear heater | Inspect / Clean | — | — | 20,000 | 12 mo | Yes | High | Workshop | Cleaner, blower parts or hose parts if needed | — | Odour, wet carpets, weak airflow, coolant smell | Rear heater plumbing on the long-wheelbase vehicle deserves special attention | Owner manual / Forum | O4; C6 |
| Interior and comfort | Seat mechanisms | Lubricate / Inspect | — | — | — | 12 mo | No | Low | Easy DIY | Light grease | — | Stiff adjusters | Annual cabin-detail task | Owner manual | O4 |
| Interior and comfort | Locks, hinges, bonnet and tailgate latches | Lubricate | — | — | — | 12 mo | No | Medium | Easy DIY | Lock lube, grease | — | Stiff locks, latch wear | Good before winter and after washing or rustproofing | Owner manual | O4 |
| Interior and comfort | Window regulators and channels | Inspect / Lubricate | — | — | — | 12 mo | No | Medium | Medium DIY | Silicone lube, clips as needed | — | Slow windows, grinding, dropped glass | Check drain membranes if doors are damp inside | Forum / owner experience | C7 |
| Interior and comfort | Wiper blades and washer system | Replace / Flush | — | — | — | 12 mo | No | Medium | Easy DIY | Wiper blades, washer fluid | — | Streaking, blocked jets, poor visibility | Some Pajeros have rear washer reservoir/service points in the back door area | Owner manual | O4 |
| Interior and comfort | Tailgate / spare carrier / back-door hardware | Inspect / Lubricate | — | — | — | 12 mo | No | Medium | Easy DIY | Grease, corrosion protection | — | Door sag, rattles, seized fasteners | Important on vehicles carrying weight on the rear door or spare mount | Owner manual / owner experience | O4; C7 |

## After-purchase unknown-history service pack

For a newly acquired V78W with unclear history, the first app cycle should treat these as **due immediately** unless recent documentary proof exists:

engine oil, oil filter, air filter, fuel filter, coolant, brake fluid, ATF condition check and likely replacement, transfer oil, both differential oils, prop-shaft greasing, HBB pump/accumulator test, full 4WD vacuum/actuator/switch inspection, timing-chain noise inspection, EGR/intake-manifold inspection, wheel-bearing/ball-joint/front-end play check, and a full rust inspection including rear heater pipes and rear brake/fuel lines. That combination reflects both the official factory maintenance structure and the best-supported real-world failure points for Gen 3 4M41 trucks. citeturn30search0turn41view1turn43view0turn44search0turn29search1turn29search25turn45search3turn47search12

## Source legend and limitations

**O1** — 2001 factory chassis manual model identification and VIN decode for V78W / 4M41 / automatic / Europe / 2001. citeturn15search0turn16search1turn41view0  
**O2** — 2001 factory timing-chain service bulletin for 4M40/4M41, including 4M41 timing-chain kit reference and replacement procedure coverage. citeturn41view1turn42view1  
**O3** — factory Pajero periodic-maintenance manual covering 4M41 items such as oil, coolant, valve clearance, brake fluid, air filter, transfer/diff oils, EGR, common-rail learning, severe-use definitions, air purifier filter and wheel-bearing checks. citeturn30search0turn25search0turn41view2turn42view3  
**O4** — later official owner-manual refill-capacity and fluid-type pages, including 4M41 oil total, ATF SP III, front/rear differential quantities, brake-fluid type and related owner-maintenance sections. citeturn20view2turn20view3turn22search0turn37search0  
**O5** — V5A51 workshop-manual material confirming internal oil filter/strainer, pan sealant use and transfer switch naming. citeturn15search2turn26search0turn41view3  
**O6** — factory HBB basic-brake troubleshooting, including code 55 pump-too-long, code 57 low accumulator pressure, relay/pressure-switch/HBB diagnostic logic. citeturn43view0  
**O7** — official common-rail learning and injector-coding material. citeturn36search6turn36search5  
**O8** — later Australia-market official Pajero schedules showing interval disagreement for oil, fuel filter and ATF compared with other factory Pajero schedules. citeturn32search1turn34search6turn34search8turn34search9turn35search1  

**C1** — Gen 3 / early 4M41 timing-guide and timing-chain wear discussions from owner communities. citeturn27search0turn27search8turn27search12turn47search12  
**C2** — specialist warning on 4M41 timing-chain failure. citeturn28search6  
**C3** — owner-community evidence on intake-manifold sludge, EGR fouling and CCV oil mist contribution. citeturn27search18turn27search10turn27search6turn27search4turn27search3  
**C4** — owner-community evidence that HBB motor and accumulator faults are common Gen 3 issues. citeturn27search5turn27search9turn28search11turn28search19turn28search21  
**C5** — owner-community evidence on Super Select flashing lights, vacuum solenoids, actuator rods and sticky/failing switches. citeturn44search0turn44search4turn44search7turn44search9turn44search10turn44search24turn44search1  
**C6** — owner-community evidence on rear-heater and rear-HVAC pipe corrosion on long-wheelbase vehicles. citeturn28search4turn29search1turn29search8turn29search27  
**C7** — owner-community evidence on rust-prone body/chassis areas and brake-line corrosion. citeturn29search25turn29search14turn29search5  
**C8** — high-mileage owner-community evidence on wheel bearings, ball joints, bushes and shocks. citeturn45search3turn45search7turn45search19turn45search9turn45search2turn45search6  
**C9** — community evidence on SCV, MAF/MAP, crank/rpm-signal and oil-pressure-switch issues on 4M41. citeturn36search21turn36search16turn36search13turn36search9turn47search4turn47search17turn47search2  
**C10** — community and specialist discussion of ATF service practice, no simple external V5A51 filter, and more conservative ATF intervals under towing/off-road use. citeturn48search2turn48search6turn48search8turn48search11turn48search14  

Open points that should stay flagged in the app as **verification required on vehicle**: the exact 2001 V78W coolant refill amount, the exact 2001 V5A51 total ATF fill, the exact refrigerant charge for this individual truck, and whether the rear axle on this VIN uses a standard diff, LSD, or a different market-specific arrangement. Those were not cleanly verifiable from accessible exact-2001 public factory pages and should be confirmed from workshop labels, axle hardware, or the first measured service. citeturn15search0turn41view0turn22search0turn37search0

## App-ready JSON starter export

The table above is the complete human-readable maintenance database. The compact JSON below is a high-priority starter export using the same logic; `sourceKeys` map to the cited legend above.

```json
[
  {
    "id": "engine_oil",
    "system": "Engine",
    "name": "Engine oil",
    "action": "Replace",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 7500,
    "preventiveIntervalMonths": 12,
    "priority": "Critical",
    "difficulty": "Easy DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["engine oil", "drain plug washer"],
    "fluidSpec": "4M41 diesel oil; later official 4M41 owner-manual pages show 9.8 L total including filter and cooler; confirm first measured refill on this V78W",
    "notes": "Official factory schedules disagree by market; safe app interval is 7,500 km on a 2001 vehicle",
    "sourceKeys": ["O3", "O4", "O8"]
  },
  {
    "id": "engine_oil_filter",
    "system": "Engine",
    "name": "Oil filter",
    "action": "Replace",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 7500,
    "preventiveIntervalMonths": 12,
    "priority": "Critical",
    "difficulty": "Easy DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["oil filter"],
    "fluidSpec": null,
    "notes": "Change with engine oil every time",
    "sourceKeys": ["O3", "O4", "O8"]
  },
  {
    "id": "air_filter",
    "system": "Engine",
    "name": "Air cleaner element",
    "action": "Replace",
    "officialIntervalKm": 40000,
    "officialIntervalMonths": 24,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Easy DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["air filter"],
    "fluidSpec": null,
    "notes": "Inspect every 20,000 km official, every 10,000 km in severe use",
    "sourceKeys": ["O3"]
  },
  {
    "id": "fuel_filter",
    "system": "Engine",
    "name": "Fuel filter",
    "action": "Replace",
    "officialIntervalKm": 40000,
    "officialIntervalMonths": 24,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "Critical",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["fuel filter", "seals"],
    "fluidSpec": null,
    "notes": "Later Australia schedule is closer to 30,000 km; 20,000 km is the safe app interval",
    "sourceKeys": ["O3", "O8", "C9"]
  },
  {
    "id": "coolant",
    "system": "Engine",
    "name": "Engine coolant",
    "action": "Flush",
    "officialIntervalKm": 60000,
    "officialIntervalMonths": 48,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 36,
    "priority": "Critical",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["coolant", "sealing washers if needed"],
    "fluidSpec": "Confirm exact V78W refill quantity during first measured service",
    "notes": "Also inspect thermostat, radiator and hoses at every coolant service",
    "sourceKeys": ["O3", "C6"]
  },
  {
    "id": "drive_belts",
    "system": "Engine",
    "name": "Accessory belts",
    "action": "Inspect",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 10000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["belts as needed"],
    "fluidSpec": null,
    "notes": "Replace proactively at 60,000 km / 48 months if age is unknown",
    "sourceKeys": ["O3"]
  },
  {
    "id": "egr_intake",
    "system": "Engine",
    "name": "EGR and intake manifold carbon",
    "action": "Clean",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 24,
    "priority": "High",
    "difficulty": "Advanced DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["gaskets", "cleaner"],
    "fluidSpec": null,
    "notes": "Official schedule includes EGR inspection; community experience supports periodic manifold cleaning",
    "sourceKeys": ["O3", "C3"]
  },
  {
    "id": "injector_learning",
    "system": "Engine",
    "name": "Injector balance / small injection quantity learning",
    "action": "Test",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": false,
    "parts": ["diagnostic tool"],
    "fluidSpec": null,
    "notes": "Factory material requires learning and, in applicable CRS documentation, injector coding after replacement",
    "sourceKeys": ["O3", "O7"]
  },
  {
    "id": "scv_rail_pressure",
    "system": "Engine",
    "name": "Supply pump / SCV / rail-pressure diagnosis",
    "action": "Diagnose",
    "officialIntervalKm": null,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 24,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["SCV if needed"],
    "fluidSpec": null,
    "notes": "Community pattern links SCV faults to surging, hard start and stalling",
    "sourceKeys": ["C9"]
  },
  {
    "id": "valve_clearance",
    "system": "Engine",
    "name": "Valve clearance",
    "action": "Adjust",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": false,
    "parts": ["rocker cover gasket as needed"],
    "fluidSpec": null,
    "notes": "Factory interval is frequent; if noisy, do it immediately",
    "sourceKeys": ["O3"]
  },
  {
    "id": "timing_chain",
    "system": "Engine",
    "name": "Timing chain / guides / tensioner",
    "action": "Inspect",
    "officialIntervalKm": null,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 100000,
    "preventiveIntervalMonths": 60,
    "priority": "Critical",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["timing-chain kit if needed", "seals/gaskets"],
    "fluidSpec": null,
    "notes": "No fixed factory replacement interval found; inspect early on unknown-history Gen 3 because guide failure is a known risk",
    "sourceKeys": ["O2", "C1", "C2"]
  },
  {
    "id": "atf",
    "system": "Automatic transmission",
    "name": "ATF",
    "action": "Replace",
    "officialIntervalKm": 80000,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 36,
    "priority": "Critical",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["ATF SP III", "drain washer"],
    "fluidSpec": "ATF SP III; total-fill figure for this exact 2001 V5A51 should be confirmed at first measured service",
    "notes": "Official sources disagree across later markets and gearboxes; 40,000 km is the safe app interval on this vehicle",
    "sourceKeys": ["O3", "O4", "O8", "C10"]
  },
  {
    "id": "at_filter_pan_service",
    "system": "Automatic transmission",
    "name": "Internal filter / strainer / pan service",
    "action": "Replace",
    "officialIntervalKm": null,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 80000,
    "preventiveIntervalMonths": 72,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["internal oil filter", "strainer seals", "pan sealant", "O-rings"],
    "fluidSpec": null,
    "notes": "V5A51 uses an internal filter/strainer and pan sealant, not a simple external service filter",
    "sourceKeys": ["O5", "C10"]
  },
  {
    "id": "transfer_oil",
    "system": "Transfer case / 4WD",
    "name": "Transfer case oil",
    "action": "Replace",
    "officialIntervalKm": 100000,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 36,
    "priority": "High",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["gear oil", "plug gaskets"],
    "fluidSpec": "GL-3 75W-85 or GL-4 75W-85, 2.8 L",
    "notes": "Do not substitute rear-diff GL-5 by default",
    "sourceKeys": ["O3"]
  },
  {
    "id": "front_diff_oil",
    "system": "Differentials and driveline",
    "name": "Front differential oil",
    "action": "Replace",
    "officialIntervalKm": 80000,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 36,
    "priority": "High",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["GL-5 gear oil", "plug gaskets"],
    "fluidSpec": "GL-5 SAE 80 or 90, 1.15 L",
    "notes": "Factory level check uses 8 mm reference below filler-hole lower edge",
    "sourceKeys": ["O3"]
  },
  {
    "id": "rear_diff_oil",
    "system": "Differentials and driveline",
    "name": "Rear differential oil",
    "action": "Replace",
    "officialIntervalKm": 80000,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 40000,
    "preventiveIntervalMonths": 36,
    "priority": "High",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["GL-5 gear oil", "plug gaskets"],
    "fluidSpec": "GL-5 SAE 80 or 90, 1.6 L for the standard rear diff shown in factory material",
    "notes": "Verify LSD/locker type before final fluid assignment",
    "sourceKeys": ["O3", "O1"]
  },
  {
    "id": "propshaft_grease",
    "system": "Differentials and driveline",
    "name": "Prop shafts / U-joints / slip joints",
    "action": "Lubricate",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 10000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Easy DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["multipurpose grease"],
    "fluidSpec": null,
    "notes": "Important on a heavy 4WD used in water, mud, towing or short-trip driving",
    "sourceKeys": ["O3"]
  },
  {
    "id": "hbb_test",
    "system": "Brakes",
    "name": "HBB pump and accumulator health",
    "action": "Test",
    "officialIntervalKm": null,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "Critical",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": [],
    "fluidSpec": null,
    "notes": "Factory diagnostics identify pump-run-too-long and low-accumulator-pressure fault paths; common Gen 3 weak point",
    "sourceKeys": ["O6", "C4"]
  },
  {
    "id": "brake_fluid",
    "system": "Brakes",
    "name": "Brake fluid",
    "action": "Flush",
    "officialIntervalKm": 40000,
    "officialIntervalMonths": 24,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 24,
    "priority": "Critical",
    "difficulty": "Medium DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["DOT 3 or DOT 4 brake fluid"],
    "fluidSpec": "DOT 3 or DOT 4",
    "notes": "Important because of hydraulic brake booster design",
    "sourceKeys": ["O3", "O4"]
  },
  {
    "id": "ball_joints_front_end",
    "system": "Suspension and steering",
    "name": "Front-end play: ball joints / bushes / tie rods",
    "action": "Inspect",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": 10000,
    "preventiveIntervalMonths": 12,
    "priority": "Critical",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["ball joints", "bushes", "tie rods as needed"],
    "fluidSpec": null,
    "notes": "A must-check area on any high-mileage Gen 3",
    "sourceKeys": ["O3", "C8"]
  },
  {
    "id": "wheel_bearings",
    "system": "Differentials and driveline",
    "name": "Wheel bearings",
    "action": "Inspect",
    "officialIntervalKm": 60000,
    "officialIntervalMonths": 36,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["bearings or hub parts as needed"],
    "fluidSpec": null,
    "notes": "Community reports favour high-quality or genuine-spec bearings",
    "sourceKeys": ["O3", "C8"]
  },
  {
    "id": "underbody_rust",
    "system": "Body and chassis",
    "name": "Underbody / chassis / brake-line rust inspection",
    "action": "Inspect",
    "officialIntervalKm": null,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": null,
    "preventiveIntervalMonths": 12,
    "priority": "Critical",
    "difficulty": "Easy DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["rust-treatment materials as needed"],
    "fluidSpec": null,
    "notes": "Also inspect rear wheel arches, sills, door bottoms, tailgate seams and fuel-tank area",
    "sourceKeys": ["C6", "C7"]
  },
  {
    "id": "rear_heater_pipes",
    "system": "Body and chassis",
    "name": "Rear heater / rear HVAC hard pipes",
    "action": "Inspect",
    "officialIntervalKm": null,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["pipe or hose repair parts"],
    "fluidSpec": null,
    "notes": "Long-wheelbase corrosion hot-spot; can cause hidden coolant loss",
    "sourceKeys": ["C6"]
  },
  {
    "id": "battery_and_charging",
    "system": "Electrical",
    "name": "Battery and charging system",
    "action": "Test",
    "officialIntervalKm": 20000,
    "officialIntervalMonths": 12,
    "preventiveIntervalKm": null,
    "preventiveIntervalMonths": 6,
    "priority": "High",
    "difficulty": "Easy DIY",
    "afterPurchaseUnknownHistory": true,
    "parts": ["battery if needed"],
    "fluidSpec": null,
    "notes": "Include charging voltage, cable ends and main grounds",
    "sourceKeys": ["O3", "O4", "C9"]
  },
  {
    "id": "obd_mut_scan",
    "system": "Electrical",
    "name": "OBD / MUT scan",
    "action": "Diagnose",
    "officialIntervalKm": null,
    "officialIntervalMonths": null,
    "preventiveIntervalKm": 20000,
    "preventiveIntervalMonths": 12,
    "priority": "High",
    "difficulty": "Workshop",
    "afterPurchaseUnknownHistory": true,
    "parts": ["scan tool"],
    "fluidSpec": null,
    "notes": "Scan engine, A/T, ABS/HBB and 4WD systems and save codes",
    "sourceKeys": ["O6", "O7"]
  }
]
```