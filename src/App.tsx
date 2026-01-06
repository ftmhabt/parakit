import { Button } from "./components/Button";
import { ParakitProvider } from "./providers/ParakitProvider";

export default function App() {
  return (
    <ParakitProvider>
      <div
        style={{
          padding: "40px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <h1>🦜 Parakit</h1>

        <div style={{ width: "100%" }} />

        <Button variant="primary" size="sm">
          Small Primary
        </Button>

        <Button variant="primary" size="md">
          Medium Primary
        </Button>

        <Button variant="primary" size="lg">
          Large Primary
        </Button>

        <div style={{ width: "100%" }} />

        <Button variant="secondary">Secondary</Button>

        <Button variant="ghost">Ghost</Button>

        <Button disabled>Disabled</Button>

        <div style={{ width: "100%" }} />

        <Button onClick={() => alert("Clicked!")}>Click Me!</Button>
      </div>
    </ParakitProvider>
  );
}
