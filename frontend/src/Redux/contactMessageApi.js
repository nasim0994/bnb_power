import { baseApi } from "./baseApi";

export const contactMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (data) => ({
        url: `/api/message/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    getMessages: builder.query({
      query: (query) => ({
        url: "/api/message/all",
        params: query,
      }),
      providesTags: ["message"],
    }),

    getSingleMessage: builder.query({
      query: (id) => ({
        url: `/api/message/${id}`,
      }),
      providesTags: ["message"],
    }),

    updateMessage: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/message/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/api/message/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useAddMessageMutation,
  useGetMessagesQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetSingleMessageQuery,
} = contactMessageApi;
