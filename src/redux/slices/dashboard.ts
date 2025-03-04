import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const couponsApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserCounts: builder.query<any, any>({
            query: () => {
                return {
                    url: 'users/stats/count',
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.USER),
        }),
        getStoreCount: builder.query<any, any>({
            query: () => {
                return {
                    url: 'store/stats/count',
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, 'store'),
        }),
        getProductCount: builder.query<any, any>({
            query: () => {
                return {
                    url: 'product/stats/count',
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.PRODUCTS),
        }),
        getCouponCounts: builder.query<any, any>({
            query: () => {
                return {
                    url: 'coupons/stats/count',
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.COUPONS),
        }),

    }),
})

export const { useGetUserCountsQuery,useGetStoreCountQuery,useGetCouponCountsQuery,useGetProductCountQuery } = couponsApi;