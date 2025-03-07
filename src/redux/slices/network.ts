import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const networkApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getNetworks: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.NETWORK,
                    method: "GET",
                    params: params,
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

    }),
});

export const { useGetNetworksQuery, useSaveNetworkMutation } = networkApi;
