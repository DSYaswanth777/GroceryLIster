// Create a new file: reducers.js

const initialState = {
  selectedItems: [],
};

export const selectedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_ITEMS":
      return {
        ...state,
        selectedItems: action.payload,
      };
    default:
      return state;
  }
};
