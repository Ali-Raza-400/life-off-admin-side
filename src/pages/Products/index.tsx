import { Form, TableProps } from "antd";
import GenericTable from "../../components/UI/GenericTable"
import { useGetProductsSearchQuery } from "../../redux/slices/product";
import ActionDropdown from "../../components/UI/ActionDropdown";
import { useState } from "react";
import useDebounce from "../../components/Hooks/useDebounce";
import SearchFilterWithDrawer from "../../components/UI/SearchFilterWithDrawer";

const Index = () => {
    const defaultTableOptions = {
        filters: {},
        pagination: {
            page: 1,
            pageSize: 10,
        },
    };
    const [tableOptions, setTableOptions] = useState(defaultTableOptions);
    const debouncedTableOptions = useDebounce(tableOptions, 500, ["name"]);
    // const { data } = useGetProductsQuery({})
    const { data } = useGetProductsSearchQuery(debouncedTableOptions)
    const [form] = Form.useForm();
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
    const searchBar = (
        <SearchFilterWithDrawer
            defaultTableOptions={defaultTableOptions}
            setTableOptions={setTableOptions}
            form={form}
        />
    );

    return (
        <>
            <div className="w-full">{searchBar}</div>
            <GenericTable loading={false} columns={columns} data={data} updatePaginationFunc={(data: { page: number; pageSize: number }) => {
                setTableOptions({ ...tableOptions, pagination: data })
            }}
                enablePagination={true} />
        </>
    )
}

export default Index