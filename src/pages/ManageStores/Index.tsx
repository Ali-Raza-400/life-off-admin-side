import { ReactElement, useEffect, useState } from "react";
import { Checkbox, Col, Collapse, Flex, Input, Row, Select, TableProps } from "antd";
import ActionDropdown from "../../components/UI/ActionDropdown";
import GenericTable from "../../components/UI/GenericTable";
import GenericButton from "../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa6";
import { Form } from "antd";
import { useGetStoresQuery } from "../../redux/slices/truck";
import GenericModal from "../../components/UI/GenericModal";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import TextArea from "antd/es/input/TextArea";
import { useEditStoreMutation, useRemoveStoreMutation, useSaveStoreMutation } from "../../redux/slices/store";
import { getErrorMessage } from "../../utils/helper";
import useNotification from "../../components/UI/Notification";
import { useNavigate } from "react-router-dom";
import PATH from "../../navigation/Path";
import CkEditor from '../../components/UI/GenericCkEditor';



const Index = (): ReactElement => {
	const [form] = Form.useForm();
	const [selectedStore, setSelectedStore] = useState<any>()
	const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
	const { data, isLoading: storeLoading, refetch } = useGetStoresQuery({
		page: 1,
		pageSize: 8,
	});
	const navigate = useNavigate()

	const [removeStore] = useRemoveStoreMutation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [saveStore] = useSaveStoreMutation()
	const [editStore] = useEditStoreMutation()
	const { openNotification, contextHolder } = useNotification()
	const handleUpdateStore = async (userData: any) => {
		const payload = { ...userData };

		try {
			await editStore({ payload, id: selectedStore.id }).unwrap();
			showAlert({
				type: "success",
				title: "Store Content Updated!",
				message: "The store content has been successfully updated.",
				confirmButtonText: "OK",
				onConfirm: () => refetch(),
			});
			form.resetFields();
		} catch (error: any) {
			console.error("Update store failed:", error);
			showAlert({
				type: "error",
				title: "Update Failed",
				message: error?.data?.message || "Something went wrong while updating the store.",
				confirmButtonText: "OK",
			});
		}
	};

	const handleAddStore = async (userData: any) => {
		const payload = {
			...userData,
		}
		try {
			await saveStore(payload).unwrap();
			showAlert({
				type: "success",
				title: "Store Added!",
				message: "The store has been added successfully.",
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
	const onEdit = (store: any) => {
		console.log("store:::", store)
		// return
		setIsUpdateModalVisible(true)
		setSelectedStore(store)
	};
	const { showAlert } = useGenericAlert();
	const onDelete = async (id: string) => {
		console.log("id:::", id);
		// return

		showAlert({
			type: "question",
			title: `Delete Store Confirmation`,
			message: `Are you sure you want to delete this store? This action cannot be undone.`,
			confirmButtonText: "Delete",
			cancelButtonText: "Cancel",
			onConfirm: async () => {
				try {
					await removeStore(id).unwrap(); // Ensures better error handling
					showAlert({
						type: "success",
						title: `Store Deleted Successfully`,
						message: `The store has been deleted successfully.`,
					});
					refetch()
				} catch (error) {
					showAlert({
						type: "error",
						title: `Failed to Delete Store`,
						message: `An error occurred while deleting the store. Please try again.`,
					});
				}
			},
		});
	};

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
			render: (url, obj) => {
				console.log("obj:::", obj)
				return (
					<div className="cursor-pointer" onClick={() => navigate(PATH.SINGLE_STORE.replace(":id", obj?.id))}>{url}</div>
				)
			},
		},
		// PATH.TEACHER_PROFILE.replace(":id", user.id)
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
			render: (store) => (
				<ActionDropdown
					editOnClick={() => onEdit(store)}
					deleteOnClick={() => onDelete(store?.id)}
				/>
			),
		},
	];



	console.log("isUpdateModalVisible:::", isUpdateModalVisible)

	return (
		<>
			{contextHolder}
			<Flex className="justify-end mb-4">
				{/* <SearchFilter position="end" /> */}
				<GenericButton
					icon={<FaPlus size={20} />}
					label="Create New Store"
					onClick={() => setIsModalVisible(true)}
				/>


				<AddStoreModal
					isVisible={isModalVisible}
					onClose={() => setIsModalVisible(false)}
					onAddStore={handleAddStore}
				/>
				<UpdateUserModal
					isVisible={isUpdateModalVisible}
					onClose={() => setIsUpdateModalVisible(false)}
					onUpdateStore={handleUpdateStore}
					selectedStore={selectedStore}
				/>
			</Flex>
			<GenericTable loading={storeLoading} columns={columns} data={data ? data.list : []} />
		</>
	);
};

export default Index;

const AddStoreModal: React.FC<any> = ({ isVisible, onClose, onAddStore }) => {
	const [form] = Form.useForm();
	const { Panel } = Collapse;

	const handleSubmit = (values: any) => {
		const payload = {
			...values,
			isPopularStore: values.isPopularStore || false,
			isFeatureStore: values.isFeatureStore || false,
			isCategoryFeatureStore: values.isCategoryFeatureStore || false,
			isActive: values.isActive || false,
		};

		console.log("Store Payload:", payload);
		onAddStore(payload);
		form.resetFields();
		onClose();
	};

	return (
		<GenericModal
			onClose={onClose}
			show={isVisible}
			title="Add New Store"
			width={900}
			onOk={() => form.validateFields().then(handleSubmit)}
			maskClosable={false}
		>
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
                    </Panel>
                </Collapse>
			</Form>
		</GenericModal>
	);
};

const UpdateUserModal: React.FC<any> = ({ isVisible, onClose, onUpdateStore, selectedStore }) => {
	console.log("selectedStore:::", selectedStore)
	const [form] = Form.useForm();
	const { Panel } = Collapse;

	useEffect(() => {
		if (selectedStore) {
			form.setFieldsValue(selectedStore);
		} else {
			form.resetFields();
		}
	}, [selectedStore, form]);
	console.log("====>", form.getFieldsValue())
	const handleSubmit = (values: any) => {
		const payload = {
			...values,
			isPopularStore: values.isPopularStore || false,
			isFeatureStore: values.isFeatureStore || false,
			isCategoryFeatureStore: values.isCategoryFeatureStore || false,
			isActive: values.isActive || false,
		};

		console.log("Store Payload:", payload);
		onUpdateStore(payload);
		form.resetFields();
		onClose();
	};

	return (
		<GenericModal
			onClose={onClose}
			show={isVisible}
			title="Add New Store"
			width={900}
			onOk={() => form.validateFields().then(handleSubmit)}
			maskClosable={false}
		>
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
                    </Panel>
                </Collapse>
			</Form>
		</GenericModal>
	);
};
