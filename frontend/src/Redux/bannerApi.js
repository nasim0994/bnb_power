import { baseApi } from "./baseApi";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: "/api/banner/all",
      }),
      providesTags: ["banner"],
    }),

    getBannerById: builder.query({
      query: (id) => ({
        url: `/api/banner/${id}`,
      }),
      providesTags: ["banner"],
    }),

    addBanner: builder.mutation({
      query: (formData) => ({
        url: `/api/banner/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),

    editBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/banner/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["banner"],
    }),

    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/banner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditBannerMutation,
  useGetBannerByIdQuery,
} = bannerApi;
