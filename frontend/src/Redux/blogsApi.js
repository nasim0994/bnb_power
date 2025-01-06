import { baseApi } from "./baseApi";

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (query) => ({
        url: "/api/blogs/all",
        params: query,
      }),
      providesTags: ["blogs"],
    }),

    getBlog: builder.query({
      query: (id) => ({
        url: `/api/blogs/${id}`,
      }),
      providesTags: ["blogs"],
    }),

    addBlog: builder.mutation({
      query: (formData) => ({
        url: `/api/blogs/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blogs"],
    }),

    editBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/blogs/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useGetBlogQuery,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
