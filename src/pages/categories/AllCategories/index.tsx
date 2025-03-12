import CategoriesCarousel from '../AllCategories/CategoriesCarousel'
import CategoryGrid from '../AllCategories/AllCategories'
import { useGetCategoriesQuery } from '../../../redux/slices/category'

const index = () => {
      const { data } = useGetCategoriesQuery({});
      
    return (
        <div><CategoriesCarousel data={data} /><CategoryGrid  data={data}/></div>
    )
}

export default index