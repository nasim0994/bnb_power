import { baseApi } from "../baseApi";

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addClass: builder.mutation({
      query: (data) => ({
        url: `/api/portfolio/class/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["class"],
    }),

    getAllClass: builder.query({
      query: (query) => ({
        url: "/api/portfolio/class/all",
        params: query,
      }),
      providesTags: ["class"],
    }),

    updateClass: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/portfolio/class/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["class"],
    }),

    getSingleClass: builder.query({
      query: (id) => ({
        url: `/api/portfolio/class/${id}`,
      }),
      providesTags: ["class"],
    }),

    getClassBySlug: builder.query({
      query: (slug) => ({
        url: `/api/portfolio/class/slug/${slug}`,
      }),
      providesTags: ["class"],
    }),

    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/api/portfolio/class/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["class"],
    }),
  }),
});

export const {
  useGetAllClassQuery,
  useAddClassMutation,
  useUpdateClassMutation,
  useGetSingleClassQuery,
  useGetClassBySlugQuery,
  useDeleteClassMutation,
} = classApi;
