import { baseApi } from "../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (query) => ({
        url: "/api/portfolio/product/all",
        params: query,
      }),
      providesTags: ["product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/api/portfolio/product/${id}`,
      }),
      providesTags: ["product"],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: `/api/portfolio/product/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    editProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/portfolio/product/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/portfolio/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;
