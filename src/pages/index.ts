import React from "react";

const LOGIN = React.lazy(() => import("./Auth/SignIn"));
const OTP_SCREEN = React.lazy(() => import("./Auth/OptScreen"));
const SIGNUP = React.lazy(() => import("./Auth/SignUp"));
const INSTITUTE_SIGNUP = React.lazy(() => import("./Auth/InstititeSignUp"));
const FORGOT_PASSWORD = React.lazy(() => import("./Auth/ForgotPassword"));
const UPDATE_PASSWORD = React.lazy(() => import("./Auth/UpdatePassword"));
const ITEM_DASHBOARD = React.lazy(() => import("./ItemDashboard"));
const NO_PAGE_FOUND = React.lazy(() => import("./NoPageFound"));
const NO_ACCESS = React.lazy(() => import("./NoAccess"));

const INSTITUTE_PROFILE = React.lazy(() => import("./Institute/Profile/Index"));
const REGISTRATION_REQUEST = React.lazy(
	() => import("./Institute/Requests/Registration/index")
);
const COURSE_REQUEST = React.lazy(
	() => import("./Institute/Requests/Courses/index")
);
const MANAGE_STUDENTS = React.lazy(
	() => import("./Institute/ManageStudents/Index")
);
const ADD_USER = React.lazy(
	() => import("./Institute/ManageStudents/createUser")
);
const INSTITUTE_SETTINGS = React.lazy(
	() => import("./Institute/Settings/Index")
);

//Manage-Teacher
const MANAGE_TEACHER = React.lazy(() => import("./ManageTeachers/Index"));
const MANAGE_OPRATION = React.lazy(() => import("./ManageOprations/Index"));
const MANAGE_OPRATION_CREATE = React.lazy(() => import("./ManageOprations/Create"));
const MANAGE_OPRATION_UPDATE = React.lazy(() => import("./ManageOprations/Update"));
const STUDENTS = React.lazy(() => import("./ManageTeachers/Students/index"));
const MANAGE_TEACHER_CREATE = React.lazy(
	() => import("./ManageTeachers/Create")
);
const TEACHER_PROFILE = React.lazy(
	() => import("./ManageTeachers/Profile/Index")
);
const ADMIN_DASHBOARD = React.lazy(
	() => import("./dashboard/admin/index")
);
const USER_DASHBOARD = React.lazy(
	() => import("./dashboard/user/index")
);
const TEACHER_STUDENT_PROFILE_VIEW = React.lazy(
	() => import("../pages/Finance/Earnings/StudentsWise/View")
); 

//Finance
const COUPONS = React.lazy(() => import("./Finance/Coupons/Index"));
const COUPONS_CREATE = React.lazy(
	() => import("./Finance/Coupons/CreateUpdate")
);
const EARNINGS = React.lazy(() => import("./Finance/Earnings/Index"));
const VIEW_EARNINGS = React.lazy(
	() => import("./Finance/Earnings/CourseWise/View")
);
const STUDENTS_EARNINGS = React.lazy(
	() => import("./Finance/Earnings/StudentsWise/View")
);
const STUDENT_PROFILE = React.lazy(
	() => import("../pages/Students/Profile/Index")
);
const STUDENT_DASHBOARD = React.lazy(
	() => import("../pages/Students/Dashboard/Index")
);
const STUDENT_QUIZZES = React.lazy(() => import("./Students/Quizzes/Index"));
const STUDENT_ASSIGNMENTS = React.lazy(
	() => import("./Students/Assignments/Index")
);
const STUDENT_GRADE_QUIZZES = React.lazy(
	() => import("./Students/Grades/Quizzes/Index")
);
const STUDENT_GRADE_ASSIGNMENTS = React.lazy(
	() => import("./Students/Grades/Assignments/Index")
);
const STUDENT_COURSE_VIEW = React.lazy(
	() => import("../pages/Students/Courses/ContentView/Index")
);
const STUDENT_ENROLLED_COURSES = React.lazy(
	() => import("../pages/Students/Courses/EnrolledCourses/Index")
);
const MANAGE_PRODUCTS = React.lazy(
	() => import("../pages/Products/index")
);
const MANAGE_COUPONS = React.lazy(
	() => import("../pages/Coupons/index")
);


