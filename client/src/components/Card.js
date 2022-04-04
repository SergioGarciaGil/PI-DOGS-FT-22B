import React from "react";
import style from "./Card.module.css";

export default function Card({ name, image, id }) {
  return (
    <div className={style.card}>
      <h3>{id}</h3>
      <h3 className={style.linkTitle}>{name}</h3>
      <img
        className={style.img}
        src={image}
        alt={`${name}`}
        width="250px"
        heigth="200px"
      />
    </div>
  );
}
