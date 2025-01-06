import { baseApi } from "./baseApi";

export const whoweareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWhoweare: builder.query({
      query: () => ({
        url: "/api/whoweare",
      }),
      providesTags: ["whoweare"],
    }),

    updateWhoweare: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/whoweare/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["whoweare"],
    }),

    addWhoweare: builder.mutation({
      query: (formData) => ({
        url: `/api/whoweare/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["whoweare"],
    }),
  }),
});

export const {
  useGetWhoweareQuery,
  useAddWhoweareMutation,
  useUpdateWhoweareMutation,
} = whoweareApi;
