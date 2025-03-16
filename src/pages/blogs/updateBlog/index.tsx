"use client"

import { Form, Input, Select, Card, Typography, Checkbox, Spin } from "antd"
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import GenericButton from "../../../components/UI/GenericButton"
import { useGetCategoriesQuery } from "../../../redux/slices/category"
import { useGetSingleBlogQuery, useUpdateBlogMutation } from "../../../redux/slices/blog"
import PATH from "../../../navigation/Path"
import useGenericAlert from "../../../components/Hooks/GenericAlert"
import useNotification from "../../../components/UI/Notification"
import { getErrorMessage } from "../../../utils/helper"

const { Title, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

interface BlogFormValues {
  title: string
  content: string
  featuredImage: string
  metaDescription: string
  isFeatured: boolean
  isTrending: boolean
  categoryId: string
  author: string
}

export default function UpdateBlog() {
  const [form] = Form.useForm<BlogFormValues>()
  const { id: blogId } = useParams()
  const navigate = useNavigate()
  const { showAlert } = useGenericAlert()
  const { openNotification, contextHolder } = useNotification()

  // Fetch categories
  const { data: categoryList, isLoading: isCategoriesLoading } = useGetCategoriesQuery({})

  // Fetch blog details
  const { data: blogData, isFetching: isFetchingBlog } = useGetSingleBlogQuery(blogId, {
    skip: !blogId, // Skip API call if blogId is not available
  })

  // Update blog mutation
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation()

  // Populate form with existing blog data when fetched
  useEffect(() => {
    if (blogData) {
      form.setFieldValue('categoryId', blogData?.list?.category?.id)
      form.setFieldsValue(blogData.list)
    }
  }, [blogData, form])

  // Handle update blog
  const handleUpdateBlog = async (values: BlogFormValues) => {
    try {
      const payload = {
        ...values
      }
      await updateBlog({ id: blogId, payload }).unwrap()
      showAlert({
        type: "success",
        title: "Blog Updated Successfully!",
        message: "Your blog post has been updated.",
        confirmButtonText: "OK",
        onConfirm: () => navigate(PATH.VIEW_BLOG),
      })
    } catch (error) {
      console.error("Error updating blog:", error)
      openNotification({
        type: "error",
        title: getErrorMessage(error) || "Failed to update blog. Please try again.",
      })
    }
  }

  if (isFetchingBlog || isCategoriesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading blog data..." />
      </div>
    )
  }

  if (!blogId) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-red-500">Error</h2>
        <p className="mt-2">Blog ID is missing. Please provide a valid blog ID.</p>
      </div>
    )
  }

  return (
    <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Update Blog Post
          </Title>
          <Paragraph type="secondary">Edit the details of your blog post</Paragraph>
        </div>

        <Form form={form} layout="vertical" onFinish={handleUpdateBlog} requiredMark="optional" className="space-y-4">
          <Form.Item<BlogFormValues>
            name="title"
            label="Blog Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<BlogFormValues>
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select Category" size="large" style={{ width: "100%" }}>
              {categoryList?.list.map((category: any) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<BlogFormValues>
            name="content"
            label="Blog Content"
            rules={[{ required: true, message: "Content is required" }]}
          >
            <TextArea rows={6} placeholder="Write your blog content here..." />
          </Form.Item>

          <Form.Item<BlogFormValues>
            name="metaDescription"
            label="Meta Description"
            rules={[
              { required: true, message: "Meta description is required" },
              { max: 160, message: "Meta description should not exceed 160 characters" },
            ]}
          >
            <TextArea rows={3} placeholder="Brief description for SEO (max 160 characters)" showCount maxLength={160} />
          </Form.Item>

          <Form.Item<BlogFormValues>
            name="featuredImage"
            label="Featured Image"
            rules={[{ required: true, message: "Featured image is required" }]}
          >
            <Input addonBefore="Image URL" placeholder="https://example.com/image.jpg" size="large" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item<BlogFormValues> name="isFeatured" valuePropName="checked">
              <Checkbox>Featured Post</Checkbox>
            </Form.Item>

            <Form.Item<BlogFormValues> name="isTrending" valuePropName="checked">
              <Checkbox>Trending Post</Checkbox>
            </Form.Item>
          </div>

          <div className="flex justify-end pt-4">
            <GenericButton
              htmlType="submit"
              disabled={isUpdating}
              className="h-11 min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
              label={isUpdating ? "Updating..." : "Update Blog"}
            />
          </div>
        </Form>
      </div>
    </Card>
  )
}
