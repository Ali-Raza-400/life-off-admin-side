import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const networkApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getShipping: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.SHIPPING,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.SHIPPING),
        }),

        saveNetwork: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.SHIPPING,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.SHIPPING, id: "LIST" }],
        }),

    }),
});

export const { useGetShippingQuery, useSaveNetworkMutation } = networkApi;
