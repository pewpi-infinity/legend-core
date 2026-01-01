# 👑 Infinity Legend Core

**Version:** 1.0.0  
**Tagline:** 🧱 Kris 🔑 • 👑📶⚪ • 🛒📶👑  
**Status:** 🟢 ACTIVE • 🧲🪐🔁 Loop Running

---

## 🎯 Overview

The **Infinity Legend System** is a declarative, immutable, and discoverable semantic operating system where repos recognize and link (don't execute), tokens carry meaning, and everything builds up without destruction.

This repository contains:
- 👑 **Legend Core** - Authoritative role definitions and formulas
- ⚡ **Spark Index Builder** - Additive-only content management system
- 🧬 **Self-Propagation System** - GitHub Pages-based discovery

---

## 🧬 Core Principles

### Never Destroy Principle ⚡

The system operates on a fundamental rule: **Everything Only Grows**

- ✅ Every input creates a NEW page (never overwrites)
- ✅ All content is linked and discoverable
- ✅ Content is always buildable into more
- ✅ System only GROWS, never shrinks
- ✅ Old content remains accessible forever

This isn't just a feature—it's the architectural foundation. The system is **physically incapable** of destruction.

### Self-Propagation 🌊

The system propagates itself through:

1. **GitHub Pages** - Automatic hosting and discovery
2. **Meta Tags** - Repos self-identify their legend roles
3. **Link Recognition** - Systems connect without execution
4. **Token Repositories** - Semantic units spawn as separate repos
5. **Domino Effect** - One spark creates opportunities for more

---

## 📁 System Structure

```
/
├── legend.json          # Machine-readable legend schema (33 roles)
├── LEGEND.md           # Human-readable specification
├── index.html          # 👑 Crown Index (GitHub Pages showcase)
├── README.md           # This file
├── package.json        # Metadata with infinity_legend fields
│
└── spark/              # ⚡ Spark Index Builder
    ├── index.html      # Main spark orchestrator
    ├── builder/
    │   ├── intake.html   # 📥 Input reception (GREEN layer)
    │   ├── weaver.html   # 🪡 Connection builder (YELLOW layer)
    │   └── emitter.html  # 🟡 Publication point (RED layer)
    ├── sparks/         # Generated spark pages (grows forever)
    ├── connections/
    │   └── graph.json  # Relationship maps
    └── memory/
        └── .spark_state.json  # Persistent state
```

---

## 🚀 Quick Start

### View the Legend

Visit the GitHub Pages site or open `/index.html` locally to see:
- All 33 legend roles with symbols and meanings
- 6 core formulas
- Color system mapping
- Interactive role cards

### Create Sparks

1. Open `/spark/index.html` in your browser
2. Fill in the spark creation form
3. Click "⚡ Emit Spark"
4. Download the generated HTML file
5. Save to `/spark/sparks/` directory

**Alternative Pipeline:**
1. **📥 Intake Node** (`/spark/builder/intake.html`) - Validate and queue content
2. **🪡 Weaver** (`/spark/builder/weaver.html`) - Connect to existing sparks
3. **🟡 Emitter** (`/spark/builder/emitter.html`) - Publish as permanent page

---

## 🎨 Legend Roles

The system defines 33 core roles across 7 color categories:

| Color | Meaning | Example Roles |
|-------|---------|---------------|
| 🟩 GREEN | Input/Reception | INTAKE_NODE, FILTER, VALIDATOR |
| 🟧 ORANGE | Processing | ROBOT_CORE, ASSEMBLER, GEAR |
| 🟦 BLUE | Logic/Control | ORCHESTRATOR, ROUTER, CONTROLLER |
| 🟥 RED | Action/Output | EMITTER, BEACON, DISTRIBUTOR |
| 🟪 PURPLE | Memory/State | MEMORY_NODE, DISK, CACHE |
| 🟨 YELLOW | Connection | CROWN_INDEX, WEAVER, BRIDGE |
| 💗 PINK | Heart/Core | HEART_NODE, NUCLEUS |

**Key Roles:**
- 🦾 **ROBOT_CORE** - Autonomous execution engine
- 🪐 **MEMORY_NODE** - Persistent storage (never forgets)
- 👑 **CROWN_INDEX** - Authoritative central index
- 🛒 **ORCHESTRATOR** - High-level coordinator
- ⚡ **SPARK** - Creation impulse
- 🪡 **WEAVER** - Thread connector
- 🟡 **EMITTER** - Output generator

See `/LEGEND.md` for complete role descriptions.

---

## 🔮 Core Formulas

### 🛒📶👑 Powerful Orchestrator
**Formula:** Orchestrator + Nuances + Powerful Token  
**Result:** High-level coordination with semantic precision

### 🦾-[📀]-🕹️ Robot-Disk-Controller
**Formula:** Robot → Disk → Controller  
**Result:** Controlled data access pattern

### 🧲🪐🔁 Magnet-Memory-Loop
**Formula:** Magnet → Memory → Loop  
**Result:** Persistent attraction cycle (the heartbeat)

### ⚡🪡🟡 Spark-Weaver-Emitter
**Formula:** Spark → Weaver → Emitter  
**Result:** Creation to publication pipeline

See `/legend.json` for all formulas and flows.

---

## 🌐 How It Works Without Termux

The system becomes **repos + tokens** through GitHub infrastructure:

### Discovery Mechanism

Each repo declares its roles via meta tags:

```html
<meta name="infinity-legend-roles" content="CROWN_INDEX,ORCHESTRATOR,MEMORY_NODE">
<meta name="infinity-legend-symbols" content="👑,🛒,🪐">
<meta name="infinity-legend-version" content="1.0.0">
```

### Self-Propagation Steps

1. **GitHub Pages** hosts the legend automatically
2. Repos **declare roles** in their HTML meta tags
3. Crown Index **discovers** role-bearing repos
4. New repos **spawn** from templates with legend DNA
5. Network effect creates **domino cascade**

### Token Creation

Token repositories:
- Have a single focused role
- Link back to Crown Index
- Declare themselves via meta tags
- Can be composed with other tokens
- Never execute, only exist and link

---

## 💾 Data Persistence

### localStorage Schema

```json
{
  "sparks": [
    {
      "id": "spark_001",
      "title": "...",
      "content": "...",
      "roles": ["ROBOT_CORE", "..."],
      "connections": ["spark_002"],
      "timestamp": "2026-01-01T00:00:00Z",
      "icon": "⚡"
    }
  ],
  "connections": [
    {"from": "spark_001", "to": "spark_002", "created": "..."}
  ],
  "nextId": 2
}
```

Data persists across browser sessions using localStorage (🪐 MEMORY_NODE pattern).

---

## 🎮 Features

### Spark Index Builder (`/spark/index.html`)

- ✨ **Never-Destroy UI** - Physically incapable of overwriting
- 📝 **Input Form** - Title, content, roles, connections
- 📊 **Real-Time Grid** - All created sparks displayed
- 📈 **Stats Dashboard** - Total sparks, connections, growth rate
- 🕸️ **Graph Visualization** - Canvas-based connection display
- 🪐 **localStorage Persistence** - State survives sessions
- 💾 **Downloadable Pages** - Generate complete HTML files

### Builder Pipeline

1. **📥 Intake Node** - Validates input, ensures quality
2. **🪡 Weaver** - Selects connections to existing sparks
3. **🟡 Emitter** - Publishes as immutable HTML page

### Generated Spark Pages

Each spark page includes:
- Full content preservation (pre-wrap formatting)
- Legend roles in meta tags
- Spark ID, timestamp, metadata
- Connection links to other sparks
- Back navigation to spark index
- Consistent styling

---

## 🎨 Design System

### Colors
- Background: `linear-gradient(135deg, #0f0c29, #302b63, #24243e)`
- Primary: `#ffd700` (gold) with shimmer animation
- Cards: `rgba(255,255,255,0.05-0.1)` translucent overlays
- Borders: Golden glow on hover

### Typography
- Font: `'Courier New', monospace`
- Headers: Large, bold, gold gradient
- Code-friendly throughout

### Responsive
- Grid layouts with `auto-fit, minmax`
- Mobile-friendly inputs
- Touch-friendly cards

---

## 🔗 Links

- **Crown Index:** `/index.html`
- **Legend Schema:** `/legend.json`
- **Documentation:** `/LEGEND.md`
- **Spark Builder:** `/spark/index.html`
- **GitHub Pages:** https://pewpi-infinity.github.io/legend-core/

---

## 🍄 The Emoji Tagline

**🍄🍄👲🏻🏰🏰👸🏼🍄🐢💗⚡⚡⚡🌟👻🎮🕹️👾**

- 🍄🍄 - Growth and expansion
- 👲🏻🏰🏰👸🏼 - Kris + Legend kingdoms
- 🍄🐢 - Slow steady growth (never rushed)
- 💗 - Heart node (emotional core)
- ⚡⚡⚡ - Triple spark (creation energy)
- 🌟 - Bright beacon
- 👻🎮🕹️👾 - Playful robot spirits

---

## 📜 License

Part of the Infinity Legend ecosystem. Follows the never-destroy principle.

---

## 🤝 Contributing

To contribute:
1. Create a spark describing your contribution
2. Link it to relevant existing sparks
3. Emit and preserve it forever
4. The system only grows, never shrinks

---

**Status:** 🟢 ACTIVE | **Loop:** 🧲🪐🔁 | **Version:** 1.0.0

*The legend never stops growing. Every moment adds, never subtracts.*
