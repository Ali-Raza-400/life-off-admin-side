import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const storeApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.STORES,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.STORE),
        }),
        getStoresWithSearch: builder.query<any, any>({
            query: (tableOptions) => {
                const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
                return {
                    url: `${API_PATHS.STORES}/search`,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.STORE),
        }),
        getCouponsProductByStoreId: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `${API_PATHS.STORES}/${API_PATHS.COUPONS_PRODUCT}/${id}`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.STORE),
        }),
        getMyStores: builder.query<any, any>({
            query: () => {
                return {
                    url: `${API_PATHS.STORES}/my-stores`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.STORE),
        }),

        saveStore: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.STORES,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.STORE, id: "LIST" }],
        }),
        editStore: builder.mutation<any, any>({
            query: ({ payload, id }) => ({
                url: `${API_PATHS.STORES}/${id}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.STORE, id: "LIST" }],
        }),
        removeStore: builder.mutation<any, any>({
            query: (id) => ({
                url: `${API_PATHS.STORES}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: RTK_TAGS.STORE, id: "LIST" }],
        }),

    }),
});

export const {useGetStoresWithSearchQuery, useGetStoresQuery, useSaveStoreMutation, useEditStoreMutation,useRemoveStoreMutation,useGetMyStoresQuery,useGetCouponsProductByStoreIdQuery } = storeApi;
