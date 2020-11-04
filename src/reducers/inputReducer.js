const initialState = {
  value: 200
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
}

export default inputReducer;