import React from "react";

export default function DogCard({ name, image, id }) {
  return (
    <div>
      <h3>{id}</h3>
      <h3>{name}</h3>
      <img src={image} alt={`${name}`} width="250px" heigth="200px" />
    </div>
  );
}
