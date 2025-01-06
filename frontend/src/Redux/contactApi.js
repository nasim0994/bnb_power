import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: "/api/contact/all",
      }),
      providesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/contact/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    addContact: builder.mutation({
      query: (data) => ({
        url: `/api/contact/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useUpdateContactMutation,
  useAddContactMutation,
} = contactApi;
