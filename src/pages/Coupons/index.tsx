import { Checkbox, Col, DatePicker, Flex, Form, Input, Row, Select, TableProps } from "antd";
import GenericTable from "../../components/UI/GenericTable"
import ActionDropdown from "../../components/UI/ActionDropdown";
import { useDeleteCouponMutation, useGetCouponsQuery, useSaveCouponMutation } from "../../redux/slices/coupons";
import GenericModal from "../../components/UI/GenericModal";
import { getErrorMessage } from "../../utils/helper";
import useNotification from "../../components/UI/Notification";
import { useState } from "react";
import useGenericAlert from "../../components/Hooks/GenericAlert";
import TextArea from "antd/es/input/TextArea";
import GenericButton from "../../components/UI/GenericButton";
import { FaPlus } from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/slices/product";
import { useGetMyStoresQuery } from "../../redux/slices/store";

const Index = () => {
    const { data, refetch } = useGetCouponsQuery({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log("data::::", data)
    const { openNotification } = useNotification()
    const { showAlert } = useGenericAlert();
    const [form] = Form.useForm();
    const [saveCoupon] = useSaveCouponMutation()
    const [deleteCoupon] = useDeleteCouponMutation()

    const onDelete = async (id: string) => {
        console.log("id:::", id);
        // return

        showAlert({
            type: "question",
            title: `Delete Coupon Confirmation`,
            message: `Are you sure you want to delete this coupon? This action cannot be undone.`,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            onConfirm: async () => {
                try {
                    await deleteCoupon(id).unwrap(); // Ensures better error handling
                    showAlert({
                        type: "success",
                        title: `Coupon Deleted Successfully`,
                        message: `The coupon has been deleted successfully.`,
                    });
                    refetch()
                } catch (error) {
                    showAlert({
                        type: "error",
                        title: `Failed to Delete Coupon`,
                        message: `An error occurred while deleting the coupon. Please try again.`,
                    });
                }
            },
        });
    };


    const columns: TableProps<any>["columns"] = [
        {
            title: "Coupon Name",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Coupon Code",
            dataIndex: "code",
            key: "code",
            width: 150,
            render: (code) => <strong>{code}</strong>,
        },
        {
            title: "Store Name",
            dataIndex: ["store", "name"],
            key: "storeName",
            width: 200,
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 150,
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            width: 150,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Verified?",
            dataIndex: "isVerified",
            key: "isVerified",
            width: 100,
            render: (isVerified) => (isVerified ? "Yes" : "No"),
        },
        {
            title: "Coupon Link",
            dataIndex: "htmlCodeUrl",
            key: "htmlCodeUrl",
            width: 200,
            render: (url) => (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    View Coupon
                </a>
            ),
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 120,
            render: (coupon) => (
                <ActionDropdown
                    // editOnClick={() => onEdit(coupon)}
                    deleteOnClick={() => onDelete(coupon?.id)}
                />
            ),
        },
    ];

    const handleAddCoupon = async (userData: any) => {
        const payload = {
            ...userData,
        }
        try {
            await saveCoupon(payload).unwrap();
            showAlert({
                type: "success",
                title: "Coupon Added!",
                message: "The coupon has been added successfully.",
                confirmButtonText: "OK",
                onConfirm: () => refetch(),
            });
            setIsModalVisible(false)
            form.resetFields();
        } catch (error: unknown) {
            openNotification({
                type: "error",
                title: getErrorMessage(error),
            });
        }
    };

    return (
        <>
            <Flex className="justify-end mb-4">

                <GenericButton
                    icon={<FaPlus size={20} />}
                    label="Create New Store"
                    onClick={() => setIsModalVisible(true)}
                />
                <AddCouponModal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onAddCoupon={handleAddCoupon}
                    form={form}
                />
            </Flex>
            <GenericTable loading={false} columns={columns} data={data ? data.list : []} />
        </>
    )
}

export default Index

const AddCouponModal: React.FC<any> = ({ isVisible, onClose, onAddCoupon, form }) => {
    const { data: productsData } = useGetProductsQuery({})
    const { data: myStore } = useGetMyStoresQuery({})
    console.log("myStore:::", myStore)

    const handleSubmit = (values: any) => {
        console.log("values:::", values)
        const payload = {
            name: values.name,
            detail: values.detail,
            code: values.code,
            htmlCodeUrl: values.htmlCodeUrl,
            startDate: values.startDate,
            endDate: values.endDate,
            category: values.category,
            rank: Number(values.rank), // Convert to number
            isFreeShipping: values.isFreeShipping || false,
            isExclusive: values.isExclusive || false,
            isVerified: values.isVerified || false,
            showOnHomePage: values.showOnHomePage || false,
            isTopCategory: values.isTopCategory || false,
            mainImage: values.mainImage,
            secondaryImage: values.secondaryImage,
            codeImage: values.codeImage,
            isActive: values.isActive || false,
            storeId: values?.storeId || '', // Ensure it's not empty
            productIds: values?.productIds || []
        };
        // return
        onAddCoupon(payload);
        // form.resetFields();
    };

    return (
        <GenericModal
            onClose={onClose}
            show={isVisible}
            title="Add New Coupon"
            width={900}
            onOk={() => form.validateFields().then(handleSubmit)}
            maskClosable={false}
        >
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    {/* Name */}
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input placeholder="€350 De Reduction Promo" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>

                    {/* Detail */}
                    <Col span={12}>
                        <Form.Item
                            name="detail"
                            label="Detail"
                            rules={[{ required: true, message: "Detail is required" }]}
                        >
                            <TextArea rows={2} placeholder="Christmas Sale! Get up to €350 off..." />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    {/* Promo Code */}
                    <Col span={12}>
                        <Form.Item
                            name="code"
                            label="Promo Code"
                            rules={[{ required: true, message: "Promo Code is required" }]}
                        >
                            <Input placeholder="SAVE350" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>

                    {/* HTML Code URL */}
                    <Col span={12}>
                        <Form.Item
                            name="htmlCodeUrl"
                            label="HTML Code URL"
                            rules={[{ required: true, message: "HTML Code URL is required" }]}
                        >
                            <Input placeholder="https://clk.tradedoubler.com/..." style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    {/* Start Date */}
                    <Col span={12}>
                        <Form.Item
                            name="startDate"
                            label="Start Date"
                            rules={[{ required: true, message: "Start Date is required" }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format="YYYY-MM-DD"
                                onChange={() => form.setFieldsValue({ endDate: null })} // Reset endDate if startDate changes
                            />
                        </Form.Item>
                    </Col>

                    {/* End Date */}
                    <Col span={12}>
                        <Form.Item
                            name="endDate"
                            label="End Date"
                            rules={[{ required: true, message: "End Date is required" }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                format="YYYY-MM-DD"
                                // disabled={!form.getFieldValue('startDate')}
                                disabledDate={(current) => {
                                    const startDate = form.getFieldValue('startDate');
                                    return startDate ? current && current.isBefore(startDate, 'day') : false;
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    {/* Category */}
                    <Col span={12}>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: "Category is required" }]}
                        >
                            <Input placeholder="Electronics" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>

                    {/* Rank */}
                    <Col span={12}>
                        <Form.Item
                            name="rank"
                            label="Rank"
                            rules={[{ required: true, message: "Rank is required" }]}
                        >
                            <Input type="number" placeholder="2" style={{ height: 45 }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    {/* Products */}
                    <Col span={12}>
                        <Form.Item
                            name="productIds"
                            label="Products"
                            rules={[{ required: true, message: "At least one product is required" }]}
                        >
                            <Select
                                mode="tags"
                                placeholder="Select Products"
                                style={{ width: '100%' }}
                                tokenSeparators={[',']}
                                options={(productsData?.list || []).map((product: any) => ({
                                    value: product.id,
                                    label: product.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>

                    {/* Store */}
                    <Col span={12}>
                        <Form.Item
                            name="storeId"
                            label="Store"
                            rules={[{ required: true, message: "Store is required" }]}
                        >
                            <Select
                                placeholder="Select Store"
                                style={{ width: '100%' }}
                                options={(myStore?.list || []).map((store: any) => ({
                                    value: store.id,
                                    label: store.name,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    {/* Free Shipping */}
                    <Col span={6}>
                        <Form.Item name="isFreeShipping" valuePropName="checked">
                            <Checkbox>Free Shipping</Checkbox>
                        </Form.Item>
                    </Col>

                    {/* Exclusive */}
                    <Col span={6}>
                        <Form.Item name="isExclusive" valuePropName="checked">
                            <Checkbox>Exclusive</Checkbox>
                        </Form.Item>
                    </Col>

                    {/* Verified */}
                    <Col span={6}>
                        <Form.Item name="isVerified" valuePropName="checked">
                            <Checkbox>Verified</Checkbox>
                        </Form.Item>
                    </Col>

                    {/* Active */}
                    <Col span={6}>
                        <Form.Item name="isActive" valuePropName="checked">
                            <Checkbox>Active</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        </GenericModal>

    );
};