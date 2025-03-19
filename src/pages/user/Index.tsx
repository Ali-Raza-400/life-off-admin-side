import { ReactElement, useEffect, useState } from "react";
import { Button, Checkbox, Flex, TableProps } from "antd";
import ActionDropdown from "../../components/UI/ActionDropdown";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import GenericTable from "../../components/UI/GenericTable";
import GenericButton from "../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa6";
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../redux/slices/user";
import { Modal, Form, Input, Select } from "antd";
import PageLoader from "../../components/Loader/PageLoader";
import useNotification from "../../components/UI/Notification";
import { getErrorMessage } from "../../utils/helper";
import SearchFilterWithDrawer from "../../components/UI/SearchFilterWithDrawer";
import useDebounce from "../../components/Hooks/useDebounce";

const { Option } = Select;
interface UserFormValues {
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[]; // this will hold array of permissions
}

interface AddUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddUser: (user: UserFormValues) => void;
  loading: boolean;
}
interface UpdateUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdateUser: (user: UserFormValues) => void;
  selectedUser: any
}
interface StudentType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone_number: string;
  cnic_number: string;
  role: string;
}

const Index = (): ReactElement => {
  const [selectedUser, setSelectedUser] = useState<any>()
  console.log("selectedUser", selectedUser);
  const defaultTableOptions = {
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
    },
  };
  const [tableOptions, setTableOptions] = useState(defaultTableOptions);

  const [form] = Form.useForm();
  const debouncedTableOptions = useDebounce(tableOptions, 500, ["name"]);
  const { data, isLoading: userLoading, refetch } = useGetUsersQuery(debouncedTableOptions);
  console.log("data::::", data)
  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updateUser, { isLoading: update }] = useUpdateUserMutation();
  const [addUser, { isLoading: addUserLoading }] = useAddUserMutation()
  const { openNotification, contextHolder } = useNotification()

  const handleAddUser = async (userData: any) => {
    const payload = {
      ...userData,
    };
    console.log("payload::::", payload)
    try {
      await addUser(payload).unwrap();
      showAlert({
        type: "success",
        title: `User Created Successfully!`,
        message: `User Added Successfully. Welcome to the Marketing System`,
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
      form.resetFields();
    } catch (error: unknown) {
      openNotification({
        type: "error",
        title: getErrorMessage(error),
      });
    }
  };
  const onEdit = (user: any) => {
    setIsUpdateModalVisible(true)
    setSelectedUser(user)
  };
  const handleuPDATEUser = async (userData: any) => {
    const payload = {
      userId: selectedUser.id,
      payload: userData,
    };
    try {
      await updateUser(payload).unwrap();
      showAlert({
        type: "success",
        title: `User Updated!`,
        message: `You have successfully update the user`,
        confirmButtonText: "OK",
        onConfirm: () => refetch(),
      });
    } catch (error: unknown) {
    }
  };

  // const navigate = useNavigate();
  const { showAlert } = useGenericAlert();
  const onDelete = async (id: string) => {
    showAlert({
      type: "question",
      title: `Delete User Confirmation`,
      message: `Are you sure you want to delete this user? This action cannot be undone.`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: async () => {
        try {
          await deleteUser(id).unwrap(); // Ensures better error handling
          showAlert({
            type: "success",
            title: `User Deleted Successfully`,
            message: `The user has been deleted successfully.`,
          });
        } catch (error) {
          showAlert({
            type: "error",
            title: `Deletion Failed`,
            message: `An error occurred while deleting the user. Please try again.`,
          });
        }
      },
    });
  };

  const columns: TableProps<StudentType>["columns"] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 120,
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: 200,
      render: (permissions: string[]) => permissions?.length ? permissions.join(", ") : "N/A",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 200,

    },
    {
      title: "Actions", // Updated title for actions
      key: "action",
      fixed: "right",
      width: 120,
      render: (obj) => (
        <ActionDropdown
          // viewProfileOnClick={() => {
          //   navigate(PATH.STUDENT_PROFILE);
          // }}

          editOnClick={() => onEdit(obj)}
          deleteOnClick={() => onDelete(obj?.id)}
        />
      ),
    },
  ];
  if (userLoading || update || deleteUserLoading) {
    return <><PageLoader /></>
  }

  const searchBar = (
    <SearchFilterWithDrawer
      defaultTableOptions={defaultTableOptions}
      setTableOptions={setTableOptions}
      form={form}
    />
  );

  return (
    <>
      {contextHolder}
      <Flex className="justify-start">
        <div className="mt-10">{searchBar}</div>
      </Flex>
      <Flex className="justify-end mb-4">
        <GenericButton
          icon={<FaPlus size={20} />}
          label="Create New Usersdsd"
          onClick={() => setIsModalVisible(true)}
        />


        <AddUserModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddUser={handleAddUser}
          loading={addUserLoading}
        />
        <UpdateUserModal
          isVisible={isUpdateModalVisible}
          onClose={() => setIsUpdateModalVisible(false)}
          onUpdateUser={handleuPDATEUser}
          selectedUser={selectedUser}
        />
      </Flex>
      <GenericTable
        loading={userLoading || update || deleteUserLoading}
        columns={columns}
        data={data}
        enablePagination={true}
        updatePaginationFunc={(data: { page: number; pageSize: number }) => {
          console.log("data::::", data)

          setTableOptions({ ...tableOptions, pagination: data })
        }
        }
      // updatePaginationFunc={(data: any) =>
      //   setTableOptions({ ...tableOptions, pagination: data.pagination?.metadata })
      // }
      />
    </>
  );
};

