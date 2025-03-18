import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const TermAndConditionsAoi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleTermAndCondition: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `${API_PATHS.TERM_AND_CONDITIONS}/${id}`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.TERM_AND_CONDITIONS),
        }),

        saveTermAndCondition: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.TERM_AND_CONDITIONS,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.TERM_AND_CONDITIONS, id: "LIST" }],
        }),
        updateTermAndCondition: builder.mutation<any, any>({
            query: ({payload,id}) => ({
                url: `${API_PATHS.TERM_AND_CONDITIONS}/${id}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.TERM_AND_CONDITIONS, id: "LIST" }],
        }),

    }),
});

export const { useLazyGetSingleTermAndConditionQuery, useSaveTermAndConditionMutation ,useUpdateTermAndConditionMutation} = TermAndConditionsAoi;
