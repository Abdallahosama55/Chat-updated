import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newArticleId: "",
  keywords: [],
  title: "",
  subTitles: [],
  article: "",
  showHistory: false,
  language: "",
};

const articleSlice = createSlice({
  initialState,
  name: "newArticle",
  reducers: {
    setArticleId(state, { payload }) {
      state.newArticleId = payload;
    },
    addKeyword(state, { payload }) {
      state.keywords.push(payload);
    },
    delKeyword(state, { payload }) {
      state.keywords = state.keywords.filter((k) => k !== payload);
    },
    replaceKeywords(state, { payload }) {
      state.keywords = payload;
    },
    setTitle(state, { payload }) {
      state.title = payload;
    },
    setSubTitles(state, { payload }) {
      state.subTitles = payload;
    },
    addSubTitleInPlace(state, { payload }) {
      state.subTitles = [
        ...state.subTitles.slice(0, payload),
        "",
        ...state.subTitles.slice(payload),
      ];
    },
    addSubTitle(state, { payload }) {
      state.subTitles.push(payload);
    },
    changeSubTitle(state, { payload: { newSub, place } }) {
      state.subTitles[place] = newSub;
    },
    delSubTitle(state, { payload }) {
      state.subTitles = state.subTitles.filter((sub) => sub !== payload);
    },
    setArticle(state, { payload }) {
      state.article = payload;
    },
    toggleShowHistory(state, { payload }) {
      state.showHistory = payload;
    },
    setLanguage(state, { payload }) {
      state.language = payload;
    },
  },
});

export default articleSlice.reducer;
export const {
  addKeyword,
  delKeyword,
  replaceKeywords,
  setTitle,
  addSubTitle,
  delSubTitle,
  setSubject,
  setSubTitles,
  addSubTitleInPlace,
  changeSubTitle,
  setArticle,
  setArticleId,
  toggleShowHistory,
  setLanguage,
} = articleSlice.actions;
