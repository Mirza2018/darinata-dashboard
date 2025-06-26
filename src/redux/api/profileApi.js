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
    updateProfileAnother: build.mutation({
      query: (profileInfo) => {
        console.log("hi", profileInfo);
        // return;
        return {
          url: `/profile/update_profile/${profileInfo.id}`,
          method: "PUT",
          body: profileInfo.data,
        };
      },
      invalidatesTags: [tagTypes.people, tagTypes.user],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useProfileUpdsateMutation,
  useUserRatioQuery,
  useUpdateProfileAnotherMutation,
} = profileApi;
