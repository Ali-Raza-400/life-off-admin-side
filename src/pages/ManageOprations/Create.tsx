import React, { useState } from 'react';
import { Form, Input, Select, Card, Typography, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useGetStoresQuery } from '../../redux/slices/truck';
import { useGetUserByRoleQuery } from '../../redux/slices/user';
import useNotification from '../../components/UI/Notification';
import GenericButton from '../../components/UI/GenericButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PATH from '../../navigation/Path';

const { Title, Paragraph } = Typography;

const CreateOperation: React.FC = () => {
  const { Option } = Select;
  const { data: truck, isLoading: truckLoading } = useGetStoresQuery({
    page: 1,
    pageSize: 8,
  });

  const { user } = useSelector((state: any) => state.auth);
  console.log("user:::", user)
  const { data: supervisor } = useGetUserByRoleQuery({
    role: 'supervisor',
  });
  const navigate=useNavigate()
  const { openNotification, contextHolder } = useNotification();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  console.log("fileList", fileList);

  const handleSubmit = () => {
    handleUpload();
  };

  const handleUpload = async () => {
    try {
      const values = await form.validateFields();

      if (fileList.length === 0) {
        openNotification({
          type: "error",
          title: "Please select at least one file!",
        });
        return;
      }

      const formData = new FormData();
      formData.append("truck_id", values.truck_id);
      formData.append("supervisor_id", values.supervisor_id);
      formData.append("location", values.location);

      // Append files correctly
      fileList.forEach((file: UploadFile) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj); // API expects 'files'
        }
      });
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Make the API call
      const response = await fetch("https://sa.wholesalerspk.com/photo-logs/", {
        method: "POST",
        headers: {
          Authorization:`Bearer ${user?.access_token}`, // Replace with actual token
          Accept: "application/json", // Accept header
        },
        body: formData, // FormData should be sent directly
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        navigate(PATH.MANAGE_OPRATION)
        openNotification({
          type: "success",
          title: "Image uploaded successfully!",
        });
        form.resetFields();
        setFileList([]);
      } else {
        openNotification({
          type: "error",
          title: "Upload Failed",
          description: result.message || "Something went wrong.",
        });
      }
    } catch (error:any) {
      console.error("Upload Error:", error);
      openNotification({
        type: "error",
        title: "Upload Failed",
        description: error.message,
      });
    }
  };



  return (
    <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Create New Operation
          </Title>
          <Paragraph type="secondary">Fill in the details to add a new operation to the system</Paragraph>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="supervisor_id"
              label="Supervisor"
              rules={[{ required: true, message: "Supervisor is required" }]}
            >
              <Select
                placeholder="Select Supervisor"
                size="large"
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: "200px" }}
                loading={!supervisor}
              >
                {(supervisor?.list || [])?.map((role: any) => (
                  <Option key={role.id} value={role.id}>
                    {role.first_name + " " + role.last_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="truck_id"
              label="Truck"
              rules={[{ required: true, message: "Truck is required" }]}
            >
              <Select
                placeholder="Select Truck"
                size="large"
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: "200px" }}
                loading={truckLoading}
              >
                {(truck?.list || [])?.map((role: any) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Location is required' }]}
          >
            <Input.TextArea rows={3} style={{ resize: "none" }} />
          </Form.Item>

          <Form.Item label="Upload Files">
            <Upload
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
              multiple
            >
              <Button icon={<UploadOutlined />}>Select Files</Button>
            </Upload>
            {fileList.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{fileList.length} file(s) selected</p>
              </div>
            )}
          </Form.Item>
          <div className="flex justify-end pt-4">
            <GenericButton
              variant="solid"
              htmlType="submit"
              label="Add Operation"
              // disabled={isLoading}
              // loading={isLoading}
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



export default CreateOperation;