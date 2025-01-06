import { baseApi } from "./baseApi";

export const featureSectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFeatureSection: builder.mutation({
      query: (data) => ({
        url: `/api/featureSection/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["featureSection"],
    }),

    getFeatureSection: builder.query({
      query: () => ({
        url: "/api/featureSection/all",
      }),
      providesTags: ["featureSection"],
    }),

    updateFeatureSection: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/featureSection/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["featureSection"],
    }),
  }),
});

export const {
  useAddFeatureSectionMutation,
  useGetFeatureSectionQuery,
  useUpdateFeatureSectionMutation,
} = featureSectionApi;
