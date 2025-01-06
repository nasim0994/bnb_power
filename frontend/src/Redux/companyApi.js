import { baseApi } from "./baseApi";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompany: builder.query({
      query: (query) => ({
        url: "/api/company/all",
        params: query,
      }),
      providesTags: ["company"],
    }),

    getSingleCompany: builder.query({
      query: (id) => ({
        url: `/api/company/${id}`,
      }),
      providesTags: ["company"],
    }),

    getCompanyBySlug: builder.query({
      query: (slug) => ({
        url: `/api/company/slug/${slug}`,
      }),
      providesTags: ["company"],
    }),

    addCompany: builder.mutation({
      query: (formData) => ({
        url: `/api/company/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["company"],
    }),

    editCompany: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/company/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["company"],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/api/company/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompanyBySlugQuery,
} = companyApi;