//Courses
const STORES = React.lazy(() => import("./ManageStores/Index"));
const VIEW_BLOG = React.lazy(() => import("./blogs/index"));
const SINGLE_BLOG = React.lazy(() => import("./blogs/singleBlog/index"));
const ALL_BLOGS = React.lazy(() => import("./blogs/View/index"));
const ADD_BLOG = React.lazy(() => import("./blogs/addblogs/index"));
const UPDATE_BLOG = React.lazy(() => import("./blogs/updateBlog/index"));
const ADD_CATEGORY = React.lazy(() => import("./categories/addcategories/index"));
const VIEW_CATEGORY = React.lazy(() => import("./categories/index"));
const ADD_NETWORK = React.lazy(() => import("./networks/addnetworks/index"));
const VIEW_NETWORK = React.lazy(() => import("./networks/index"));
const ADD_STORE = React.lazy(() => import("./ManageStores/create/index"));
const SINGLE_STORE = React.lazy(() => import("./ManageStores/singleStore"));
const SINGLE_EVENT = React.lazy(() => import("./eventPage/singleEvent/index"));
const VIEW_EVENTS = React.lazy(() => import("./eventPage/Index"));
const ADD_EVENT = React.lazy(() => import("./eventPage/addEvent/index"));
const VIEW_DEALS = React.lazy(() => import("./Deals/index"));
const ALL_CATEGORY = React.lazy(() => import("./categories/AllCategories/index"));
const SINGLE_CATEGORY = React.lazy(() => import("./categories/singleCategory/index"));
const TERMS_CONDITIONS = React.lazy(() => import("./TermsAndConditions/index"));
const PRIVACY_POLICY = React.lazy(() => import("./PrivacyPolicy/index"));
const EDIT_PRIVACY_POLICY= React.lazy(() => import("./PrivacyPolicy/edit/index"));
const EDIT_TERM_AND_CONDITIONS= React.lazy(() => import("./TermsAndConditions/edit/index"));
const CONTACT_FORM = React.lazy(() => import("./ContactForm/index"));
const COURSE_VIEW = React.lazy(() => import("./Courses/View/View"));
const NEW_COURSE = React.lazy(() => import("./Courses/Generate/Index"));
const SHIPPING_PAGE_VIEW = React.lazy(() => import("./shipping/view/index"));
const SHIPPING_PAGE_ALL = React.lazy(() => import("./shipping/index"));
const STUDENT_COURSES_LIST = React.lazy(
	() => import("./Students/Courses/Index")
);

const CLOSED = React.lazy(() => import("./Auth/ClosedScreen"));
// APP PAGES
const WEB_PAGES = {
	// AUTH PAGES
	UPDATE_BLOG,
	LOGIN,
	SIGNUP,
	INSTITUTE_SIGNUP,
	FORGOT_PASSWORD,
	UPDATE_PASSWORD,
	MANAGE_PRODUCTS,
	MANAGE_COUPONS,
	SINGLE_STORE,
	SINGLE_CATEGORY,
	ALL_CATEGORY,
	SINGLE_EVENT,
	VIEW_EVENTS,
	ADD_EVENT,
	TERMS_CONDITIONS,
	PRIVACY_POLICY,
	EDIT_PRIVACY_POLICY,
	EDIT_TERM_AND_CONDITIONS,
	CONTACT_FORM,
	// PROTECTED PAGES
	ITEM_DASHBOARD,
	VIEW_DEALS,
	SHIPPING_PAGE_VIEW,
	SHIPPING_PAGE_ALL,

	// CREATE COURSE
	NEW_COURSE,

	INSTITUTE_PROFILE,
	INSTITUTE_SETTINGS,
	MANAGE_STUDENTS,
	ADD_USER,
	OTP_SCREEN,

	// No page found
	NO_PAGE_FOUND,

	// No access page
	NO_ACCESS,

	//Manage-opration
	MANAGE_OPRATION,
	MANAGE_OPRATION_CREATE,
	MANAGE_OPRATION_UPDATE,
	//Manage-teacher
	MANAGE_TEACHER,
	STUDENTS,
	MANAGE_TEACHER_CREATE,
	TEACHER_PROFILE,
	ADMIN_DASHBOARD,
	USER_DASHBOARD,
	TEACHER_STUDENT_PROFILE_VIEW,

	//Finance
	COUPONS,
	VIEW_BLOG,
	ALL_BLOGS,
	SINGLE_BLOG,
	ADD_BLOG,
	ADD_CATEGORY,
	VIEW_CATEGORY,
	ADD_NETWORK,
	VIEW_NETWORK,
	REGISTRATION_REQUEST,
	COURSE_REQUEST,
	COUPONS_CREATE,
	EARNINGS,
	VIEW_EARNINGS,
	STUDENTS_EARNINGS,

	//Courses
	STORES,
	ADD_STORE,
	COURSE_VIEW,

	//STUDENT
	STUDENT_PROFILE,
	STUDENT_DASHBOARD,
	STUDENT_QUIZZES,
	STUDENT_GRADE_QUIZZES,
	STUDENT_ASSIGNMENTS,
	STUDENT_GRADE_ASSIGNMENTS,
	STUDENT_COURSE_VIEW,
	STUDENT_COURSES_LIST,
	STUDENT_ENROLLED_COURSES,


	CLOSED,
};
export default WEB_PAGES;
