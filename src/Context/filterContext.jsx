import { createContext, useReducer } from "react";
import { filterReducer } from "../Reducer/filterReducer";

const FilterContext = createContext({
  categories: ["All"],
  items: [],
});

const FilterProvider = ({ children }) => {

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    categories: ["All"],
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
