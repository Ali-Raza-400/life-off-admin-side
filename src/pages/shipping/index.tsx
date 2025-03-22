import GenericTable from '../../components/UI/GenericTable';
import ActionDropdown from '../../components/UI/ActionDropdown';
import { useGetShippingQuery } from '../../redux/slices/shipping';
import { useNavigate } from 'react-router-dom';
import PATH from '../../navigation/Path';

const ShippingList = () => {
    const { data, isLoading } = useGetShippingQuery({});
      const navigate=useNavigate()

    const columns = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type: string) => type?.charAt(0).toUpperCase() + type.slice(1), // Capitalize type
        },
        {
            title: "Store Name",
            dataIndex: ["store", "name"],
            key: "storeName",
        },
        {
            title: "Featured Store",
            dataIndex: ["store", "isFeatureStore"],
            key: "isFeatureStore",
            render: (value: boolean) => (value ? "Yes" : "No"),
        },
        {
            title: "Popular Store",
            dataIndex: ["store", "isPopularStore"],
            key: "isPopularStore",
            render: (value: boolean) => (value ? "Yes" : "No"),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => new Date(date).toLocaleString(), // Format date
        },
        {
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: (_value:any) => (
				<ActionDropdown
					viewOnClick={() => navigate(PATH.SHIPPING_PAGE)}
				/>
			),
		},
    ];

    return (
        <GenericTable loading={isLoading} columns={columns as any} data={data?.list} />
    );
};

export default ShippingList;
