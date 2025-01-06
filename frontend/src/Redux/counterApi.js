import { baseApi } from "./baseApi";

export const counterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCounter: builder.query({
      query: () => ({
        url: "/api/counter/get",
      }),
      providesTags: ["counter"],
    }),

    addCounter: builder.mutation({
      query: (formData) => ({
        url: `/api/counter/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["counter"],
    }),

    updateCounter: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/counter/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["counter"],
    }),

    addCounterCount: builder.mutation({
      query: (data) => ({
        url: `/api/counter/count/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counter"],
    }),

    updateCounterCount: builder.mutation({
      query: (data) => ({
        url: `/api/counter/count/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["counter"],
    }),

    deleteCounterCount: builder.mutation({
      query: (data) => ({
        url: `/api/counter/count/delete`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["counter"],
    }),
  }),
});

export const {
  useGetCounterQuery,
  useAddCounterMutation,
  useUpdateCounterMutation,
  useAddCounterCountMutation,
  useDeleteCounterCountMutation,
  useUpdateCounterCountMutation,
} = counterApi;
