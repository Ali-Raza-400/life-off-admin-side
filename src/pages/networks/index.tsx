import PageLoader from "../../components/Loader/PageLoader";
import GenericTable from "../../components/UI/GenericTable";
import { useGetNetworksQuery } from "../../redux/slices/network";

const columns = [

    {
        title: ' Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: ' Status',
        dataIndex: 'status',
        key: 'status',
    },
    // {
    //   title: 'Category Description',
    //   dataIndex: 'categoryDescription',
    //   key: 'categoryDescription',
    // },
];

// Static data array (mock data)


const Index = () => {
    const { data, isLoading } = useGetNetworksQuery({})
    console.log("data:::", data)
    if (isLoading) {
        return <><PageLoader /></>
    }
    return (
        <GenericTable loading={false} columns={columns} data={data.list} />
    );
};

export default Index;
