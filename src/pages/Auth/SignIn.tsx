import { Button, Form } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import Typography from "../../components/UI/Typography"
import { useLoginMutation } from "../../redux/slices/auth"
import { setCredentials, setTheme } from "../../redux/features/authSlice"
import { useDispatch } from "react-redux"
import { getErrorMessage, setThemeInLS, setUser } from "../../utils/helper"
import InputField from "../../components/Form/InputField"
import STRINGS from "../../utils/strings"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import useNotification from "../../components/UI/Notification"
import axios from "axios"
import IMAGES from "../../assets/images"

function Index() {
  const { openNotification, contextHolder } = useNotification()
  const dispatch = useDispatch()
  const [_login, { isLoading: isLoginLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    dispatch(setTheme("LIGHT"))
    setThemeInLS("LIGHT")
    try {
      axios
        .post("http://localhost:3000/users/login", values)
        .then((response) => {
          console.log("response:::", response)
          // return
          // return
          const obj = {
            id: response?.data?.userId,
            isActive: true,
            email: values?.email,
            fullName: response?.data?.fullName,
            role: response?.data?.role,
            user_permissions: response?.data?.user_permissions,
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaGFmaXFzaWRkaXFAZ21haWwuY29tIiwiZXhwIjoxNzQxMTk1ODE5fQ.E6V2RmZiia0fSrIUqyN5YPtFrOqcNKDyKaBa6hLOYH8",
          }
          const newObj = { ...obj, access_token: response?.data?.accessToken }
          console.log("newObj:::", newObj)
          setUser(newObj as any)
          dispatch(setCredentials(newObj))
          navigate("/")
          openNotification({
            type: "success",
            title: "Login Success",
          })
        })
        .catch((err) => {
          console.log("err:::", err)
          openNotification({
            type: "error",
            title: getErrorMessage(err),
          })
        })
    } catch (error: unknown) {
      console.log(error, "ERROR")
    }
  }

  return (
    <>
      {contextHolder}

      <div className="min-h-screen w-full relative">
        {/* Background - Solid green instead of image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#7FA842",
          }}
        />

        <div className="relative z-10 min-h-screen">
          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden w-full bg-black/30 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-3">
              <img src={IMAGES.LiveoffLogo || "/placeholder.svg"} alt="LiveOff Logo" className="h-8" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex min-h-[calc(100vh-64px)] lg:min-h-screen">
            {/* Left Content - Hidden on small screens */}
            <div
              className="hidden lg:flex lg:w-[60%] xl:w-[65%] items-center justify-center p-8"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <div className="max-w-2xl flex flex-col items-center justify-center">
                <img src={IMAGES.LiveoffLogo || "/placeholder.svg"} alt="LiveOff Logo" className="w-64 mb-8" />
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-[40%] xl:w-[35%] flex items-center justify-center p-4">
              <div className="w-full max-w-md">
                <div className="backdrop-blur-md rounded-2xl p-6 lg:p-8 bg-white/20 shadow-lg">
                  {/* Logo and Title - Different versions for mobile and desktop */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white mb-4">
                      <img src={IMAGES.LiveoffLogo || "/placeholder.svg"} alt="LiveOff Logo" className="h-16" />
                    </div>
                    <Typography
                      variant="headingOneLight"
                      noMargin
                      className="text-center justify-center text-white text-xl lg:text-2xl font-bold"
                    >
                      {/* Different text for mobile and desktop */}
                      <span className="lg:hidden">Welcome Back</span>
                      <span className="hidden lg:block">LiveOff Coupon Portal</span>
                    </Typography>
                    <p className="text-white/90 mt-2 text-sm lg:text-base">Sign in to access your dashboard</p>
                  </div>

                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <InputField
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: `${STRINGS.EMAIL} is required`,
                        },
                      ]}
                      autoComplete="off"
                      inputPrefix={<UserOutlined className="text-white/80" />}
                      placeholder={STRINGS.EMAIL}
                      inputType="input"
                      itemClassName="!bg-white/20 !border-0 !text-white placeholder:text-white/80 h-12 !rounded-lg"
                    />

                    <InputField
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: `${STRINGS.PASSWORD} is required`,
                        },
                      ]}
                      autoComplete="off"
                      placeholder={STRINGS.PASSWORD}
                      inputType="password"
                      inputPrefix={<LockOutlined className="text-white/80" />}
                      margin="small"
                      itemClassName="!bg-white/20 !border-0 !text-white placeholder:text-white/80 h-12 !rounded-lg"
                    />

                    <Button
                      type="link"
                      htmlType="submit"
                      size="large"
                      className="text-[#ffffff] w-full mt-6 !h-12 !bg-[#629516] hover:!bg-[#7fa842] !border-0  font-medium !text-white shadow-lg !rounded-lg"
                      disabled={isLoginLoading}
                      loading={isLoginLoading}
                      style={{color:'white'}}
                    >
                      Sign In to Dashboard
                    </Button>

                    <div className="text-center mt-6">
                      <p className="text-white/80 text-sm">© 2025 LiveOff Coupon Platform</p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Index

