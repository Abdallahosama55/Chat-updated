import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import apiReducer from "../slices/apiSlice";
import apiSlice from "../features/api/apiSlice";
import userSlice from "../features/api/userSlice";
import { actionsTypes } from "@/helpers/constants";
import articleSlice from "../slices/createArticle/articleSlice";
import mutqinApi from "../api/mutqinApi";
import chatReducer from "../slices/chatSlice";
import mutqinAssistantSlice from "../slices/mutqinAssistantSlice";
import contentSectionsSlice from "../slices/contentSections/contentSectionsSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    api: apiReducer,
    mutqinAssistant: mutqinAssistantSlice,
    checker: apiSlice,
    chat: chatReducer,
    user: userSlice,
    article: articleSlice,
    contentSections: contentSectionsSlice,
    [mutqinApi.reducerPath]: mutqinApi.reducer,
    isOpenHistoryPanel: (state = false, action) => {
      if (action.type === actionsTypes.TOGGLE_HISTORY_PANEL) {
        return !state;
      }
      if (action.type === actionsTypes.TOGGLE_HISTORY_PANEL_FALSE) {
        return false;
      }
      return state;
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mutqinApi.middleware),
});

export default store;
