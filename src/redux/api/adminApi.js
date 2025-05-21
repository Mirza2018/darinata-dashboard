import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    everyContract: build.query({
      query: () => ({
        url: `/sell_car`,
        method: "GET",
      }),
      providesTags: [tagTypes.categorys],
    }),

    // createCtegory: build.mutation({
    //   query: (category) => ({
    //     url: `/category/create`,
    //     method: "POST",
    //     body: category,
    //   }),
    //   invalidatesTags: [tagTypes.categorys],
    // }),
  }),
});

export const { useEveryContractQuery } = adminApi;
