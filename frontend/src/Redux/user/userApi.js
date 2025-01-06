import { baseApi } from "../baseApi";
import { userLoggedIn } from "./userSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/api/admins/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            localStorage.setItem("token", result?.data?.token);

            dispatch(
              userLoggedIn({
                data: result?.data,
              })
            );
          }
        } catch (error) {
          // Do not any thing , handel error from ui
          console.log(error);
        }
      },
    }),

    getAdmins: builder.query({
      query: () => ({
        url: "/api/admins/all",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/api/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),

    addAdmin: builder.mutation({
      query: (info) => ({
        url: `/api/admins/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["admin"],
    }),

    updateInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admins/updateInfo/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    updatePassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admins/updatePassword/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/admins/deleteAccount/${id}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useAddAdminMutation,
  useUpdateInfoMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
} = userApi;
