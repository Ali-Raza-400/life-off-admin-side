import { useEffect, useState } from "react";
import ActionDropdown from "../../components/UI/ActionDropdown";
import GenericTable from "../../components/UI/GenericTable";
import {useGetCategoriesWithSearchQuery, useUpdateCategoryMutation } from "../../redux/slices/category";
import GenericModal from "../../components/UI/GenericModal";
import { Button, Col, Flex, Form, Input, Row, Typography, Upload } from "antd";
import useNotification from "../../components/UI/Notification";
import GenericButton from "../../components/UI/GenericButton";
import { UploadOutlined } from '@ant-design/icons';
import { getErrorMessage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import { FaEye } from "react-icons/fa";
import useDebounce from "../../components/Hooks/useDebounce";
import SearchFilterWithDrawer from "../../components/UI/SearchFilterWithDrawer";

const { Title, Paragraph, Text } = Typography;

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
  const { data } = useGetCategoriesWithSearchQuery(debouncedTableOptions)
  console.log("data:::", data);

  // const { data } = useGetCategoriesQuery({});
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onEdit = (category: any) => {
    setSelectedCategory(category);
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
    setSelectedCategory(null);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text: any) => (
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
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      width: 120,
      render: (obj: any) => (
        <>
          <ActionDropdown editOnClick={() => onEdit(obj)} viewOnClick={() => navigate(PATH.SINGLE_CATEGORY.replace(':id', obj?.id))} />
        </>
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
      <Flex className="justify-between mb-4">
        {/* <SearchFilter position="end" /> */}
        <div className="w-full">{searchBar}</div>

        <GenericButton
          icon={<FaEye size={20} />}
          label="View All"
          onClick={() => navigate(PATH.ALL_CATEGORY)}
        />
      </Flex>
      <GenericTable loading={false} columns={columns as any} data={data} updatePaginationFunc={(data: { page: number; pageSize: number }) => {
        setTableOptions({ ...tableOptions, pagination: data })
      }}
        enablePagination={true}
      />
      <UpdateCategoryModel isVisible={isVisible} onClose={onClose} form={form} selectedCategory={selectedCategory} />
    </>
  );
};

export default Index;

const UpdateCategoryModel = ({ isVisible, onClose, form, selectedCategory }: any) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const { openNotification, contextHolder } = useNotification();
  const [fileList, setFileList] = useState<{ uid: string; url: string; name?: string; originFileObj?: File }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        categoryName: selectedCategory.categoryName,
        categoryTitle: selectedCategory.categoryTitle,
        categoryDescription: selectedCategory.categoryDescription,
      });

      if (selectedCategory.image) {
        setFileList([{ uid: '-1', url: selectedCategory.image, name: 'category-image', originFileObj: undefined }]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [selectedCategory, form]);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const formData = {
        ...values,
        imageFile: fileList.length > 0 ? fileList[0]?.originFileObj : null,
      };
      await updateCategory({ payload: formData, id: selectedCategory?.id }).unwrap();
      openNotification({ type: "success", title: "Category Updated Successfully!" });
      onClose();
    } catch (error) {
      openNotification({ type: "error", title: getErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
    form.setFieldsValue({ image: fileList });
  };

  return (
    <GenericModal
      onClose={onClose}
      show={isVisible}
      // title="Update Category"
      width={900}
      onOk={() => form.validateFields().then(handleSubmit)}
      maskClosable={false}
      showFooter={false}
    >
      <div className="w-full max-w-4xl mx-auto p-6 rounded-lg">
        {contextHolder}
        <div>
          <Title level={3}>Update Category</Title>
          <Paragraph type="secondary">Modify the category details below.</Paragraph>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="categoryName" label="Category Name" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="categoryTitle" label="Category Title" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="categoryDescription" label="Category Description" rules={[{ required: true }]}>
              <Input.TextArea rows={4} placeholder="Enter category description" />
            </Form.Item>

            <Form.Item name="image" label="Category Image">
              <Upload
                beforeUpload={() => false}
                fileList={fileList as any}
                onChange={handleFileChange}
                maxCount={1}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} size="large">
                  Choose File
                </Button>
              </Upload>
              {fileList.length > 0 && (
                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <Text strong>Selected file: </Text>
                  <Text>{fileList[0]?.name}</Text>
                </div>
              )}
            </Form.Item>

            <div className="flex justify-end pt-4">
              <GenericButton
                variant="solid"
                htmlType="submit"
                label="Update Category"
                disabled={isLoading}
                loading={isLoading}
                style={{ background: "#1890ff", color: "white" }}
              />
            </div>
          </Form>
        </div>
      </div>
    </GenericModal>
  );
};