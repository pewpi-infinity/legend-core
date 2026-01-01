# 🔌 Electronics Lab

**Part of the Infinity Legend System**  
**Theme:** Electronics  
**Emoji:** 🔌  
**Roles:** FILTER, TRANSFORMER, AMPLIFIER, VALIDATOR

---

## 🎯 Overview

The Electronics Lab provides a complete electronic engineering toolkit with virtual instruments, circuit simulation, and measurement tools.

## 🔧 Tools & Equipment

### Measurement Instruments
- **📊 Oscilloscope** - Visualize voltage over time
- **📏 Multimeter** - Measure voltage, current, resistance
- **🌊 Signal Generator** - Create test waveforms
- **📈 Logic Analyzer** - Analyze digital signals
- **📊 Spectrum Analyzer** - Frequency domain analysis

### Components Library
- **⚡ Resistors** - Current limiting, voltage division
- **🔋 Capacitors** - Energy storage, filtering
- **🧲 Inductors** - Magnetic energy storage
- **📡 Transistors** - Amplification, switching
- **💾 IC Chips** - Complex integrated functions

### Workstation
- **🟩 Breadboard** - Prototype circuits without soldering
- **🟨 PCB Design** - Create professional circuit boards
- **🔥 Soldering Station** - Permanent connections
- **🔍 Magnifier** - Inspect small components

## ⚡ Core Concepts

### Ohm's Law
```
V = I × R
Voltage = Current × Resistance
```

### Power Equation
```
P = V × I = I²R = V²/R
Power = Voltage × Current
```

### Capacitor Charging
```
V(t) = V₀(1 - e^(-t/RC))
```

### Capacitor Discharging (Used in Terminal Physics!)
```
V(t) = V₀ × e^(-t/RC)
```

## 🔬 Projects

### Beginner
1. **LED Blinker** - 555 timer circuit
2. **Voltage Divider** - Basic resistor networks
3. **RC Circuit** - Capacitor charging/discharging

### Intermediate
1. **Audio Amplifier** - Op-amp based design
2. **Power Supply** - Voltage regulation
3. **PWM Controller** - Motor speed control

### Advanced
1. **RF Transmitter** - Wireless communication
2. **FPGA Design** - Digital logic implementation
3. **Signal Processing** - DSP algorithms

## 🎛️ Virtual Oscilloscope

### Features
- Multiple channels (4+)
- Triggering modes: edge, pulse, video
- Measurements: frequency, amplitude, phase
- Storage: save waveforms
- Math functions: add, subtract, FFT

### Controls
- **Timebase:** 1ns to 100s per division
- **Voltage:** 1mV to 100V per division
- **Trigger:** Rising/falling edge
- **Cursor:** Measure precise values

## 📊 Circuit Simulator

### Supported Analysis
- **DC Analysis** - Static voltage/current
- **AC Analysis** - Frequency response
- **Transient** - Time-domain behavior
- **FFT** - Frequency spectrum

### Component Models
- Linear: R, L, C
- Nonlinear: Diodes, transistors
- Digital: Logic gates, flip-flops
- Sources: DC, AC, pulse, arbitrary

## 🌊 Signal Generator

### Waveforms
- **Sine** - Pure sinusoidal
- **Square** - Digital clock signals
- **Triangle** - Linear ramp up/down
- **Sawtooth** - Asymmetric ramp
- **Pulse** - Variable duty cycle
- **Arbitrary** - Custom waveforms

### Parameters
- **Frequency:** 0.1Hz to 100MHz
- **Amplitude:** 1mV to 10V
- **Offset:** ±10V
- **Phase:** 0° to 360°

## 🧪 Lab Experiments

### Experiment 1: RC Circuit Analysis
**Objective:** Measure time constant τ = RC

1. Build RC circuit on breadboard
2. Apply square wave input
3. Measure charging curve on oscilloscope
4. Calculate τ from 63% charge time
5. Compare with theoretical value

### Experiment 2: Transistor Amplifier
**Objective:** Build common-emitter amplifier

1. Calculate bias resistors
2. Assemble circuit
3. Measure DC operating point
4. Apply AC signal
5. Measure gain and bandwidth

### Experiment 3: Filter Design
**Objective:** Create low-pass RC filter

1. Select cutoff frequency
2. Calculate R and C values
3. Build and test circuit
4. Measure frequency response
5. Compare with simulation

## 🔗 Legend Integration

### Roles
- **🔍 FILTER** - Signal filtering and selection
- **🔄 TRANSFORMER** - Voltage/current transformation
- **📢 AMPLIFIER** - Signal amplification
- **✅ VALIDATOR** - Circuit verification

### Token Formulas
```
🔍 Filter → 🔄 Transformer → 📢 Amplifier → 📊 Monitor
```

### Physics Connection
The capacitor-resistor (RC) circuit behavior is the foundation for the MRW Terminal jump physics!

- **Capacitor** = Jump energy storage
- **Resistance** = Air friction
- **Charging** = Jump button press
- **Discharging** = Exponential fall trajectory

## 📚 Resources

### Datasheets
- Common ICs (555, LM358, etc.)
- Transistor specifications
- Component tolerances

### Reference
- Electronics formulas
- Standard values (E12, E24 series)
- Color codes
- Pinout diagrams

### Safety
- ESD protection procedures
- Voltage safety limits
- Hot soldering iron handling
- Proper ventilation

---

**Status:** 🟢 ACTIVE  
**Version:** 1.0.0  
**Integration:** ⚡ Capacitor Physics = Terminal Jump System
