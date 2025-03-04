import { Form, Input, Select, Card, Typography, Checkbox } from "antd"
import GenericButton from "../../../components/UI/GenericButton"
import { useAddUserMutation } from "../../../redux/slices/user"
import useGenericAlert from "../../../components/Hooks/GenericAlert"
import useNotification from "../../../components/UI/Notification"
import { getErrorMessage } from "../../../utils/helper"
import { useNavigate } from "react-router-dom"
import PATH from "../../../navigation/Path"

const { Title, Paragraph } = Typography
const { Option } = Select

const permissionsOptions = [
    { label: "Store Page", value: "visit_store_page" },
    { label: "Product Page", value: "visit_product_page" },
    { label: "Coupon Page", value: "visit_coupon_page" },
]
interface UserFormValues {
    name: string;
    email: string;
    role: "admin" | "user";
    password: string;
    permissions: string[];
}
const CreateUser = () => {
    const [form] = Form.useForm<UserFormValues>()
    const navigate = useNavigate()
    const [addUser, { isLoading }] = useAddUserMutation()
    const { showAlert } = useGenericAlert()
    const { openNotification, contextHolder } = useNotification()

    const handleAddUser = async (userData: any) => {
        

        try {
            await addUser(userData).unwrap()
            showAlert({
                type: "success",
                title: `User Created Successfully!`,
                message: `User Added Successfully. Welcome to the Marketing System`,
                confirmButtonText: "OK",
            })
            form.resetFields()
            navigate(PATH.MANAGE_STUDENTS)
        } catch (error: unknown) {
            openNotification({
                type: "error",
                title: getErrorMessage(error),
            })
        }
    }

    const handleSubmit = (values: UserFormValues) => {
        handleAddUser(values)
    }

    return (
        <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
            {contextHolder}
            <div>
                <div className="mb-6">
                    <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
                        Create New User
                    </Title>
                    <Paragraph type="secondary">Fill in the details to add a new user to the system</Paragraph>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark="optional"
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 ">
                        <Form.Item<UserFormValues>
                            name="name"
                            label="Full Name"
                            rules={[{ required: true, message: "Full Name is required" }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <Form.Item<UserFormValues>
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: "email", message: "Valid email is required" }]}
                    >
                        <Input size="large" style={{ height: "40px" }} />
                    </Form.Item>

                    <Form.Item<UserFormValues>
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: "Role is required" }]}
                    >
                        <Select
                            placeholder="Select Role"
                            size="large"
                            style={{ width: "100%" }}
                            dropdownStyle={{ maxHeight: "200px" }}
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item<UserFormValues>
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input.Password size="large" style={{ height: "40px" }} />
                    </Form.Item>

                    {/* Permissions Checkboxes */}
                    <Form.Item<UserFormValues>
                        name="permissions"
                        label="Permissions"
                        rules={[{ required: true, message: "At least one permission is required" }]}
                    >
                        <Checkbox.Group options={permissionsOptions} />
                    </Form.Item>

                    <div className="flex justify-end pt-4">
                        <GenericButton
                            variant="solid"
                            htmlType="submit"
                            label="Add User"
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
    )
}

export default CreateUser
