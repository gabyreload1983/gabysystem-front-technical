import React from "react";
import { useParams } from "react-router-dom";

export default function MyOrders() {
  const { codeTechnical } = useParams();
  return (
    <>
      <div>MyOrders {codeTechnical}</div>
    </>
  );
}
