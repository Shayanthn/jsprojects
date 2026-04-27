# 🔥 Episode 11 - 3D Shoe Finder

An interactive 3D shoe browsing experience built with React Three Fiber. Explore dynamic collections of sneakers in an immersive grid with real-time filtering, smooth animations, holographic card effects, and intuitive zoom controls.

## 🎬 Watch the Tutorial

**Want to see how this was built?** Check out the full video tutorial on our YouTube channel:

[![YouTube](https://img.shields.io/badge/YouTube-SHAYANTHN-FF0000?logo=youtube&logoColor=white)](https://youtube.com/@shayanthn)

Click above to watch the complete walkthrough and learn advanced 3D web techniques!

---

## ✨ Features

- **3D Interactive Grid** — Explore shoes in a customizable 3D environment
- **Holographic Card Effects** — Custom shaders for stunning visual effects
- **Real-time Filtering** — Filter by category and search
- **Smooth Animations** — Framer Motion powered UI interactions
- **Mini Map Navigation** — Quick overview and navigation controls
- **Debug Controls** — Leva UI for real-time parameter adjustment
- **Responsive Design** — Tailwind CSS for beautiful responsive layouts
- **Topography Background** — Dynamic shader-based background effects

## 🛠️ Tech Stack

- **Next.js 16** (Pages Router) — Modern React framework
- **React 19** — Latest React capabilities
- **React Three Fiber + Drei** — 3D rendering and helpers
- **Framer Motion** — Smooth UI animations and transitions
- **Tailwind CSS v4** — Utility-first styling
- **Three.js** — WebGL graphics library
- **Leva** — Real-time debug controls
- **GLSL Shaders** — Custom shader effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint code quality checks |
| `npm run format` | Format code with Prettier |

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── grid/           # 3D grid and shoe components
│   ├── CloseButton.jsx
│   ├── Header.jsx
│   ├── HoloCardMaterial.js  # Holographic effect shader
│   ├── MiniMap.jsx
│   └── TopologyBackground.jsx
├── pages/              # Next.js pages
├── shaders/            # GLSL shader files
└── styles/             # Global CSS
```

## 🎨 Key Components

- **ShoeGrid** — Main 3D grid container
- **ShoeTile** — Individual shoe card with interactions
- **HoloCardMaterial** — Custom Three.js material with holographic effects
- **GridUI** — Control bar with filters and settings
- **TopologyBackground** — Animated background layer

## 📦 Backend

Shoe data is stored in `backend/shoes.json` with image references.

## 🎓 Learning Points

This project demonstrates:
- Advanced React Three Fiber usage
- Custom GLSL shader programming
- Complex state management with Leva
- Performance optimization for 3D rendering
- Modern animation patterns with Framer Motion
- Next.js best practices

---

## 🔗 Connect With Us

- 📺 **YouTube**: [SHAYANTHN](https://youtube.com/@shayanthn) — Subscribe for more creative coding!
- 📸 **Instagram**: [shayan.thn](https://instagram.com/shayan.thn)
- 💬 **Telegram**: [Join Community](https://t.me/+BIJqCLmImYsxMmQx)

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

Created by **SHAYANTHN** for interactive web experiences and creative coding enthusiasts.

---

**Enjoy exploring the 3D shoe finder! Don't forget to like, subscribe, and hit the notification bell on [SHAYANTHN's YouTube channel](https://youtube.com/@shayanthn) for more amazing projects!** 🚀

## Project Structure

```
src/
├── components/
│   ├── grid/              # 3D grid internals
│   │   ├── ShoeGrid.jsx   # Main orchestrator
│   │   ├── ShoeTile.jsx   # Individual 3D shoe tile
│   │   ├── GridCanvas.jsx # Grid layout + time-sliced mounting
│   │   ├── Rig.jsx        # Camera controls (drag/zoom)
│   │   ├── gridState.js   # Shared state + helpers
│   │   └── gridConfig.js  # Grid configuration
│   ├── GridUI.jsx         # Dynamic Island control bar
│   ├── MiniMap.jsx        # Navigation minimap
│   ├── Header.jsx         # Top header
│   └── CloseButton.jsx    # 3D close button overlay
├── pages/
│   └── index.js           # Entry point
└── styles/                # Global CSS
```
