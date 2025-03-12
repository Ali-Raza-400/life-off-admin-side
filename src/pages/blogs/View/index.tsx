import BlogFeaturedSection from '../screens/blogFeaturedSection'
import BlogIcons from '../screens/blogLogos'
import BlogNewsLayout from '../screens/blogNewsLayout'
import { useGetBlogsQuery } from '../../../redux/slices/blog'

const index = () => {
    const { data } = useGetBlogsQuery({});
    console.log("data:::", data);
    return (
        <div>
            <BlogIcons />
            <BlogFeaturedSection data={data} />
            <BlogNewsLayout data={data} />
        </div>
    )
}

export default index