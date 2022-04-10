import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./Detail.module.css";

export default function Detail(props) {
  console.log(props);
  const dispath = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispath(getDetails(id));
  }, [dispath, id]);

  const detailDog = useSelector((state) => state.detail);

  return (
    <div className={style.container}>
      <div className={style.card}>
        {detailDog.length === 0 ? (
          <p>Loading...</p>
        ) : (
          detailDog.length > 0 && (
            <div className={style.cardDetail}>
              <div>
                <h1 className={style.textDetail}> {detailDog[0].name}</h1>
              </div>
              <img
                src={detailDog[0].image}
                alt="img not found"
                width="400px"
                height="250px"
                className={style.imgDetail}
              />

              <div>
                <h2 className={style.containTemperament}>
                  Temperaments:
                  <p>
                    {!detailDog[0].createdInDb
                      ? detailDog[0].temperament + " "
                      : detailDog[0].temperaments.map((e) => e.name + " ")}
                  </p>{" "}
                </h2>

                <h2 className={style.containWeight}>
                  Weight:
                  <p>
                    {detailDog[0].weightMin}Kg - {detailDog[0].weightMax}Kg
                  </p>
                </h2>
                <h2 className={style.containHeight}>
                  Height:
                  <p>
                    {detailDog[0].heightMin} cm - {detailDog[0].heightMax} cm{" "}
                  </p>
                </h2>
              </div>

              <h2 className={style.containLifeSpan}>
                Life Span: <p> {detailDog[0].life_span} </p>
              </h2>
              <Link to="/home">
                <button className={style.btnDetail}>Volver</button>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
  //         <div>
  //
  //         <div>
  //         <h1 h1 > Soy { detailDog[0].name }</h1 >
  //         <img
  //           src={detailDog[0].img ? detailDog[0].img : detailDog[0].image}
  //           alt={`${detailDog[0].name}`}
  //           width="250px"
  //           heigth="200px"
  //         />
  //         <h2>Temperaments:</h2>
  //         <p>
  //           {!detailDog[0].createdInDb
  //             ? detailDog[0].temperaments + " "
  //             : detailDog.temperaments.map((e) => e.name + " ")}
  //         </p>
  //         <h2>Weight</h2>
  //         <p>
  //           {detailDog[0].weightMin}cm - {detailDog[0].weightMax}cm
  //         </p>
  //         <h2>Heigth</h2>
  //         <p>
  //           {detailDog[0].weightMin} cm - {detailDog[0].weightMax} cm
  //         </p>
  //         <h2>Life Span</h2>
  //         <p>{detailDog[0].life_span}</p>

  //         <Link to="/home">
  //           <button>Volver</button>
  //                 </Link>

  //       </div >
  //     </div >

  //   );
  // }
}
