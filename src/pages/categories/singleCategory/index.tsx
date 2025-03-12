import { useParams } from "react-router-dom"
import { useGetSingleCategoryQuery } from "../../../redux/slices/category"
import CategoryHeader from "./categoryHeader"
import AntdCouponPage from "./CouponPage"
import TopDealsSlider from "./TopDeatils"

const index = () => {
    const { id } = useParams()
    const { data } = useGetSingleCategoryQuery(id)
    console.log("data:::",data);
    
    return (
        <div>
            <CategoryHeader data={data}/>
            <TopDealsSlider />
            <AntdCouponPage />

            {/* <BlogDailyDeals/> */}
        </div>
    )
}

export default index