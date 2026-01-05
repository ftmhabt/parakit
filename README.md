# 🦜 Parakeet-UI

A playful React UI library featuring physics-based animations, delightful micro-interactions, and optional sound feedback.

## Installation

```bash
npm install parakeet-ui framer-motion
```

## Quick Start

```tsx
import { ParakeetProvider, Button } from "parakeet-ui";

function App() {
  return (
    <ParakeetProvider>
      <Button variant="primary" onClick={() => console.log("Chirp!")}>
        Click me!
      </Button>
    </ParakeetProvider>
  );
}
```

## Features

- 🎯 **Physics-based animations** - Natural, spring-based movements
- ✨ **Micro-interactions** - Delightful hover and click feedback
- 🔊 **Sound effects** - Optional audio feedback (can be disabled)
- ♿ **Accessible** - Respects `prefers-reduced-motion`
- 📦 **Tree-shakeable** - Only import what you use
- 💪 **TypeScript** - Full type support

## Configuration

```tsx
<ParakeetProvider
  config={{
    sounds: true,
    soundVolume: 0.3,
    physics: {
      stiffness: 400,
      damping: 30,
      mass: 1,
    },
  }}
>
  <App />
</ParakeetProvider>
```

## Components

### Button

```tsx
<Button
  variant="primary" | "secondary" | "ghost"
  size="sm" | "md" | "lg"
  sound="pop" | "chirp" | "none"
>
  Click me
</Button>
```

## License

MIT
