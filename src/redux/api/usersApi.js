import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllusersList: build.query({
      query: () => ({
        url: `/users/all-users`,
        method: "Get",
      }),
      providesTags: [tagTypes.allUsers],
    }),

    userBlock: build.mutation({
      query: (blockId) => ({
        url: `/users/block/${blockId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.allUsers,tagTypes.profile],
    }),
  }),
});

export const { useGetAllusersListQuery, useUserBlockMutation } = usersApi;
  