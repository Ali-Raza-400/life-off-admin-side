import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/UI/GenericTable";
import {  useGetEventsWithFilterQuery } from "../../redux/slices/event";
import ActionDropdown from "../../components/UI/ActionDropdown";
import PATH from "../../navigation/Path";
import GenericButton from "../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa";
import { Flex, Form } from "antd";
import SearchFilterWithDrawer from "../../components/UI/SearchFilterWithDrawer";
import { useState } from "react";
import useDebounce from "../../components/Hooks/useDebounce";

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
  // const { data } = useGetEventsQuery({});
  const { data } = useGetEventsWithFilterQuery(debouncedTableOptions)
  console.log("data::::", data);
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "View Count",
      dataIndex: "viewCount",
      key: "viewCount",
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (isFeatured: boolean) => (isFeatured ? "Yes" : "No"),
    },
    {
      title: "Trending",
      dataIndex: "isTrending",
      key: "isTrending",
      render: (isTrending: boolean) => (isTrending ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (value: any) => (
        <ActionDropdown
          viewOnClick={() => navigate(PATH.SINGLE_EVENT.replace(":id", value?.id))}
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
      <Flex className="justify-end mb-4">
        <div className="w-full">{searchBar}</div>
        <GenericButton
          icon={<FaPlus size={20} />}
          label="Create New Event"
          onClick={() => navigate(PATH.ADD_EVENT)}
        />
      </Flex>
      <GenericTable loading={!data} columns={columns as any} data={data} updatePaginationFunc={(data: { page: number; pageSize: number }) => {
        setTableOptions({ ...tableOptions, pagination: data })
      }}
        enablePagination={true} />
    </>
  );
};

export default Index;
