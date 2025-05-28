import { tagTypes, tagTypesList } from "../tagTypes";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    everyContract: build.query({
      query: () => ({
        url: `/sell_car?filter=sold`,
        method: "GET",
      }),
      providesTags: [tagTypes.categorys],
    }),
    sellCar: build.query({
      query: () => ({
        url: `/sell_car?filter=sell`,
        method: "GET",
      }),
      providesTags: [tagTypes.categorys],
    }),

    UsersList: build.query({
      query: () => ({
        url: `/users/list?role=private_user`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    dealerList: build.query({
      query: () => ({
        url: `/users/list?role=dealer`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    dealerDetails: build.query({
      query: (dealerId) => ({
        url: `/users/${dealerId.id}`,
        method: "GET",
      }),
      providesTags: tagTypes.payment,
    }),

    conversationDetails: build.query({
      query: (conversationId) => {
        console.log("conversationId", conversationId);
        
        return {
          url: `/conversation/message/${conversationId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),

    taskList: build.query({
      query: () => {
        return {
          url: `/task/task_list`,
          method: "GET",
        };
      },
      providesTags: tagTypes.task,
    }),
    totalCount: build.query({
      query: () => {
        return {
          url: `/users/total_count`,
          method: "GET",
        };
      },
      providesTags: tagTypes.task,
    }),

    customerMap: build.query({
      query: () => {
        return {
          url: `/users/customer_map?year=2025`,
          method: "GET",
        };
      },
      // providesTags: tagTypes.task,
    }),

    totalSalesChart: build.query({
      query: () => {
        return {
          url: `/sell_car/total_sales_chart?year=2025`,
          method: "GET",
        };
      },
      // providesTags: tagTypes.task,
    }),

    taskAction: build.mutation({
      query: (task) => {
        return {
          url: `/task/mark_complete/${task?.id}`,
          method: "PATCH",
          body: task.data,
        };
      },
      invalidatesTags: tagTypes.task,
    }),
    taskCreate: build.mutation({
      query: (task) => {
        return {
          url: `/task/create_task`,
          method: "POST",
          body: task,
        };
      },
      invalidatesTags: tagTypes.task,
    }),
    contentCreate: build.mutation({
      query: (task) => {
        return {
          url: `/static_content/create`,
          method: "POST",
          body: task,
        };
      },
      // invalidatesTags: tagTypes.task,
    }),

    
    createUser: build.mutation({
      query: (userData) => {
        return {
          url: `/auth/create_user`,
          method: "POST",
          body: userData,
        };
      },
      // invalidatesTags: tagTypes.task,
    }),


    changePayment: build.mutation({
      query: (paymentAction) => {
        return {
          url: `/sell_car/action`,
          method: "PATCH",
          body: paymentAction,
        };
      },
      invalidatesTags: tagTypes.payment,
    }),





    // createCtegory: build.mutation({
    //   query: (category) => ({
    //     url: `/category/create`,
    //     method: "POST",
    //     body: category,
    //   }),
    //   invalidatesTags: [tagTypes.categorys],
    // }),

    //end
  }),
});

export const {
  useEveryContractQuery,
  useSellCarQuery,
  useUsersListQuery,
  useDealerListQuery,
  useDealerDetailsQuery,
  useTaskListQuery,
  useTaskActionMutation,
  useTaskCreateMutation,
  useContentCreateMutation,
  useTotalCountQuery,
  useCustomerMapQuery,
  useTotalSalesChartQuery,
  useCreateUserMutation,
  useConversationDetailsQuery,
  useChangePaymentMutation
} = adminApi;
