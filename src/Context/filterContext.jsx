import { createContext, useReducer } from "react";
import { filterReducer } from "../Reducer/filterReducer";

const FilterContext = createContext({
  selectedCategory: "All",
  items: [],
});

const FilterProvider = ({ children }) => {

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    selectedCategory: "All",
    items: [],
    initialState: [],
  });

  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
