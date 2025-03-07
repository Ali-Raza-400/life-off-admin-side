import { useState } from 'react';
import { Form, Input, Card, Typography, Row, Col, Select } from 'antd';
import GenericButton from '../../../components/UI/GenericButton';
import useNotification from '../../../components/UI/Notification';
import { getErrorMessage } from '../../../utils/helper';
import { useSaveNetworkMutation } from '../../../redux/slices/network';
import { useNavigate } from 'react-router-dom';
import PATH from '../../../navigation/Path';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const index = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { openNotification, contextHolder } = useNotification();
    const [saveNetwork] = useSaveNetworkMutation()
    const navigate = useNavigate()

    const handleSubmit = (values: any) => {
        setIsLoading(true);

        try {
            console.log('Form values:', values);
            const payload = { ...values }
            saveNetwork(payload).then(res => {
                console.log("res:::", res);

            })
            openNotification({
                type: 'success',
                title: 'Network Created Successfully!',
            });
            navigate(PATH.VIEW_NETWORK)
            form.resetFields();
        } catch (error) {
            openNotification({
                type: 'error',
                title: getErrorMessage(error),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            {contextHolder}
            <div className="mb-6">
                <Title level={3} style={{ margin: 0, marginBottom: '8px' }}>
                    Create New Network
                </Title>
                <Paragraph type="secondary">
                    Fill in the details to add a new network to the system
                </Paragraph>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark="optional"
                className="space-y-4"
            >
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="name"
                            label="Network Name"
                            rules={[{ required: true, message: 'Network Name is required' }]}
                        >
                            <Input size="large" placeholder="Enter Network Name" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="status"
                            label="Network Status"
                            rules={[{ required: true, message: 'Status is required' }]}
                        >
                            <Select size='large' placeholder="Select Status">
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end pt-4">
                    <GenericButton
                        variant="solid"
                        htmlType="submit"
                        label="Add Network"
                        disabled={isLoading}
                        loading={isLoading}
                        style={{
                            height: '44px',
                            minWidth: '120px',
                            background: '#1890ff',
                            color: 'white',
                            borderRadius: '6px',
                            fontWeight: 500,
                        }}
                    />
                </div>
            </Form>
        </Card>
    );
};

export default index;
