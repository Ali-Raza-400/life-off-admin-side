import React from 'react'
import CategoriesCarousel from './CategoriesCarousel'
import CouponCategories from './CouponCategories'
import CategoryGrid from './AllCategories'
import { useGetCategoriesQuery } from '../../../redux/slices/category'
import AmazonDealsHeader from './categoryheader'

const index = () => {
      const { data } = useGetCategoriesQuery({});
      
    return (
        <div><CategoriesCarousel data={data} /><CategoryGrid  data={data}/><AmazonDealsHeader/></div>
    )
}

export default index