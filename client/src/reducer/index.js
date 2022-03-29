import { GET_DOGS, FILTER_CREATED } from "../actions/types";

const initialState = {
  dogs: [],
  allDogs: [],
  backupDogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };

    case FILTER_CREATED:
      let bc = state.backupDogs;
      let createdFilter =
        action.payload === "CREATED"
          ? bc.filter((el) => el.createdInDb)
          : bc.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "ALL" ? state.backupDogs : createdFilter,
      };

    default:
      return state;
  }
}

export default rootReducer;
