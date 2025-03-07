import React, { useState } from 'react';
import { Form, Input, Row, Col, Checkbox, Select, Card, Collapse, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import GenericButton from '../../../components/UI/GenericButton';
import CkEditor from '../../../components/UI/GenericCkEditor';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const { Panel } = Collapse;

const AddStore: React.FC<{ onAddStore: (values: any) => void }> = ({ onAddStore }) => {
    const [form] = Form.useForm();
    const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

    const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
        const updatedFaqs = [...faqs];
        updatedFaqs[index][field] = value;
        setFaqs(updatedFaqs);
    };

    const removeFaq = (index: any) => {
        const updatedFaqs = [...faqs];
        updatedFaqs.splice(index, 1);
        setFaqs(updatedFaqs);
    };

    const addFaq = () => {
        setFaqs([...faqs, { question: '', answer: '' }]);
    };


    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                isPopularStore: values.isPopularStore || false,
                isFeatureStore: values.isFeatureStore || false,
                isCategoryFeatureStore: values.isCategoryFeatureStore || false,
                isActive: values.isActive || false,
                faqs: faqs.filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== '')
            };
            console.log("payload:::", payload)
            // return
            onAddStore(payload);

            form.resetFields();
        } catch (err) {
            console.error("Form validation failed:", err);
        }
    };

    return (
        <Card bordered={false} className="w-full max-w-7xl mx-auto shadow-lg p-6 rounded-lg">
            <h2>Add New Store</h2>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="name" label="Store Name" rules={[{ required: true, message: "Store name is required" }]}>
                            <Input placeholder="My Awesome Store" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="secondaryName" label="Secondary Name">
                            <Input placeholder="Best Deals Online" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="headingH1" label="Main Heading (H1)">
                            <Input placeholder="Welcome to Our Store" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="headingH2" label="Subheading (H2)">
                            <Input placeholder="Find the Best Deals" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="storeId" label="Store ID" rules={[{ required: true, message: "Store ID is required" }]}>
                            <Input placeholder="store-123" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="storeTitle" label="Store Title">
                            <Input placeholder="My Store - Best Deals Online" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="storeUrl" label="Store URL" rules={[{ required: true, message: "Store URL is required" }]}>
                            <Input placeholder="https://www.mystore.com" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="network" label="Network">
                            <Input placeholder="Retail Network" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="logoUrl" label="Logo URL">
                            <Input placeholder="https://example.com/store-logo.png" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="thumbnailUrl" label="Thumbnail URL">
                            <Input placeholder="https://example.com/store-thumbnail.png" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="categories" label="Categories">
                    <Select mode="tags" placeholder="Add categories" style={{ width: '100%' }} tokenSeparators={[',']} />
                </Form.Item>

                <Form.Item name="htmlCode" label="HTML Code">
                    <TextArea rows={3} placeholder={`<div class="store-embed">Store content</div>`} />
                </Form.Item>

                <Form.Item name="impressionCode" label="Impression Tracking Code">
                    <TextArea rows={3} placeholder={`<script>trackImpression("store-123")</script>`} />
                </Form.Item>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name="isPopularStore" valuePropName="checked">
                            <Checkbox>Popular Store</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="isFeatureStore" valuePropName="checked">
                            <Checkbox>Feature Store</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="isCategoryFeatureStore" valuePropName="checked">
                            <Checkbox>Category Feature Store</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="isActive" valuePropName="checked" initialValue={true}>
                            <Checkbox>Active</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <Collapse className="mb-6">
                    <Panel header="SEO Information" key="1">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item name="storeTitle" label="Store Title">
                                    <Input placeholder="Enter store title" style={{ height: 45 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item name="metaDescription" label="Meta Description">
                                    <TextArea
                                        placeholder="Enter meta description"
                                        rows={3}
                                        showCount
                                        maxLength={160}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item name="storeDescription" label="Store Description">
                                    <TextArea
                                        placeholder="Enter store description"
                                        rows={4}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <CkEditor
                                    form={form}
                                    dynamicField="storeArticle"
                                    label="storeArticle"
                                />
                            </Col>
                        </Row>
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                                <Button
                                    type="primary"
                                    icon={<FaPlus />}
                                    onClick={addFaq}
                                >
                                    Add FAQ
                                </Button>
                            </div>
                            <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-gray-50 p-4 mb-4 rounded-md border border-gray-200">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-base font-medium">FAQ #{index + 1}</h4>
                                            {faqs.length > 1 && (
                                                <Button
                                                    danger
                                                    icon={<MdDelete />}
                                                    onClick={() => removeFaq(index)}
                                                    size="small"
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                        <Row gutter={24}>
                                            <Col span={24}>
                                                <Form.Item label="Question">
                                                    <Input
                                                        placeholder="Enter FAQ question"
                                                        value={faq.question}
                                                        onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                                                        style={{ height: 45 }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Answer">
                                                    <TextArea
                                                        placeholder="Enter FAQ answer"
                                                        rows={3}
                                                        value={faq.answer}
                                                        onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </Panel>
                </Collapse>

                <div className='flex justify-end'>
                    <GenericButton htmlType="submit" onClick={handleSubmit} label='Add Store' />
                </div>
            </Form>
        </Card>
    );
};

export default AddStore;