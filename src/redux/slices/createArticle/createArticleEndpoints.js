import mutqinApi from "../../api/mutqinApi";

const endpoints = {
  keywords: "v1/spacetly_articleGenerator/generate-keywords/",
  titles: "v1/spacetly_articleGenerator/generate_Titles/",
  subTitles: "v1/spacetly_articleGenerator/generate_SubTitles/",
  article: "v1/spacetly_articleGenerator/generate_Articles/",
  generateId: "v1/spacetly_articleGenerator/article-id/",
  allArticles: "v1/spacetly_articleGenerator/get_all_articles/",
  search: "v1/spacetly_articleGenerator/get_all_articles/",
  getArticleById: "v1/spacetly_articleGenerator/get_article_detail/",
};

const createArticleEndpoints = mutqinApi.injectEndpoints({
  endpoints: (builder) => ({
    keywords: builder.query({
      query: (body) => ({
        url: endpoints.keywords,
        body,
        method: "POST",
      }),
    }),
    titles: builder.query({
      query: (body) => ({
        url: endpoints.titles,
        body,
        method: "POST",
      }),
    }),
    subTitles: builder.query({
      query: (body) => ({
        url: endpoints.subTitles,
        body,
        method: "POST",
      }),
    }),
    article: builder.query({
      query: ({ id, body }) => ({
        url: `${endpoints.article}${id}/`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["articles"],
    }),
    getPhase: builder.query({
      query: ({ id, phase }) =>
        `v1/spacetly_articleGenerator/${id}/info/?step=${phase}`,
    }),
    setPhase: builder.query({
      query: ({ id, phase, body }) => ({
        url: `v1/spacetly_articleGenerator/${id}/?step=${phase}`,
        body,
        method: "POST",
      }),
    }),
    generateId: builder.query({
      query: () => ({ url: endpoints.generateId, method: "POST" }),
    }),
    allArticles: builder.query({
      query: () => endpoints.allArticles,
      providesTags: ["articles"],
    }),
    search: builder.query({
      query: (query) => `${endpoints.search}?search=${query}`,
    }),
    getArticleById: builder.query({
      query: (id) => `${endpoints.getArticleById}${id}/`,
    }),
  }),
});

export const {
  useLazyKeywordsQuery,
  useLazyTitlesQuery,
  useLazySubTitlesQuery,
  useLazyArticleQuery,
  useLazyGetPhaseQuery,
  useLazySetPhaseQuery,
  useLazyGenerateIdQuery,
  useLazyAllArticlesQuery,
  useLazySearchQuery,
  useLazyGetArticleByIdQuery,
} = createArticleEndpoints;
