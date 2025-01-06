import { baseApi } from "./baseApi";

export const faviconApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getfavicon: builder.query({
      query: () => ({
        url: "/api/favicon/all",
      }),
      providesTags: ["favicon"],
    }),

    add: builder.mutation({
      query: (formData) => ({
        url: `/api/favicon/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),

    update: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/favicon/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),
  }),
});

export const { useGetfaviconQuery, useAddMutation, useUpdateMutation } =
  faviconApi;
