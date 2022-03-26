import React from "react";

export default function DogCard({ name, image }) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={`${name}`} width="250px" heigth="200px" />
    </div>
  );
}
