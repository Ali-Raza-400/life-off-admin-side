import { TableProps } from "antd";
import GenericTable from "../../components/UI/GenericTable"
import { useGetProductsQuery } from "../../redux/slices/product";
import ActionDropdown from "../../components/UI/ActionDropdown";

const Index = () => {
    const { data } = useGetProductsQuery({})
    console.log("data::::", data)

    const columns: TableProps<any>["columns"] = [
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 150,
        },
        {
            title: "Price",
            dataIndex: "currentPrice",
            key: "currentPrice",
            width: 100,
            render: (price) => `$${price}`,
        },
        {
            title: "Store Name",
            dataIndex: ["store", "name"],
            key: "storeName",
            width: 200,
        },
        {
            title: "Product Link",
            dataIndex: "htmlUrl",
            key: "htmlUrl",
            width: 200,
            render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">View Product</a>,
        },
        {
            title: "Is Featured?",
            dataIndex: "isFeatured",
            key: "isFeatured",
            width: 120,
            render: (isFeatured) => (isFeatured ? "Yes" : "No"),
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 120,
            render: (_product) => (
                <ActionDropdown
                // editOnClick={() => onEdit(product)}
                // deleteOnClick={() => onDelete(product?.id)}
                />
            ),
        },
    ];

    return (
        <GenericTable loading={false} columns={columns} data={data ? data.list : []} />
    )
}

export default Index