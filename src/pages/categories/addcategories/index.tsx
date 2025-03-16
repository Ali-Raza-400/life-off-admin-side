import  { useState } from 'react';
import { Form, Input, Upload, Button, Card, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import GenericButton from '../../../components/UI/GenericButton';
import useNotification from '../../../components/UI/Notification';
import { getErrorMessage } from '../../../utils/helper';

const { Title, Paragraph, Text } = Typography;

const Index = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]); 
    const [isLoading, setIsLoading] = useState(false);
    const { openNotification, contextHolder } = useNotification();

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList || [];
    };
    console.log(normFile);

    const handleSubmit = (values: any) => {
        setIsLoading(true);

        try {
            // Add the image file information to the values
            const formData = {
                ...values,
                imageFile: fileList.length > 0 ? fileList[0]?.originFileObj : null
            };

            console.log('Form values:', formData);
            openNotification({
                type: "success",
                title: "Category Created Successfully!",
            });
            form.resetFields();
            setFileList([]);
            setIsLoading(false);
        } catch (error) {
            openNotification({
                type: "error",
                title: getErrorMessage(error),
            });
            setIsLoading(false);
        }
    };

    const handleFileChange = ({ fileList }: any) => {
        setFileList(fileList);
        // Update the form field to pass validation
        form.setFieldsValue({ image: fileList });
    };

    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            {contextHolder}
            <div>
                <div className="mb-6">
                    <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
                        Create New Category
                    </Title>
                    <Paragraph type="secondary">Fill in the details to add a new category to the system</Paragraph>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark="optional"
                    className="space-y-4"
                >
                    <Row gutter={16}>
                        {/* Category Name */}
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="categoryName"
                                label="Category Name"
                                rules={[{ required: true, message: "Category Name is required" }]}
                            >
                                <Input size="large" style={{ height: "40px" }} />
                            </Form.Item>
                        </Col>

                        {/* Category Title */}
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="categoryTitle"
                                label="Category Title"
                                rules={[{ required: true, message: "Category Title is required" }]}
                            >
                                <Input size="large" style={{ height: "40px" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Category Description - Full width */}
                    <Form.Item
                        name="categoryDescription"
                        label="Category Description"
                        rules={[{ required: true, message: "Category Description is required" }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Enter category description"
                            style={{ borderRadius: "6px" }}
                        />
                    </Form.Item>

                    {/* Image Upload - Full width */}
                    <Form.Item
                        name="image"
                        label="Category Image"
                        rules={[{
                            required: true,
                            message: "Category Image is required",
                            validator: (_, _value) => {
                                if (fileList.length > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Please upload an image'));
                            }
                        }]}
                    >
                        <div className="space-y-2">
                            <Upload
                                beforeUpload={() => false}
                                fileList={fileList}
                                onChange={handleFileChange}
                                maxCount={1}
                                showUploadList={false}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    size="large"
                                    style={{ height: "40px", borderRadius: "6px" }}
                                >
                                    Choose File
                                </Button>
                            </Upload>

                            {fileList.length > 0 && (
                                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                                    <Text strong>Selected file: </Text>
                                    <Text>{fileList[0].name}</Text>
                                </div>
                            )}
                        </div>
                    </Form.Item>

                    <div className="flex justify-end pt-4">
                        <GenericButton
                            variant="solid"
                            htmlType="submit"
                            label="Add Category"
                            disabled={isLoading}
                            loading={isLoading}
                            style={{
                                height: "44px",
                                minWidth: "120px",
                                background: "#1890ff",
                                color: "white",
                                borderRadius: "6px",
                                fontWeight: 500,
                            }}
                        />
                    </div>
                </Form>
            </div>
        </Card>
    );
};

export default Index;