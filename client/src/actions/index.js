import axios from "axios";
import {
  GET_DOGS,
  FILTER_CREATED,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_RAZA,
  ORDER_BY_NAME,
  GET_NAME_DOG,
  GET_TEMPERAMENT,
  GET_DETAILS,
  ORDER_BY_WEIGHT,
} from "./types";

export function getAll() {
  return async function (dispatch) {
    //aca en donde se conecta el front con el back
    let json = await axios.get("https://pi-dogs-deploy1.herokuapp.com/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: json.data,
    });
  };
}

export function getNameDog(name) {
  //se puede usar payload o name cualquier nombre
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "https://pi-dogs-deploy1.herokuapp.com/dogs?name=" + name
      );
      return dispatch({
        type: GET_NAME_DOG,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get(
      "https://pi-dogs-deploy1.herokuapp.com/temperament"
    );
    return dispatch({
      type: GET_TEMPERAMENT,
      payload: json.data,
    });
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    let response = await axios.post(
      "https://pi-dogs-deploy1.herokuapp.com/dog",
      payload
    );
    console.log(response);
    return response;
  };
}
//   return async function (dispatch) {
//     const response = await axios.post("http://localhost:3001/dogs", payload);
//     return response;
//   };
// }
export function filterByTemperaments(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `https://pi-dogs-deploy1.herokuapp.com/dogs/${id}`
      );
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function filterByRaza() {
//   return async function (dispatch) {
//     //aca en donde se conecta el front con el back
//     let json = await axios.get("http://localhost:3001/dogs");
//     return dispatch({
//       type: FILTER_BY_RAZA,
//       payload: json.data,
//     });
//   };
// }
