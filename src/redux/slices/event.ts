import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const eventSlice = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.EVENTS,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.EVENTS),
        }),
        getSingleEvent: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `${API_PATHS.EVENTS}/${id}`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.EVENTS),
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
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.NETWORK, id: "LIST" }],
        }),


    }),
});

export const { useGetEventsQuery, useSaveNetworkMutation,useUpdateCategoryMutation,useGetSingleEventQuery } = eventSlice;
