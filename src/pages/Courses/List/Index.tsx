import { ReactElement, useState } from "react";
import {  Flex, TableProps } from "antd";
// import useNotification from "antd/es/notification/useNotification";
// import SearchFilter from "../../../components/UI/SearchFilter";
import ActionDropdown from "../../../components/UI/ActionDropdown";
// import useGenericAlert from "../../../components/Hooks/GenericAlert";
import GenericTable from "../../../components/UI/GenericTable";
import GenericButton from "../../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa6";
import { Form } from "antd";
import { useAddTruckMutation, useDeleteTruckMutation, useGetStoresQuery, useUpdateTruckMutation } from "../../../redux/slices/truck";
// import { useGetUserByRoleQuery } from "../../../redux/slices/user";
// import { truckFormValues } from "../../Auth/type";
import PageLoader from "../../../components/Loader/PageLoader";
// import { getErrorMessage } from "../../../utils/helper";

// const { Option } = Select;


// interface AddUserModalProps {
// 	isVisible: boolean;
// 	onClose: () => void;
// 	onAddUser: (user: truckFormValues) => void;
// }
// interface UpdateUserModalProps {
// 	isVisible: boolean;
// 	onClose: () => void;
// 	onUpdateTruck: (user: truckFormValues) => void;
// 	selectedTruck: any
// }


const Index = (): ReactElement => {
	const [_form] = Form.useForm();
	const [_selectedTruck, _setSelectedTruck] = useState<any>()
	const [_isUpdateModalVisible, _setIsUpdateModalVisible] = useState(false);
	const { data, isLoading: storeLoading, isFetching,  } = useGetStoresQuery({
		page: 1,
		pageSize: 8,
	});
	console.log("data::::", data)

	const [_deleteTruck, { isLoading: DeleteTruckLoading }] = useDeleteTruckMutation();
	const [_isModalVisible, setIsModalVisible] = useState(false);
	const [_registerFunc, { isLoading }] = useAddTruckMutation();
	const [_updateTruck, { isLoading: updateLoading }] = useUpdateTruckMutation();
	console.log("updateLoading", updateLoading);
	// const handleuPDATEUser = async (userData: any) => {
	// 	const payload = {
	// 		truckId: selectedTruck.id,
	// 		payload: userData,
	// 	};
	// 	try {
	// 		await updateTruck(payload).unwrap();
	// 		showAlert({
	// 			type: "success",
	// 			title: `User Updated!`,
	// 			message: `You have successfully update the user`,
	// 			confirmButtonText: "OK",
	// 			onConfirm: () => refetch(),
	// 		});
	// 	} catch (error: unknown) {
	// 	}
	// };
	console.log("isLoading", isLoading, isFetching);
	// const handleAddUser = async (userData: any) => {
	// 	const payload = {
	// 		...userData,
	// 	};
	// 	try {
	// 		await registerFunc(payload).unwrap();
	// 		showAlert({
	// 			type: "success",
	// 			title: `Truck registered!`,
	// 			message: `You have successfully created truck.`,
	// 			confirmButtonText: "OK",
	// 			onConfirm: () => refetch(),
	// 		});
	// 		form.resetFields();
	// 	} catch (error: unknown) {
	// 		// openNotification({
	// 		// 	type: "error",
	// 		// 	title: getErrorMessage(error),
	// 		// });
	// 	}
	// };
	// const onEdit = (truck: any) => {
	// 	setIsUpdateModalVisible(true)
	// 	setSelectedTruck(truck)
	// };
	// const { showAlert } = useGenericAlert();
	// const onDelete = async (id: string) => {
	// 	showAlert({
	// 		type: "question",
	// 		title: `Delete Truck Confirmation`,
	// 		message: `Are you sure you want to delete this Truck? This action cannot be undone.`,
	// 		confirmButtonText: "Delete",
	// 		cancelButtonText: "Cancel",
	// 		onConfirm: async () => {
	// 			try {
	// 				await deleteTruck(id).unwrap(); // Ensures better error handling
	// 				showAlert({
	// 					type: "success",
	// 					title: `Truck Deleted Successfully`,
	// 					message: `The Truck has been deleted successfully.`,
	// 				});
	// 			} catch (error) {
	// 				showAlert({
	// 					type: "error",
	// 					title: `Deletion Failed`,
	// 					message: `An error occurred while deleting the user. Please try again.`,
	// 				});
	// 			}
	// 		},
	// 	});
	// };
	const columns: TableProps<any>["columns"] = [
		{
			title: "Store Name",
			dataIndex: "name",
			key: "name",
			width: 150,
		},

		{
			title: "Category",
			dataIndex: "categories",
			key: "categories",
			width: 200,
			render: (categories) => categories?.join(", ") || "N/A",
		},

		{
			title: "Store URL",
			dataIndex: "storeUrl",
			key: "storeUrl",
			width: 200,
			render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>,
		},

		{
			title: "Is Popular?",
			dataIndex: "isPopularStore",
			key: "isPopularStore",
			width: 120,
			render: (isPopular) => (isPopular ? "Yes" : "No"),
		},

		{
			title: "Actions",
			key: "action",
			fixed: "right",
			width: 120,
			render: (_store) => (
				<ActionDropdown
				// editOnClick={() => onEdit(store)}
				// deleteOnClick={() => onDelete(store?.id)}
				/>
			),
		},
	];

	if (updateLoading || DeleteTruckLoading || isLoading) {
		return <><PageLoader /></>
	}

	return (
		<>
			{/* {contextHolder} */}
			<Flex className="justify-end mb-4">
				{/* <SearchFilter position="end" /> */}
				<GenericButton
					icon={<FaPlus size={20} />}
					label="Create New Store"
					onClick={() => setIsModalVisible(true)}
				/>


				{/* <AddUserModal
					isVisible={isModalVisible}
					onClose={() => setIsModalVisible(false)}
					onAddUser={handleAddUser}
				/>
				<UpdateUserModal
					isVisible={isUpdateModalVisible}
					onClose={() => setIsUpdateModalVisible(false)}
					onUpdateTruck={handleuPDATEUser}
					selectedTruck={selectedTruck}
				/> */}
			</Flex>
			<GenericTable loading={storeLoading} columns={columns} data={data ? data.list : []} />
		</>
	);
};

