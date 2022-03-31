import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDog(name)); //  va ir guardando lo que esta tipeando mi usuario en mi estado local name que va llamar al backend
    setName("");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="buscar"
        onChange={(e) => handleInputChange(e)}
        value={name}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
