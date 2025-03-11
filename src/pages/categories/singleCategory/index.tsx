import { useParams } from "react-router-dom"
import { useGetSingleCategoryQuery } from "../../../redux/slices/category"
import CategoryHeader from "./categoryHeader"
import AntdCouponPage from "./CouponPage"
import TopDealsSlider from "./TopDeatils"
import BlogIcons from "../../blogs/screens/blogLogos"
import BlogFeaturedSection from "../../blogs/screens/blogFeaturedSection"
import BlogNewsLayout from "../../blogs/screens/blogNewsLayout"
import BlogDailyDeals from "./blogdealsData"

const index = () => {
    const { id } = useParams()
    const { data } = useGetSingleCategoryQuery(id)
    console.log("data:::",data);
    
    return (
        <div>
            <CategoryHeader data={data}/>
            <TopDealsSlider />
            <AntdCouponPage />
            <BlogIcons/>
            <BlogFeaturedSection/>
            <BlogNewsLayout/>
            <BlogDailyDeals/>
        </div>
    )
}

export default index