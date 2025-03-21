"use client"

import { Form, Input, Select, Card, Typography, Checkbox } from "antd"
import GenericButton from "../../../components/UI/GenericButton"
import { useSaveBlogsMutation } from "../../../redux/slices/blog"
import PATH from "../../../navigation/Path"
import { useNavigate } from "react-router-dom"
import { useGetCategoriesQuery } from "../../../redux/slices/category"
import useGenericAlert from "../../../components/Hooks/GenericAlert"
import useNotification from "../../../components/UI/Notification"
import { useSelector } from "react-redux"

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
  // No author field in the form values since we'll get it from Redux
}

export default function CreateBlog() {
  const [form] = Form.useForm<BlogFormValues>()
  const [saveBlogs, { isLoading }] = useSaveBlogsMutation()
  const { data: categoryList } = useGetCategoriesQuery({})
  const navigate = useNavigate()
  const { showAlert } = useGenericAlert()
  const { openNotification, contextHolder } = useNotification()

  // Get the current user from Redux store
  const currentUser = useSelector((state: any) => state.auth.user)

  const handleAddBlog = async (blogData: BlogFormValues) => {
    try {
      // Change "authorId" to "author" to match the backend DTO
      const blogWithAuthor = {
        ...blogData,
        // authorId: currentUser.id, // Changed from "authorId" to "author"
        isFeatured: blogData.isFeatured || false,
        isTrending: blogData.isTrending || false,
      }

      console.log("Blog data submitted:", blogWithAuthor)
      // return

      // Use unwrap() to properly handle the promise
      const response = await saveBlogs(blogWithAuthor).unwrap()
      console.log("Blog creation response:", response)

      // Show success message
      showAlert({
        type: "success",
        title: "Blog Created Successfully!",
        message: "Your blog post has been published.",
        confirmButtonText: "OK",
        onConfirm: () => {
          form.resetFields()
          navigate(PATH.VIEW_BLOG)
        },
      })
    } catch (error: any) {
      console.error("Error creating blog:", error)

      // Show error notification
      openNotification({
        type: "error",
        title: error?.data?.message || "Failed to create blog. Please try again.",
      })
    }
  }

  const handleSubmit = (values: BlogFormValues) => {
    handleAddBlog(values)
  }

  return (
    <Card bordered={false} className="w-full max-w-4xl mx-auto shadow-lg p-6 rounded-lg">
      {contextHolder}
      <div>
        <div className="mb-6">
          <Title level={3} style={{ margin: 0, marginBottom: "8px" }}>
            Create New Blog Post
          </Title>
          <Paragraph type="secondary">
            Fill in the details to publish a new blog post
            {currentUser && <span className="ml-2 text-blue-500">(Publishing as: {currentUser.name})</span>}
          </Paragraph>
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
          }}
        >
          <Form.Item<BlogFormValues>
            name="title"
            label="Blog Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input size="large" style={{ height: "40px" }} placeholder="Enter blog title" />
          </Form.Item>

          <Form.Item<BlogFormValues>
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select
              placeholder="Select Category"
              size="large"
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: "200px" }}
            >
              {(categoryList?.list || []).map((category: any) => (
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
            <Input
              addonBefore="Image URL"
              placeholder="https://example.com/image.jpg"
              size="large"
              style={{ height: "40px" }}
            />
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
              disabled={isLoading}
              loading={isLoading}
              label={isLoading ? "Publishing..." : "Publish Blog"}
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

