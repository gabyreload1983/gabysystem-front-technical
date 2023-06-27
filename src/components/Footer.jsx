import React from "react";

export default function Footer() {
  return (
    <footer className="d-flex flex-column jsutify-content-center align-items-center">
      <h5>Developed by GabySystem</h5>
      <h6>Technicals-V{import.meta.env.VITE_VERSION}</h6>
    </footer>
  );
}
