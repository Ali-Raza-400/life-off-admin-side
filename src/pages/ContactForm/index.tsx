import { Form, Input, Select, Button, Checkbox } from "antd"
import { FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa"
import IMAGES from "../../assets/images"

const { TextArea } = Input

const ContactForm = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Form values:", values)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Form */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Ready to{" "}
            <span className="relative">
              Leap Forward
              <span className="absolute bottom-1 left-0 w-full h-1 bg-orange-400"></span>
            </span>
            ?
          </h1>

          <p className="text-gray-600 mb-8">
            At Kangaroo Ventures, we're here to support your business journey every step of the way. Whether you're
            looking for answers, need support, or are ready to get started, our team is eager to connect with you.
          </p>

          <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input className="w-full p-2 border rounded" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input className="w-full p-2 border rounded" />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input className="w-full p-2 border rounded" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please enter your phone number" }]}
            >
              <Input className="w-full p-2 border rounded" />
            </Form.Item>

            <Form.Item
              name="service"
              label="Choose a service"
              rules={[{ required: true, message: "Please select a service" }]}
            >
              <Select className="w-full">
                <Select.Option value="virtual-office">Virtual Office Spaces</Select.Option>
                <Select.Option value="meeting-rooms">Meeting Rooms</Select.Option>
                <Select.Option value="coworking">Coworking Spaces</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <TextArea rows={4} className="w-full p-2 border rounded" />
            </Form.Item>

            <Form.Item>
              <Checkbox required>
                I agree to the{" "}
                <a href="/privacy" className="text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Checkbox required>
                I agree to the{" "}
                <a href="/terms" className="text-orange-500 hover:text-orange-600">
                  Terms and Conditions
                </a>
              </Checkbox>
            </Form.Item>

            {/* reCAPTCHA would go here */}
            <div className="mb-4">
              {/* Replace with actual reCAPTCHA component */}
              <div className="border rounded p-4 bg-gray-50 text-center text-gray-500">reCAPTCHA</div>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right Column - Contact Info & Image */}
        <div className="lg:pl-12">
          <div className="mb-12">
            <img
              src={IMAGES.CONTACT_FORM||"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-siETTN6vlv4sQz0uai8CGLh4SjRFwJ.png"}
              alt="Contact illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-orange-500 text-xl" />
              <div>
                <p className="font-semibold">+1 (716) 327-6875</p>
                <p className="text-gray-600 text-sm">
                  Available from 10:00AM - 6:00PM EST
                  <br />
                  Monday to Friday
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-orange-500 text-xl" />
              <p className="font-semibold">info@kangarooventures</p>
            </div>

            <div>
              <p className="text-gray-600 mb-3">Follow us</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-500">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm

