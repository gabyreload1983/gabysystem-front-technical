import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [orderInput, setOrderInput] = useState("");
  const navigate = useNavigate();

  const searchOrder = async () => {
    let orderPrefix = "ORX0011000";
    const nrocompro = orderPrefix + orderInput;
    navigate(`/orders/${nrocompro}`);
  };

  const handleSearchChange = (event) => {
    const search = event.target.value;
    setOrderInput(search);
  };
  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Ultimos 5 numeros"
        onChange={handleSearchChange}
        name="search"
      />
      <button className="btn btn-outline-success" onClick={searchOrder}>
        Buscar
      </button>
    </div>
  );
}
