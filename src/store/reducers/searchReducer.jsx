import { ADD_SEARCH } from "../constants/actionTypes";


let initialState = null;
const searchReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_SEARCH:
      return (
        action.payload
      )
    default:
      return state;
  }

}

export default searchReducer;