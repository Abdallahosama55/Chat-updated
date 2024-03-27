import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../../assets/placeholder-data/ContentSections/cards";

const initialState = {
  scrolled: false,
  favEn: false,
  currCategory: categories[0],
  favCards: new Array(categories.length).fill(false),
};

const contentSectionsSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    scroll(currentState) {
      currentState.scrolled = !currentState.scrolled;
    },
    favToggel(currentState) {
      currentState.favEn = !currentState.favEn;
    },
    setCategory(currentState, actions) {
      currentState.currCategory = actions.payload.category;
    },
    favCardToggel(currentState, actions) {
      currentState.favCards[actions.payload.id] =
        !currentState.favCards[actions.payload.id];
    },
  },
});

export const { scroll, favToggel, setCategory, favCardToggel } =
  contentSectionsSlice.actions;

export default contentSectionsSlice.reducer;
