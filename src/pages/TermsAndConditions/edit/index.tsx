import React, { useState, useEffect } from "react";
import { Form, Card, Button, Input, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGetSingleTermAndConditionQuery, useUpdateTermAndConditionMutation } from "../../../redux/slices/termsdConditions";
import PATH from "../../../navigation/Path";


// Define Section type
interface Section {
  title: string;
  description: string;
  error?: boolean;
}

const UpdateTermsAndConditions: React.FC = () => {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // API Hooks
  const [getSingleTermAndCondition, { data, isLoading }] = useLazyGetSingleTermAndConditionQuery();
  const [updateTermAndCondition, { isLoading: updateLoading }] = useUpdateTermAndConditionMutation();

  // State
  const [sections, setSections] = useState<Section[]>([{ title: "", description: "", error: false }]);

  // Fetch Terms & Conditions by ID
  useEffect(() => {
    if (state?.termsConditionID) {
      getSingleTermAndCondition(state.termsConditionID)
        .then(({ data }) => {
          if (data?.sections?.length > 0) {
            setSections(data.sections.map((s: Section) => ({ ...s, error: false })));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [state?.termsConditionID]);

  // Add Section
  const handleAddSection = () => {
    setSections([...sections, { title: "", description: "", error: false }]);
  };

  // Remove Section
  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // Handle Input Change
  const handleSectionChange = (index: number, field: keyof Section, value: string) => {
    const updatedSections = [...sections];
    // @ts-ignore
    updatedSections[index][field] = value;
    updatedSections[index].error = false; // Remove error on change
    setSections(updatedSections);
  };

  // Submit Form
  const handleSubmit = async () => {
    try {
      await form.validateFields();

      let isValid = true;
      const updatedSections = sections.map((s) => {
        if (!s.title.trim() || !s.description.trim()) {
          isValid = false;
          return { ...s, error: true };
        }
        return { ...s, error: false };
      });

      setSections(updatedSections);

      if (!isValid) {
        message.error("Please fill in all fields before submitting.");
        return;
      }

      // Prepare Payload
      const payload = {
        sections: updatedSections.map(({ error, ...rest }) => rest)
      };

      console.log("Updated Payload:", payload);

      // Call Update API
      updateTermAndCondition({ payload, id: state?.termsConditionID }).then((res) => {
        if (res.error) {
          message.error("Failed to update Terms & Conditions");
        } else {
          message.success("Terms & Conditions updated successfully");
          navigate(PATH.TERMS_CONDITIONS);
        }
      });
    } catch (err) {
      console.error("Form validation failed:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Terms & Conditions Found</p>;

  return (
    <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold">Update Terms & Conditions</h3>
        <p className="text-gray-500">Modify the details below</p>
      </div>

      <Form form={form} layout="vertical">
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
              <Form.Item
                label="Title"
                validateStatus={s.error && !s.title ? "error" : ""}
                help={s.error && !s.title ? "Title is required" : ""}
              >
                <Input
                  placeholder="Enter title"
                  value={s.title}
                  onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                  style={{ height: 45 }}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                validateStatus={s.error && !s.description ? "error" : ""}
                help={s.error && !s.description ? "Description is required" : ""}
              >
                <Input.TextArea
                  placeholder="Enter description"
                  rows={3}
                  value={s.description}
                  onChange={(e) => handleSectionChange(index, "description", e.target.value)}
                />
              </Form.Item>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="primary" onClick={handleSubmit} loading={updateLoading}>
            Update Terms & Conditions
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateTermsAndConditions;
