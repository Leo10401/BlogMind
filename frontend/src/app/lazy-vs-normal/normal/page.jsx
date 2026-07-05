"use client";
import React from "react";
import HeavyComponent from "../../../components/HeavyComponent";

export default function NormalLoadPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28 }}>Normal Loading (No Lazy Loading)</h1>
      <HeavyComponent />
    </main>
  );
}
