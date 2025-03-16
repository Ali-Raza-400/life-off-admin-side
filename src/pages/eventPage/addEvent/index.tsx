"use client"

import { Form, Input, Select, Card, Typography, Checkbox, DatePicker, Row, Col } from "antd"
import { useState } from "react"
import GenericButton from "../../../components/UI/GenericButton"
import { useSaveEventMutation } from "../../../redux/slices/event"
import { useGetMyStoresQuery } from "../../../redux/slices/store"
import { useGetCouponsQuery } from "../../../redux/slices/coupons"
import { useNavigate } from "react-router-dom"
import PATH from "../../../navigation/Path"
import useNotification from "../../../components/UI/Notification"
import useGenericAlert from "../../../components/Hooks/GenericAlert"

const { Title, Paragraph } = Typography
const { TextArea } = Input

interface EventDealFormValues {
  title: string
  descriptionHeading: string
  description: string
  extraDescriptionHeading: string
  extraDescriptionContent: string
  startDate: any // Changed to any to handle DatePicker value
  endDate: any // Changed to any to handle DatePicker value
  bannerImage: string
  metaDescription: string
  seoKeywords: string[]
  isFeatured: boolean
  isTrending: boolean
  viewCount: number
  termsAndConditions: string
  storeIds: string // Changed from storeIds to match your form field
  couponIds: string[]
}

export default function CreateEventDeal() {
  const [form] = Form.useForm<EventDealFormValues>()
  const [isLoading, setIsLoading] = useState(false)
  const [saveEvent] = useSaveEventMutation()
  const { data: myStore } = useGetMyStoresQuery({})
  const { data: myCoupon } = useGetCouponsQuery({})
  const { openNotification, contextHolder } = useNotification()
  const { showAlert } = useGenericAlert()
  const navigate = useNavigate()

  const handleAddEventDeal = async (eventData: any) => {
    console.log("eventData in handleAddEventDeal:", eventData)

    setIsLoading(true)
    try {
      const response = await saveEvent(eventData).unwrap()
      console.log("Response from saveEvent:", response)

      showAlert({
        type: "success",
        title: "Event Created Successfully!",
        message: "The event has been created successfully.",
        confirmButtonText: "OK",
        onConfirm: () => navigate(PATH.VIEW_EVENTS),
      })

      form.resetFields()
    } catch (error: any) {
      console.error("Error creating event:", error)

      openNotification({
        type: "error",
        title: error?.data?.message || "Failed to create event. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (values: EventDealFormValues) => {
    console.log("Form values in handleSubmit:", values)

    // Format dates for API
    const formattedValues = {
      ...values,
      // Handle the DatePicker values properly
      startDate: values.startDate ? values.startDate.format("YYYY-MM-DD") : undefined,
      endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : undefined,
      viewCount: Number(values.viewCount) || 0,
      // Set default values for checkboxes if they're undefined
      isFeatured: values.isFeatured || false,
      isTrending: values.isTrending || false,
    }

    console.log("Formatted values:", formattedValues)
    handleAddEventDeal(formattedValues)
  }

  return (
    <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Create New Event/Deal
          </Title>
          <Paragraph type="secondary">Fill in the details to publish a new promotional event or deal</Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          className="space-y-4"
          initialValues={{
            isFeatured: false,
            isTrending: false,
            viewCount: 0,
          }}
        >
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-base font-medium mb-3">Basic Information</h3>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="title" label="Event Title" rules={[{ required: true, message: "Title is required" }]}>
                  <Input size="large" placeholder="Christmas Deals 2025" style={{ height: "40px" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="startDate"
                  label="Start Date"
                  rules={[{ required: true, message: "Start date is required" }]}
                >
                  <DatePicker size="large" style={{ width: "100%", height: "40px" }} format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="endDate"
                  label="End Date"
                  rules={[{ required: true, message: "End date is required" }]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%", height: "40px" }}
                    format="YYYY-MM-DD"
                    disabledDate={(current) => {
                      const startDate = form.getFieldValue("startDate")
                      return startDate ? current && current.isBefore(startDate, "day") : false
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="bannerImage"
                  label="Banner Image URL"
                  rules={[{ required: true, message: "Banner image URL is required" }]}
                >
                  <Input size="large" placeholder="https://example.com/banner.jpg" style={{ height: "40px" }} />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Description Section */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-base font-medium mb-3">Description</h3>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="descriptionHeading"
                  label="Description Heading"
                  rules={[{ required: true, message: "Description heading is required" }]}
                >
                  <Input size="large" placeholder="Christmas Deals 2025" style={{ height: "40px" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Main Description"
                  rules={[{ required: true, message: "Description is required" }]}
                >
                  <TextArea rows={4} placeholder="Undoubtedly the biggest shopping holiday..." />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="extraDescriptionHeading" label="Extra Description Heading">
                  <Input size="large" placeholder="What Does Size-Inclusive Mean?" style={{ height: "40px" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="extraDescriptionContent" label="Extra Description Content">
                  <TextArea rows={4} placeholder="If savings are in, we predict that you will succeed..." />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* SEO Section */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-base font-medium mb-3">SEO Information</h3>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="metaDescription"
                  label="Meta Description"
                  rules={[
                    { required: true, message: "Meta description is required" },
                    { max: 160, message: "Meta description should not exceed 160 characters" },
                  ]}
                >
                  <TextArea rows={3} placeholder="Get the best Christmas deals of 2025" showCount maxLength={160} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="seoKeywords"
                  label="SEO Keywords"
                  rules={[{ required: true, message: "At least one SEO keyword is required" }]}
                >
                  <Select
                    mode="tags"
                    placeholder="Add keywords (press Enter after each)"
                    style={{ width: "100%" }}
                    tokenSeparators={[","]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-base font-medium mb-3">Additional Information</h3>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="termsAndConditions" label="Terms and Conditions">
                  <TextArea rows={3} placeholder="Limited to the first 500 customers" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="viewCount" label="Initial View Count">
                  <Input type="number" size="large" placeholder="5000" style={{ height: "40px" }} />
                </Form.Item>
              </Col>
              <Col span={12} className="flex items-center pt-8">
                <Form.Item name="isFeatured" valuePropName="checked" className="mb-0 mr-6">
                  <Checkbox>Featured</Checkbox>
                </Form.Item>
                <Form.Item name="isTrending" valuePropName="checked" className="mb-0">
                  <Checkbox>Trending</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </div>

          {/* Relationships */}
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-base font-medium mb-3">Related Items</h3>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="storeIds" label="Store" rules={[{ required: true, message: "Store is required" }]}>
                  <Select
                    mode="multiple"
                    placeholder="Select Store"
                    style={{ width: "100%" }}
                    options={(myStore?.list || []).map((store: any) => ({
                      value: store.id,
                      label: store.name,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  name="couponIds"
                  label="Related Coupons"
                  rules={[{ required: true, message: "At least one coupon is required" }]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select coupons"
                    style={{ width: "100%" }}
                    options={(myCoupon?.list || []).map((coupon: any) => ({
                      value: coupon.id,
                      label: coupon.name,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="flex justify-end pt-4">
            <GenericButton
              htmlType="submit"
              disabled={isLoading}
              loading={isLoading}
              label="Create Event/Deal"
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

