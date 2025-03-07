import GenericTable from "../../components/UI/GenericTable";
import { useGetCategoriesQuery } from "../../redux/slices/category";

const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text:any) => (
        <img src={text} alt="category" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Category Title',
      dataIndex: 'categoryTitle',
      key: 'categoryTitle',
    },
    {
      title: 'Category Description',
      dataIndex: 'categoryDescription',
      key: 'categoryDescription',
    },
  ];
  
  // Static data array (mock data)
 
  
  const Index = () => {
    const{data}=useGetCategoriesQuery({})
    return (
      <GenericTable loading={false} columns={columns} data={data.list} />
    );
  };
  
  export default Index;
  