// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/url";

const initialState = {
  data: null,
  loading: false,
  error: null,
  post: { data: null, loading: false, error: null },
  rephrasePost: { data: null, loading: false, error: null },
  rephraseimport: { data: null, loading: false, error: null },
  delete: { data: null, loading: false, error: null },
};

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ endpoint, params }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response.data;
  }
);

export const updateData = createAsyncThunk(
  "api/updateData",
  async (endpoint, data) => {
    const response = await axios.put(`${baseURL}${endpoint}`, data);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "api/deleteData",
  async ({ endpoint }) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 0;
  }
);

export const postData = createAsyncThunk(
  "api/postData",
  async ({ endpoint, data }) => {
    const token = localStorage.getItem("token");
    // const response = await axios.post(`${baseURL}${endpoint}`, data, {
    const response = await axios.post(
      `${baseURL}${endpoint}`,
      { prompt: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);
export const postRephrase = createAsyncThunk(
  "api/postRephrase",
  async ({ endpoint, data }) => {
    const token = localStorage.getItem("token");
    // const response = await axios.post(`${baseURL}${endpoint}`, data, {
    const response = await axios.post(
      `${baseURL}${endpoint}`,
      { original_text: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);
export const importRephrase = createAsyncThunk(
  "api/importRephrase",
  async ({ endpoint, URL }) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${baseURL}${endpoint}`,
      { URL: URL },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    removeRephraseData: (state, action) => {
      state.rephrasePost.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        // Handle update data success
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // Handle delete data success
        state.delete.loading = false;
        state.delete.error = null;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.data = null;
        state.delete.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.post.loading = false;
        state.post.error = null;
      })
      .addCase(postData.rejected, (state, action) => {
        state.post.loading = false;
        state.post.data = null;
        state.post.error = action.error.message;
      })
      .addCase(postData.pending, (state) => {
        state.post.loading = true;
      })
      //
      //Reformulate
      //
      .addCase(postRephrase.fulfilled, (state, action) => {
        state.rephrasePost.data = action.payload;
        state.rephrasePost.loading = false;
        state.rephrasePost.error = null;
      })
      .addCase(postRephrase.rejected, (state, action) => {
        state.rephrasePost.loading = false;
        state.rephrasePost.data = null;
        state.rephrasePost.error = action.error.message;
      })
      .addCase(postRephrase.pending, (state) => {
        state.rephrasePost.loading = true;
      })
      .addCase(importRephrase.fulfilled, (state, action) => {
        state.rephrasePost.data = action.payload;

        state.rephrasePost.loading = false;
        state.rephrasePost.error = null;
      })
      .addCase(importRephrase.rejected, (state, action) => {
        state.rephrasePost.loading = false;
        state.rephrasePost.data = null;
        state.rephrasePost.error = action.error.message;
      })
      .addCase(importRephrase.pending, (state) => {
        state.rephrasePost.loading = true;
      });
  },
});
export const { removeRephraseData } = apiSlice.actions;
export default apiSlice.reducer;
