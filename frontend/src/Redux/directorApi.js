import { baseApi } from "./baseApi";

export const directorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDirectors: builder.query({
      query: (query) => ({
        url: "/api/director/all",
        params: query,
      }),
      providesTags: ["director"],
    }),

    getSingleDirector: builder.query({
      query: (id) => ({
        url: `/api/director/${id}`,
      }),
      providesTags: ["director"],
    }),

    addDirector: builder.mutation({
      query: (formData) => ({
        url: `/api/director/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["director"],
    }),

    editDirector: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/director/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["director"],
    }),

    deleteDirector: builder.mutation({
      query: (id) => ({
        url: `/api/director/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["director"],
    }),
  }),
});

export const {
  useAddDirectorMutation,
  useGetDirectorsQuery,
  useGetSingleDirectorQuery,
  useEditDirectorMutation,
  useDeleteDirectorMutation,
} = directorApi;
