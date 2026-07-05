"use client";
import React, { Suspense } from "react";

const HeavyComponent = React.lazy(() => import("../../../components/HeavyComponent"));

export default function LazyLoadPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28 }}>Lazy Loading Example</h1>
      <Suspense fallback={<div style={{fontSize: 20}}>Loading heavy component...</div>}>
        <HeavyComponent />
      </Suspense>
    </main>
  );
}
