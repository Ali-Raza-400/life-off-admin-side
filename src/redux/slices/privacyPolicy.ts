import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const privacyPolicyApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getSinglePrivacyPolicy: builder.query<any, any>({
            query: (id) => {
                return {
                    url: `${API_PATHS.PRIVACY_POLICY}/${id}`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.PRIVACY_POLICY),
        }),

        savePrivacyPolicy: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.PRIVACY_POLICY,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.PRIVACY_POLICY, id: "LIST" }],
        }),
        updatePrivacyPolicy: builder.mutation<any, any>({
            query: ({payload,id}) => ({
                url: `${API_PATHS.PRIVACY_POLICY}/${id}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.PRIVACY_POLICY, id: "LIST" }],
        }),

    }),
});

export const { useLazyGetSinglePrivacyPolicyQuery, useSavePrivacyPolicyMutation ,useUpdatePrivacyPolicyMutation} = privacyPolicyApi;
