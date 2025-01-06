import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/api/about",
      }),
      providesTags: ["about"],
    }),

    updateAbout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/about/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),

    addAbout: builder.mutation({
      query: (data) => ({
        url: `/api/about/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),

    getSingleAbout: builder.query({
      query: (id) => ({
        url: `/api/about/${id}`,
      }),
    }),

    getAboutBySlug: builder.query({
      query: (slug) => ({
        url: `/api/about/slug/${slug}`,
      }),
    }),

    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `/api/about/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useAddAboutMutation,
  useUpdateAboutMutation,
  useGetSingleAboutQuery,
  useDeleteAboutMutation,
  useGetAboutBySlugQuery,
} = aboutApi;
