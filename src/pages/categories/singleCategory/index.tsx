import { useParams } from "react-router-dom"
import { useGetSingleCategoryQuery } from "../../../redux/slices/category"
import AntdCouponPage from "./CouponPage"
import TopDealsSlider from "./TopDeatils"
import CategoryBanner from "./categoryBanner"

const index = () => {
    const { id } = useParams()
    const { data } = useGetSingleCategoryQuery(id)
    console.log("data:::",data);
    
    return (
        <div>
            <CategoryBanner data={data}/>
            <TopDealsSlider />
            <AntdCouponPage />
        </div>
    )
}

export default index