import { baseApi } from "../baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addClsCategory: builder.mutation({
      query: (data) => ({
        url: `/api/portfolio/category/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["clsCategory"],
    }),

    getAllClsCategory: builder.query({
      query: (query) => ({
        url: "/api/portfolio/category/all",
        params: query,
      }),
      providesTags: ["clsCategory"],
    }),

    updateClsCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/portfolio/category/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["clsCategory"],
    }),

    getSingleClsCategory: builder.query({
      query: (id) => ({
        url: `/api/portfolio/category/${id}`,
      }),
      providesTags: ["clsCategory"],
    }),

    getClsCategoryBySlug: builder.query({
      query: (slug) => ({
        url: `/api/portfolio/category/slug/${slug}`,
      }),
      providesTags: ["clsCategory"],
    }),

    deleteClsCategory: builder.mutation({
      query: (id) => ({
        url: `/api/portfolio/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["clsCategory"],
    }),
  }),
});

export const {
  useGetAllClsCategoryQuery,
  useAddClsCategoryMutation,
  useUpdateClsCategoryMutation,
  useGetSingleClsCategoryQuery,
  useGetClsCategoryBySlugQuery,
  useDeleteClsCategoryMutation,
} = categoryApi;
