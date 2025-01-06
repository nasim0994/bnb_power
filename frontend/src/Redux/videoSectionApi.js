import { baseApi } from "./baseApi";

export const videoSectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addVideoSection: builder.mutation({
      query: (data) => ({
        url: `/api/videoSection/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videoSection"],
    }),

    getVideoSection: builder.query({
      query: () => ({
        url: "/api/videoSection/all",
      }),
      providesTags: ["videoSection"],
    }),

    updateVideoSection: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/videoSection/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["videoSection"],
    }),
  }),
});

export const {
  useAddVideoSectionMutation,
  useGetVideoSectionQuery,
  useUpdateVideoSectionMutation,
} = videoSectionApi;
