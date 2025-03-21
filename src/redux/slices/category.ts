import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const categorySlice = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.CATEGORY,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.NETWORK),
        }),
        getCategoriesWithSearch: builder.query<any, any>({
            query: (tableOptions) => {
                const params = {
					...tableOptions.filters,
					page: tableOptions.pagination.page,
					limit: tableOptions.pagination.pageSize,
				};
                return {
                    url: API_PATHS.CATEGORYWITHSEARCH,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.NETWORK),
        }),
        getSingleCategory: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `${API_PATHS.CATEGORY}/${id}`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.NETWORK),
        }),

        saveNetwork: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.NETWORK,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.NETWORK, id: "LIST" }],
        }),
        updateCategory: builder.mutation<any, any>({
            query: ({payload,id}) => ({
                url: `${API_PATHS.CATEGORY}/${id}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.NETWORK, id: "LIST" }],
        }),


    }),
});

export const { useGetCategoriesQuery,useGetCategoriesWithSearchQuery, useSaveNetworkMutation,useUpdateCategoryMutation,useGetSingleCategoryQuery } = categorySlice;
