import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card, Button, message, DatePicker, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { useLazyGetSinglePrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "../../../redux/slices/privacyPolicy";
import PATH from "../../../navigation/Path";

// Define the Section type
interface Section {
    question: string;
    answer: string;
    error?: boolean;
}

const UpdatePrivacyPolicy: React.FC = () => {
    const { state } = useLocation();
    const [form] = Form.useForm();
    const [getSinglePrivacyPolicy, { data, isLoading }] = useLazyGetSinglePrivacyPolicyQuery();
    const [updatePrivacyPolicy, { isLoading: updateLoading }] = useUpdatePrivacyPolicyMutation();
    const [sections, setSections] = useState<Section[]>([{ question: "", answer: "", error: false }]);
    const [dateOfCreation, setDateOfCreation] = useState<dayjs.Dayjs | null>(null);  // ✅ Added date state
    const navigate=useNavigate()


    useEffect(() => {
        if (state?.id) {
            getSinglePrivacyPolicy(state.id)
                .then(({ data }) => {
                    if (data?.list) {
                        setSections(
                            data.list.questions?.length > 0
                                ? data.list.questions.map((q: { question: string; answer: string }) => ({
                                    question: q.question,
                                    answer: q.answer,
                                    error: false,
                                }))
                                : [{ question: "", answer: "", error: false }]
                        );

                        // ✅ Set existing date from backend if available
                        setDateOfCreation(data.list.dateOfCreation ? dayjs(data.list.dateOfCreation) : null);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [state?.id]);

    const handleAddSection = () => {
        setSections([...sections, { question: "", answer: "", error: false }]);
    };

    const handleRemoveSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const handleSectionChange = (index: number, field: keyof Section, value: string) => {
        const updatedSections = [...sections];
        updatedSections[index][field] = value;
        updatedSections[index].error = false; // Remove error when user types
        setSections(updatedSections);
    };

    const handleSubmit = async () => {
        try {
            await form.validateFields();

            let isValid = true;
            const updatedSections = sections.map((s) => {
                if (!s.question.trim() || !s.answer.trim()) {
                    isValid = false;
                    return { ...s, error: true };
                }
                return { ...s, error: false };
            });

            setSections(updatedSections);

            if (!isValid) {
                message.error("Please fill in all required fields before submitting.");
                return;
            }

            const payload = {
                dateOfCreation: dateOfCreation ? dateOfCreation.toISOString() : new Date().toISOString(),  // ✅ Send date in ISO format
                questions: updatedSections.map(({ error, ...rest }) => rest),
            };

            console.log("Updated Payload:", payload);
            updatePrivacyPolicy({ payload, id: state?.id }).then(res => {
                if (res.error) {
                    message.error("Failed to update privacy policy");
                } else {
                    message.success("Privacy policy updated successfully");
                    navigate(PATH.PRIVACY_POLICY)
                }
            });
        } catch (err) {
            console.error("Form validation failed:", err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No Privacy Policy Found</p>;

    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            <div className="mb-6">
                <h3 className="text-xl font-bold">Update Privacy Policy</h3>
                <p className="text-gray-500">Modify the details of the privacy policy below</p>
            </div>

            <Form form={form} layout="vertical">
                {/* Date Picker for Creation Date */}
                <Form.Item
                    label="Date of Creation"
                    rules={[{ required: true, message: "Date of Creation is required" }]}
                >
                    <DatePicker 
                        value={dateOfCreation} 
                        onChange={setDateOfCreation} 
                        style={{ width: "100%" }} 
                    />
                </Form.Item>

                {/* Add Section Button */}
                <div className="flex justify-end mb-4">
                    <Button type="primary" icon={<FaPlus />} onClick={handleAddSection}>
                        Add More Sections
                    </Button>
                </div>

                {/* Sections */}
                <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "10px" }}>
                    {sections.map((s, index) => (
                        <div key={index} className="bg-gray-50 p-4 mb-4 rounded-md border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-base font-medium">Section #{index + 1}</h4>
                                {sections.length > 1 && (
                                    <Button danger icon={<MdDelete />} onClick={() => handleRemoveSection(index)} size="small">
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Question"
                                        validateStatus={s.error && !s.question ? "error" : ""}
                                        help={s.error && !s.question ? "Question is required" : ""}
                                    >
                                        <Input
                                            placeholder="Enter question"
                                            value={s.question}
                                            onChange={(e) => handleSectionChange(index, "question", e.target.value)}
                                            style={{ height: 45 }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Answer"
                                        validateStatus={s.error && !s.answer ? "error" : ""}
                                        help={s.error && !s.answer ? "Answer is required" : ""}
                                    >
                                        <Input.TextArea
                                            placeholder="Enter answer"
                                            rows={3}
                                            value={s.answer}
                                            onChange={(e) => handleSectionChange(index, "answer", e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button type="primary" onClick={handleSubmit} loading={updateLoading}>
                        Update Privacy Policy
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default UpdatePrivacyPolicy;
