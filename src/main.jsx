import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

function paintRuntimeError(message) {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = `
    <div style="font-family: Arial, sans-serif; margin: 24px; padding: 16px; border: 2px solid #c62828; border-radius: 8px; background: #ffebee; color: #7f0000;">
      <h2 style="margin: 0 0 10px;">Error de ejecución en frontend</h2>
      <p style="margin: 0 0 6px;">Se detectó un error de JavaScript:</p>
      <pre style="white-space: pre-wrap; margin: 0; font-size: 14px;">${String(
        message
      )}</pre>
    </div>
  `;
}

window.addEventListener("error", (event) => {
  paintRuntimeError(event.error?.message || event.message || "Error desconocido");
});

window.addEventListener("unhandledrejection", (event) => {
  paintRuntimeError(event.reason?.message || event.reason || "Promesa rechazada");
});

try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  paintRuntimeError(error?.message || error);
}
