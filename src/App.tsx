import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { ParakitProvider } from "./providers/ParakitProvider";

export default function App() {
  return (
    <ParakitProvider>
      <div
        style={{
          padding: "40px",
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          alignItems: "start",
        }}
      >
        <h1 style={{ width: "100%" }}>🦜 Parakit</h1>

        {/* Buttons Section */}
        <section style={{ width: "100%" }}>
          <h2>Buttons</h2>
          <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section style={{ width: "100%" }}>
          <h2>Cards</h2>
          <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
            {/* Basic tilt card */}
            <Card>
              <h3>Tilt Card</h3>
              <p style={{ opacity: 0.7, marginTop: "8px" }}>
                Move your mouse over me!
              </p>
            </Card>

            {/* Floating card */}
            <Card floating>
              <h3>Floating Card</h3>
              <p style={{ opacity: 0.7, marginTop: "8px" }}>
                I float up and down
              </p>
            </Card>

            {/* Draggable card */}
            <Card draggable sound="whoosh">
              <h3>Draggable Card</h3>
              <p style={{ opacity: 0.7, marginTop: "8px" }}>Drag me around!</p>
            </Card>

            {/* Combined effects */}
            <Card floating tilt size="lg">
              <h3>Everything Card</h3>
              <p style={{ opacity: 0.7, marginTop: "8px" }}>
                Floating + Tilt + Large size
              </p>
              <Button variant="primary" size="sm" style={{ marginTop: "16px" }}>
                Nested Button
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </ParakitProvider>
  );
}