export default Index;
const permissionsOptions = [
  { label: "Store Page", value: "visit_store_page" },
  { label: "Product Page", value: "visit_product_page" },
  { label: "Coupon Page", value: "visit_coupon_page" },
];

const AddUserModal: React.FC<AddUserModalProps> = ({ isVisible, onClose, onAddUser }) => {
  const [form] = Form.useForm<UserFormValues>();

  const handleSubmit = (values: UserFormValues) => {
    const payload = { ...values }
    onAddUser(payload);
    form.resetFields();
    onClose();
  };
  return (
    <Modal
      title="Add New User"
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div className="gap-2" style={{ display: "flex", justifyContent: "flex-end" }} key="footer">
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Add User
          </Button>
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item<UserFormValues>
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserFormValues>
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Valid email is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserFormValues>
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item<UserFormValues>
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: "Phone Number is required" }]}
        >
          <Input />
        </Form.Item> */}


        <Form.Item<UserFormValues>
          name="role"
          label="Role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select placeholder="Select Role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        {/* Permissions Checkbox Group */}
        <Form.Item<UserFormValues>
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: "At least one permission is required" }]}
        >
          <Checkbox.Group options={permissionsOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isVisible,
  onClose,
  onUpdateUser,
  selectedUser
}) => {
  const [form] = Form.useForm<UserFormValues>();

  // Set initial values when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      console.log("selectedUser::;", selectedUser)
      form.setFieldsValue(selectedUser);
    } else {
      form.resetFields();
    }
  }, [selectedUser, form]);

  const handleSubmit = (values: UserFormValues) => {
    onUpdateUser(values);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={"Update User"}
      open={isVisible}
      onCancel={onClose}
      footer={[
        <div style={{ display: "flex", justifyContent: "flex-end" }} key="footer">
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Update User
          </Button>,
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>

        <Form.Item name="name" label=" Name" rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Role is required" }]}>
          <Select placeholder="Select Role">
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item<UserFormValues>
          name="permissions"
          label="Permissions"
          rules={[{ required: true, message: "At least one permission is required" }]}
        >
          <Checkbox.Group options={permissionsOptions} />
        </Form.Item>
        {!selectedUser && (
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
