import CategoriesCarousel from '../AllCategories/CategoriesCarousel'
import CategoryGrid from '../AllCategories/AllCategories'
import { useGetCategoriesQuery } from '../../../redux/slices/category'
import AmazonDealsHeader from '../AllCategories/categoryheader'

const index = () => {
      const { data } = useGetCategoriesQuery({});
      
    return (
        <div><CategoriesCarousel data={data} /><CategoryGrid  data={data}/><AmazonDealsHeader/></div>
    )
}

export default index