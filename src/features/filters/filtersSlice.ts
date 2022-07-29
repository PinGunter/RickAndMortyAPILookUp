import { createSlice } from "@reduxjs/toolkit";
import { Filter } from "../../types";

const initialState: Filter = {
  name: "",
  status: "",
  gender: "",
  species: "",
  type: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setName: (state, action) => (state.name = action.payload),
    setStatus: (state, action) => (state.status = action.payload),
    setGender: (state, action) => (state.gender = action.payload),
    setSpecies: (state, action) => (state.species = action.payload),
    setType: (state, action) => (state.type = action.payload),
    resetFilter: (state) => (state = initialState),
    resetCharacter: (state) => {
      state.status = "";
      state.gender = "";
      state.species = "";
    },
    resetLocation: (state) => {
      state.type = "";
    },
  },
});

export const {
  setName,
  setStatus,
  setGender,
  setSpecies,
  setType,
  resetFilter,
  resetCharacter,
  resetLocation,
} = filtersSlice.actions;

// any?
export const selectFilters = (state: any) => state.filtersReducer;

export default filtersSlice.reducer;
