import React from "react";
import { useParams } from "react-router-dom";

export default function Pending() {
  const { sector } = useParams();

  return (
    <>
      <div>Pending {sector} </div>
    </>
  );
}
