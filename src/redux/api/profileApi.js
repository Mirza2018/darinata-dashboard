import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `/users/admin-profile`,
        method: "Get",
      }),
      providesTags: [tagTypes.profile],
    }),

    profileUpdsate: build.mutation({
      query: (profile) => ({
        url: `/users/update-my-profile`,
        method: "PATCH",
        body: profile,
      }),
      invalidatesTags: [tagTypes.profile],
    }),

    userRatio: build.query({
      query: (year) => ({
        url: `/users/all-users-overview?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery, useProfileUpdsateMutation, useUserRatioQuery } = profileApi;
