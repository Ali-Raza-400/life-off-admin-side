import { useParams } from "react-router-dom"
import { useGetCouponsProductByStoreIdQuery } from "../../redux/slices/store"
import CouponTabs from "./components/CouponTabs"
import StoreHeader from "./components/StoreHeader"

const SingleStore = () => {
    const {id}=useParams()
    const{data}=useGetCouponsProductByStoreIdQuery(id)
    return (
        <div><StoreHeader data={data} />
            <CouponTabs data={data} /></div>
    )
}

export default SingleStore