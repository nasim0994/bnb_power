import { baseApi } from "../baseApi";

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPortfolio: builder.mutation({
      query: (data) => ({
        url: `/api/portfolio/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["portfolio"],
    }),

    getAllPortfolio: builder.query({
      query: () => ({
        url: "/api/portfolio/all",
      }),
      providesTags: ["portfolio"],
    }),

    updatePortfolio: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/portfolio/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["portfolio"],
    }),

    getSinglePortfolio: builder.query({
      query: (id) => ({
        url: `/api/portfolio/${id}`,
      }),
      providesTags: ["portfolio"],
    }),

    getPortfolioBySlug: builder.query({
      query: (slug) => ({
        url: `/api/portfolio/slug/${slug}`,
      }),
      providesTags: ["portfolio"],
    }),

    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `/api/portfolio/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["portfolio"],
    }),
  }),
});

export const {
  useGetAllPortfolioQuery,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useGetSinglePortfolioQuery,
  useGetPortfolioBySlugQuery,
  useDeletePortfolioMutation,
} = portfolioApi;
