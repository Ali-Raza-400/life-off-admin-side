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

    }),
})

export const { useGetProductsQuery } = productApi;