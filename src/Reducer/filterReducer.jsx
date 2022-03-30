export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      console.log("from reducer",action.payload);
      return {
        ...state,
        items: action.payload,
        initialState: action.payload
      }
    case "SET_CATEGORY":
      const updatedCategories = [...state.categories].filter(
        (category) => category !== "All"
      );
      return { ...state, categories: [updatedCategories, action.payload] };
    case "RESET_CATEGORY":
      return { ...state, categories: ["All"], items: state.initialState };
  }
};
