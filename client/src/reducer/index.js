import {
  GET_DOGS,
  GET_TEMPERAMENT,
  FILTER_BY_TEMPERAMENTS,
  FILTER_CREATED,
  ORDER_BY_NAME,
  GET_NAME_DOG,
  // ORDER_BY_WEIGHT,
  GET_DETAILS,
  CREATE_DOG,
} from "../actions/types";

const initialState = {
  dogs: [],
  temperaments: [],
  detail: [],
  filterDogs: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload, //se envia todo lo que te envia la accion dogs
        filterDogs: action.payload,
      };

    case GET_NAME_DOG:
      return {
        ...state,
        dogs: action.payload, // simpre lo hacemos con dogs por que es el arreglo que estoy renderizando
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_BY_TEMPERAMENTS:
      const allDogs = state.filterDogs;
      const temperamentFilter =
        action.payload === "All"
          ? allDogs
          : allDogs.filter((e) => e.temperament?.includes(action.payload));

      return {
        ...state,
        dogs: temperamentFilter,
      };
    case FILTER_CREATED:
      const allDogsCreated = state.filterDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogsCreated.filter((e) => e.createdInDb)
          : allDogsCreated.filter((e) => !e.createdInDb);

      return {
        ...state,
        dogs: action.payload === "all" ? allDogsCreated : createdFilter,
      };

    // case ORDER_BY_NAME:
    // let order =
    //   action.payload === "asc"
    //     ? state.dogs.sort(function (a, b) {
    //         if (a.name > b.name) {
    //           //compara y ordena posicion de derecha o izquierda
    //           return 1;
    //         }
    //         if (b.name > a.name) {
    //           //compara y ordena de menor
    //           return -1;
    //         }
    //         return 0; // si son iguales lo deja como esta
    //       })
    //     : // aqui si es descendente aplicamos?
    //       state.dogs.sort(function (a, b) {
    //         if (a.name > b.name) {
    //           return -1;
    //         }
    //         if (b.name > a.name) {
    //           return 1;
    //         }
    //       });
    // return {
    //   dogs: order,
    // };
    case ORDER_BY_NAME:
      let order =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: order,
      };
    // case ORDER_BY_WEIGHT:
    //   let sortArrayW =
    //     action.payload === "desc"
    //       ? state.dogs.sort((a, b) => {
    //           return b.weightMin - a.weightMin;
    //         })
    //       : state.dogs.sort((a, b) => {
    //           return a.weightMin - b.weightMin;
    //         });
    //   return {
    //     ...state,
    //     dogs: sortArrayW,
    //   };
    // case GET_DETAILS:
    //   return {
    //     ...state,
    //     detail: action.payload,
    //   };
    case CREATE_DOG:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
