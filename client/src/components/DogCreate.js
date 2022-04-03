import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDog, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Your breed must have a name";
  } else if (!input.heightMin) {
    errors.heightMin = "Minimum height is required!!";
  }
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory(); //me redirecciona despues de crear el personaje
  const allTemperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperaments: [],
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }
  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value], // le pasamos el input temperaments que habia y despues el target...
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.heightMin &&
      !errors.heightMax &&
      !errors.weightMin &&
      !errors.heightMax
    ) {
      alert("Dog creado");
      dispatch(createDog(input));

      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
    } else {
      return alert("Dog no ha sido creado vuelva a intentarlo");
    }

    history.push("/home");
  }
  function handleDeleteTemperament(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temp) => temp !== e),
    });
  }
  return (
    <div>
      <Link to="/home">Volver</Link>
      <h1>CREATE A NEW DOG</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <div>
            <p> {errors.name && <p>{errors.name}</p>}</p>
          </div>
        </div>

        <div>
          <label>Minimum height:</label>
          <input
            type="text"
            value={input.heightMin}
            name="heightMin"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Maximum height:</label>
          <input
            type="text"
            value={input.heightMax}
            name="heightMax"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Minimum weight:</label>
          <input
            type="text"
            value={input.weightMin}
            name="weightMin"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Maximum weight:</label>
          <input
            type="text"
            value={input.weightMax}
            name="weightMax"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Time life</label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <select onChange={(e) => handleSelect(e)}>
          <option value="selected" hidden>
            Temperament
          </option>
          {allTemperaments
            ?.sort(function (a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            })
            .map((temp) => (
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
        </select>

        <button type="submit">Crear Dog</button>
      </form>
      {input.temperaments.map((e) => (
        <div key={e}>
          <p>{e}</p>
          <button onClick={() => handleDeleteTemperament(e)}>X</button>
        </div>
      ))}
    </div>
  );
}
