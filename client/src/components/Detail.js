import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Detail(props) {
  console.log(props);
  const dispath = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispath(getDetails(id));
  }, [dispath, id]);

  const detailDog = useSelector((state) => state.detail);

  return (
    <div>
      {detailDog.length === 0 ? (
        <p>Loading...</p>
      ) : (
        detailDog.length > 0 && (
          <div>
            <div>
              <h1> {detailDog[0].name}</h1>
            </div>
            <img
              src={detailDog[0].image}
              alt="img not found"
              width="400px"
              height="250px"
            />
            <div>
              <h2>Temperaments:</h2>
              <p>
                {!detailDog[0].createdInDb
                  ? detailDog[0].temperament + " "
                  : detailDog[0].temperaments.map((e) => e.name + " ")}
              </p>
              <h2>Weight</h2>
              <p>
                {detailDog[0].weightMin}cm - {detailDog[0].weightMax}cm
              </p>
            </div>
            <h2>Weight:</h2>
            <p>
              {detailDog[0].weightMin} kgs - {detailDog[0].weightMax} kgs{" "}
            </p>
            <h2>Height:</h2>
            <p>
              {detailDog[0].heightMin} cm - {detailDog[0].heightMax} cm{" "}
            </p>
            <h2>Life Span: </h2> <p> {detailDog[0].life_span} </p>
            <Link to="/home">
              <button>Volver</button>
            </Link>
          </div>
        )
      )}
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
