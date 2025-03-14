import { useParams } from "react-router-dom"
import { useGetSingleBlogQuery } from "../../../redux/slices/blog"
import BlogBanner from "./blogBanner"
import RealatedBlogs from "./realatedBlogs"

const index = () => {
   const { id } = useParams()
  const {data}=useGetSingleBlogQuery(id)
  return (
    <div><BlogBanner data={data}/>
    <RealatedBlogs/></div>
  )
}

export default index