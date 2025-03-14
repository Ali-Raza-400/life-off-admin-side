import { useParams } from 'react-router-dom'
import { useGetSingleEventQuery } from '../../../redux/slices/event'
import ChristmasDeals from '../screens/singleEvent'

const index = () => {
   const { id } = useParams()
 const {data} = useGetSingleEventQuery(id)
  return (
    <div><ChristmasDeals data={data?.list}/></div>
  )
}

export default index