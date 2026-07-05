import React from "react";

// Simulate a heavy component (e.g., large image or computation)
export default function HeavyComponent() {
  // Simulate heavy computation
  const start = Date.now();
  while (Date.now() - start < 1000) {} // 1 second block

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2 style={{ fontSize: 32, color: '#0070f3' }}>Heavy Component Loaded!</h2>
      <img src="/black.png" alt="Heavy" width={300} height={300} />
      <p>This simulates a heavy component (1s load delay).</p>
    </div>
  );
}
