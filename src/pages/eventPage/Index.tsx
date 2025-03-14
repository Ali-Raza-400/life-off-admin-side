import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/UI/GenericTable";
import { useGetEventsQuery } from "../../redux/slices/event";
import ActionDropdown from "../../components/UI/ActionDropdown";
import PATH from "../../navigation/Path";

const Index = () => {
  const { data } = useGetEventsQuery({});
  console.log("data::::", data);
  const navigate=useNavigate()

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
			render: (value:any) => (
				<ActionDropdown
					viewOnClick={() => navigate(PATH.SINGLE_EVENT.replace(":id", value?.id))}
				/>
			),
		},
  ];

  return (
    <GenericTable loading={!data} columns={columns as any} data={data?.list || []} />
  );
};

export default Index;
