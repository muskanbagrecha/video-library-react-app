export const filterReducer = (state, action) => {
  switch (action.type) {
    
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
        initialState: action.payload,
      };

    case "SET_CATEGORY":
      console.log(action.payload);
      return { ...state, selectedCategory: action.payload };

    case "RESET_CATEGORY":
      return { ...state, selectedCategory: "All", items: state.initialState };

    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
