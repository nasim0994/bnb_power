import { baseApi } from "./baseApi";

export const businessInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessInfo: builder.query({
      query: () => ({
        url: "/api/businessInfo/get",
      }),
      providesTags: ["businessInfo"],
    }),

    addBusinessInfo: builder.mutation({
      query: (info) => ({
        url: `/api/businessInfo/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["businessInfo"],
    }),

    updateBusinessInfo: builder.mutation({
      query: ({ id, info }) => ({
        url: `/api/businessInfo/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["businessInfo"],
    }),
  }),
});

export const {
  useGetBusinessInfoQuery,
  useAddBusinessInfoMutation,
  useUpdateBusinessInfoMutation,
} = businessInfoApi;