export default Index;
// const AddUserModal: React.FC<AddUserModalProps> = ({ isVisible, onClose, onAddUser }) => {
// 	const { data: supervisor } = useGetUserByRoleQuery({
// 		role: "supervisor",
// 	});
// 	const { data: driver } = useGetUserByRoleQuery({
// 		role: "driver",
// 	});
// 	const [form] = Form.useForm<truckFormValues>();
// 	const handleSubmit = (values: truckFormValues) => {
// 		console.log("User Data:", values);
// 		onAddUser(values);
// 		form.resetFields();
// 		onClose();
// 	};
// 	return (
// 		<Modal
// 			title="Add New Truck"
// 			open={isVisible}
// 			onCancel={onClose}
// 			footer={[
// 				<div style={{ display: "flex", justifyContent: "flex-end" }}>
// 					<Button key="cancel" onClick={onClose}>
// 						Cancel
// 					</Button>,
// 					<Button key="submit" type="primary" onClick={() => form.submit()}>
// 						Add Truck
// 					</Button>,
// 				</div>,
// 			]}
// 		>
// 			<Form form={form} layout="vertical" onFinish={handleSubmit}>
// 				<Form.Item<truckFormValues> name="name" label="Truck Name" rules={[{ required: true, message: "Truck name is required" }]}>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item<truckFormValues> name="license_plate" label="License Plate" rules={[{ required: true, message: "License Plate is required" }]}>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item<truckFormValues> name="supervisor_id" label="Supervisor ID" rules={[{ required: true, message: "Supervisor ID is required" }]}>
// 					<Select placeholder="Select Supervisor ID">
// 						{(supervisor?.list || [])?.map((role: any) => {
// 							return (
// 								<Option value={role.id}>{role.first_name + " " + role.last_name}</Option>
// 							)
// 						})}
// 					</Select>
// 				</Form.Item>
// 				<Form.Item<truckFormValues> name="driver_id" label="Driver ID" rules={[{ required: true, message: "Driver ID is required" }]}>
// 					<Select placeholder="Select Driver ID">
// 						{(driver?.list || [])?.map((role: any) => {
// 							return (
// 								<Option value={role.id}>{role.first_name + " " + role.last_name}</Option>
// 							)
// 						})}
// 					</Select>
// 				</Form.Item>

// 			</Form>
// 		</Modal>
// 	);
// };
// const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isVisible, onClose, onUpdateTruck, selectedTruck }) => {
// 	const { data: supervisor } = useGetUserByRoleQuery({
// 		role: "supervisor",
// 	});
// 	const { data: driver } = useGetUserByRoleQuery({
// 		role: "driver",
// 	});
// 	const [form] = Form.useForm<truckFormValues>();
// 	useEffect(() => {
// 		if (selectedTruck) {
// 			form.setFieldsValue(selectedTruck);
// 		} else {
// 			form.resetFields();
// 		}
// 	}, [selectedTruck, form]);
// 	const handleSubmit = (values: truckFormValues) => {
// 		console.log("User Data:", values);
// 		onUpdateTruck(values);
// 		form.resetFields();
// 		onClose();
// 	};
// 	return (
// 		<Modal
// 			title="Update Truck"
// 			open={isVisible}
// 			onCancel={onClose}
// 			footer={[
// 				<div style={{ display: "flex", justifyContent: "flex-end" }}>
// 					<Button key="cancel" onClick={onClose}>
// 						Cancel
// 					</Button>,
// 					<Button key="submit" type="primary" onClick={() => form.submit()}>
// 						Update Truck
// 					</Button>,
// 				</div>,
// 			]}
// 		>
// 			<Form form={form} layout="vertical" onFinish={handleSubmit}>
// 				<Form.Item<truckFormValues> name="name" label="Truck Name" rules={[{ required: true, message: "Truck name is required" }]}>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item<truckFormValues> name="license_plate" label="License Plate" rules={[{ required: true, message: "License Plate is required" }]}>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item<truckFormValues> name="supervisor_id" label="Supervisor ID" rules={[{ required: true, message: "Supervisor ID is required" }]}>
// 					<Select placeholder="Select Supervisor ID">
// 						{(supervisor?.list || [])?.map((role: any) => {
// 							return (
// 								<Option value={role.id}>{role.first_name + " " + role.last_name}</Option>
// 							)
// 						})}
// 					</Select>
// 				</Form.Item>
// 				<Form.Item<truckFormValues> name="driver_id" label="Driver ID" rules={[{ required: true, message: "Driver ID is required" }]}>
// 					<Select placeholder="Select Driver ID">
// 						{(driver?.list || [])?.map((role: any) => {
// 							return (
// 								<Option value={role.id}>{role.first_name + " " + role.last_name}</Option>
// 							)
// 						})}
// 					</Select>
// 				</Form.Item>

// 			</Form>
// 		</Modal>
// 	);
// };
