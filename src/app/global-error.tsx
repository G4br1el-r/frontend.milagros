"use client";
import { useEffect } from "react";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.25rem",
          backgroundColor: "#f7ecdc",
          color: "#3a2213",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            maxWidth: "28rem",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "1.875rem",
              lineHeight: 1.2,
              fontWeight: 500,
            }}
          >
            O site não carregou
          </h1>
          <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.7 }}>
            A falha foi do nosso lado. Recarregue a página — se persistir, fale
            com a gente no WhatsApp.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              backgroundColor: "#3a2213",
              color: "#f7ecdc",
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  );
}
