"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/saludo`)
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje))
      .catch(() => setMensaje("Error conectando con API"));
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>WinCoffee Nueva Web</h1>
      <p>Mensaje desde backend:</p>
      <strong>{mensaje}</strong>
    </main>
  );
}