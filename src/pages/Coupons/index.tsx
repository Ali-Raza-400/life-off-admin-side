import { TableProps } from "antd";
import GenericTable from "../../components/UI/GenericTable"
import ActionDropdown from "../../components/UI/ActionDropdown";
import { useGetCouponsQuery } from "../../redux/slices/coupons";

const Index = () => {
    const { data } = useGetCouponsQuery({})
    console.log("data::::", data)

    const columns: TableProps<any>["columns"] = [
        {
            title: "Coupon Name",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Coupon Code",
            dataIndex: "code",
            key: "code",
            width: 150,
            render: (code) => <strong>{code}</strong>,
        },
        {
            title: "Store Name",
            dataIndex: ["store", "name"],
            key: "storeName",
            width: 200,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 150,
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            width: 150,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Verified?",
            dataIndex: "isVerified",
            key: "isVerified",
            width: 100,
            render: (isVerified) => (isVerified ? "Yes" : "No"),
        },
        {
            title: "Coupon Link",
            dataIndex: "htmlCodeUrl",
            key: "htmlCodeUrl",
            width: 200,
            render: (url) => (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    View Coupon
                </a>
            ),
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 120,
            render: (_coupon) => (
                <ActionDropdown
                // editOnClick={() => onEdit(coupon)}
                // deleteOnClick={() => onDelete(coupon?.id)}
                />
            ),
        },
    ];

    return (
        <GenericTable loading={false} columns={columns} data={data ? data.list : []} />
    )
}

export default Index