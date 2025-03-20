import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const productApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<any, any>({
            query: () => {
                return {
                    url: 'product',
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.PRODUCTS),
        }),
        getProductsSearch: builder.query<any, any>({
            query: (tableOptions) => {
                const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
                return {
                    url: 'product/search',
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.PRODUCTS),
        }),

    }),
})

export const { useGetProductsQuery ,useGetProductsSearchQuery} = productApi;