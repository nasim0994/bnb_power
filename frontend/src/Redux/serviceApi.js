import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (query) => ({
        url: "/api/services/all",
        params: query,
      }),
      providesTags: ["service"],
    }),

    getSingleService: builder.query({
      query: (id) => ({
        url: `/api/services/${id}`,
      }),
      providesTags: ["service"],
    }),

    addService: builder.mutation({
      query: (formData) => ({
        url: `/api/services/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    editService: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/services/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/services/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useGetSingleServiceQuery,
  useEditServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
