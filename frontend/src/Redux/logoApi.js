import { baseApi } from "./baseApi";

export const logoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addLogo: builder.mutation({
      query: (formData) => ({
        url: `/api/logo/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),
    getLogos: builder.query({
      query: () => ({
        url: "/api/logo/all",
      }),
      providesTags: ["logo"],
    }),
    updateLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/logo/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),
  }),
});

export const { useGetLogosQuery, useUpdateLogoMutation, useAddLogoMutation } =
  logoApi;
