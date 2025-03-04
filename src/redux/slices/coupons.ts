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

    }),
})

export const { useGetCouponsQuery } = couponsApi;