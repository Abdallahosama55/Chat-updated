import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "./url";

const token = localStorage.getItem("token");
const mutqinApi = createApi({
  reducerPath: "mutqinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    timeout: 60000,
    prepareHeaders: (headers) => {
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});

export default mutqinApi;
