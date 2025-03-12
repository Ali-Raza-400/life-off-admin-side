import { FaEye } from "react-icons/fa";
import GenericButton from "../../components/UI/GenericButton";
import GenericTable from "../../components/UI/GenericTable";
import { useGetBlogsQuery } from "../../redux/slices/blog"
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import ActionDropdown from "../../components/UI/ActionDropdown";

const Index = () => {
  const { data } = useGetBlogsQuery({});
  console.log("data:::", data);
  const navigate=useNavigate()

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      
    },
    {
      title: "Category",
      dataIndex: ["category", "categoryTitle"], // Access nested category title
      key: "category",
    },
    {
      title: "Featured",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (value: any) => (value ? "Yes" : "No"), // Convert boolean to Yes/No
    },
    {
      title: "Trending",
      dataIndex: "isTrending",
      key: "isTrending",
      render: (value: any) => (value ? "Yes" : "No"),
    },
    {
      title: "Views",
      dataIndex: "viewCount",
      key: "viewCount",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: any) => new Date(date).toLocaleString(), // Format date
    },
    {
			title: "Action",
			key: "action",
			fixed: "right",
			width: 100,
			render: (value:any) => (
				<ActionDropdown
					viewOnClick={() => navigate(PATH.SINGLE_BLOG.replace(":id", value?.id))}
					// deleteOnClick={() => onDelete(value?.id)}
				/>
			),
		},
  ];

  return (
    <div className="">
      <div className="flex justify-end mb-6">
        
      <GenericButton
        icon={<FaEye size={20} />}
        label="View All Blogs"
        onClick={() => navigate(PATH.ALL_BLOG)}
        />
        </div>
      <GenericTable loading={!data} columns={columns as any} data={data?.list || []} />
    </div>
  );
};

export default Index;
