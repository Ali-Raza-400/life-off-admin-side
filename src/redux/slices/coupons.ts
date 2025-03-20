import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const couponsApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getCoupons: builder.query<any, any>({
            query: () => {
                return {
                    url: 'coupons',
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.COUPONS),
        }),
        getCouponsWithSearchAndCoupon: builder.query<any, any>({
            query: (tableOptions) => {
                const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
                return {
                    url: 'coupons/search',
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.COUPONS),
        }),
        saveCoupon: builder.mutation<any, any>({
            query: (payload) => {
                return {
                    url: 'coupons',
                    method: "POST",
                    data: payload,
                };
            },
            invalidatesTags: [{ type: RTK_TAGS.COUPONS, id: "LIST" }],
        }),
         editCoupon: builder.mutation<any, any>({
                    query: ({ payload, id }) => ({
                        url: `${API_PATHS.COUPONS}/${id}`,
                        method: "PATCH",
                        data: payload,
                    }),
                    invalidatesTags: [{ type: RTK_TAGS.COUPONS, id: "LIST" }],
                }),
        deleteCoupon: builder.mutation<any, any>({
            query: (id) => {
                return {
                    url: `coupons/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: [{ type: RTK_TAGS.COUPONS, id: "LIST" }],
        }),

    }),
})

export const {useGetCouponsWithSearchAndCouponQuery, useGetCouponsQuery,useSaveCouponMutation,useDeleteCouponMutation,useEditCouponMutation } = couponsApi;