import { API_PATHS } from "../../utils/apiPaths";
import { providesList } from "../../utils/helper";
import { rtkQApi } from "../rtkQApi";
import { RTK_TAGS } from "../tags";

const blogApi = rtkQApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<any, any>({
            query: (params) => {
                return {
                    url: API_PATHS.BLOGS,
                    method: "GET",
                    params: params,
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.BLOGS),
        }),

        saveBlogs: builder.mutation<any, any>({
            query: (payload) => ({
                url: API_PATHS.BLOGS,
                method: "POST",
                data: payload,
            }),
            invalidatesTags: [{ type: RTK_TAGS.BLOGS, id: "LIST" }],
        }),

        getSingleBlog:builder.query<any, any>({
            query: (id) => {
                return {
                    url: `${API_PATHS.BLOGS}/${id}`,
                    method: "GET",
                };
            },
            providesTags: (result) => providesList(result?.data, RTK_TAGS.BLOGS),
        }),

    }),
});

export const { useGetBlogsQuery, useSaveBlogsMutation,useGetSingleBlogQuery } = blogApi;
