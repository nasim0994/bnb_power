import { baseApi } from "./baseApi";

export const featureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatures: builder.query({
      query: (query) => ({
        url: "/api/feature/all",
        params: query,
      }),
      providesTags: ["feature"],
    }),

    getSingleFeature: builder.query({
      query: (id) => ({
        url: `/api/feature/${id}`,
      }),
      providesTags: ["feature"],
    }),

    addFeature: builder.mutation({
      query: (formData) => ({
        url: `/api/feature/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["feature"],
    }),

    editFeature: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/feature/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["feature"],
    }),

    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `/api/feature/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feature"],
    }),
  }),
});

export const {
  useAddFeatureMutation,
  useGetFeaturesQuery,
  useGetSingleFeatureQuery,
  useEditFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;
