import PATH from "../../../navigation/Path";
// import { RiCoupon3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import STRINGS from "../../../utils/strings";
import { Link } from "react-router-dom";
import { MdDashboard, MdPerson, MdPostAdd } from "react-icons/md";
// import { FaBookOpen, FaHandHoldingDollar } from "react-icons/fa6";
import { IoBookSharp, IoDocumentText } from "react-icons/io5";
import { PiUsersFill } from "react-icons/pi";
import { LOOKUP_TYPES } from "../../../utils/lookup";
import { FaFolderPlus, FaNetworkWired } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { BsFilePostFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
// import { RiCoupon3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
export const items = [

	{
		key: PATH.STUDENT_DASHBOARD,
		icon: <MdDashboard />,
		label: <Link to={PATH.STUDENT_DASHBOARD}>{STRINGS.STUDENT_DASHBOARD}</Link>,
		show: true,
	},
	{
		key: PATH.ADMIN_DASHBOARD,
		icon: <MdDashboard />,
		label: <Link to={PATH.ADMIN_DASHBOARD}>{STRINGS.ADMIN_DASHBOARD}</Link>,
		show: true,
	},
	{
		key: PATH.USER_DASHBOARD,
		icon: <MdDashboard />,
		label: <Link to={PATH.USER_DASHBOARD}>{STRINGS.USER_DAHSBOARD}</Link>,
		show: true,
	},

	{
		key: PATH.STUDENT_ASSIGNMENTS,
		icon: <IoDocumentText />,
		label: (
			<Link to={PATH.STUDENT_ASSIGNMENTS}>{STRINGS.STUDENT_ASSIGNMENTS}</Link>
		),
		show: true,
	},
	// {
	// 	key: PATH.STUDENT_QUIZZES,
	// 	icon: <MdQuiz />,
	// 	label: <Link to={PATH.STUDENT_QUIZZES}>{STRINGS.STUDENT_QUIZZES}</Link>,
	// 	show: true,
	// },
	{
		key: PATH.STUDENT_COURSES_LIST,
		icon: <IoBookSharp />,
		label: <Link to={PATH.STUDENT_COURSES_LIST}>{STRINGS.MANAGE_STORES}</Link>,
		show: true,
	},


	{
		key: PATH.STUDENTS,
		icon: <PiUsersFill />,
		label: <Link to={PATH.STUDENTS}>{STRINGS.STUDENTS}</Link>,
		show: true,
	},
	{
		key: PATH.MANAGE_TEACHER,
		icon: <MdPerson />,
		label: <Link to={PATH.MANAGE_TEACHER}>{STRINGS.MANAGE_TEACHER}</Link>,
		show: true,
	},
	{
		key: PATH.MANAGE_PRODUCTS,
		icon: <MdPerson />,
		label: <Link to={PATH.MANAGE_PRODUCTS}>{STRINGS.MANAGE_PRODUCTS}</Link>,
		show: true,
	},
	{
		key: PATH.MANAGE_COUPONS,
		icon: <MdPerson />,
		label: <Link to={PATH.MANAGE_COUPONS}>{STRINGS.MANAGE_COUPONS}</Link>,
		show: true,
	},
	// {
	// 	key: PATH.MANAGE_STUDENTS,
	// 	icon: <PiUsersFill />,
	// 	label: <Link to={PATH.MANAGE_STUDENTS}>{STRINGS.MANAGE_STUDENTS}</Link>,
	// 	show: true,
	// },

	{
		key: STRINGS.MANAGE_STORES,
		icon: <IoBookSharp />,
		label: STRINGS.MANAGE_STORES,
		show: true,
		children: [
			{
				key: PATH.STORES,
				icon: <IoBookSharp />,
				label: <Link to={PATH.STORES}>{STRINGS.STORE}</Link>,
				show: true,
			},
			{
				key: PATH.ADD_STORES,
				icon: <FaFolderPlus />,
				label: <Link to={PATH.ADD_STORES}>{STRINGS.ADD_STORES}</Link>,
			},
		],
	},
	{
		key: STRINGS.USERNAME,
		icon: <PiUsersFill />,
		label: STRINGS.MANAGE_STUDENTS,
		show: true,
		children: [
			{
				key: PATH.MANAGE_STUDENTS,
				icon: <PiUsersFill />,
				label: <Link to={PATH.MANAGE_STUDENTS}>{STRINGS.USER}</Link>,
			},
			{
				key: PATH.CREATE_USER,
				icon: <FaFolderPlus />,
				label: <Link to={PATH.CREATE_USER}>{STRINGS.ADD_USER}</Link>,
			},
		],
	},
	{
		key: STRINGS.OPRATIONNAME,
		icon: <PiUsersFill />,
		label: STRINGS.MANAGE_OPRATION,
		show: true,
		children: [
			{
				key: PATH.MANAGE_OPRATION,
				icon: <PiUsersFill />,
				label: <Link to={PATH.MANAGE_OPRATION}>{STRINGS.OPRATION}</Link>,
			},
			{
				key: PATH.MANAGE_OPRATION_CREATE,
				icon: <FaFolderPlus />,
				label: <Link to={PATH.MANAGE_OPRATION_CREATE}>{STRINGS.MANAGE_OPRATION_CREATE}</Link>,
			},
		],
	},
	{
		key: STRINGS.BLOGS,
		icon: <BsFilePostFill />,
		label: STRINGS.BLOGS,
		show: true,
		children: [
			{
				key: PATH.VIEW_BLOG,
				icon: <BsFilePostFill size={18} />,
				label: (
					<Link to={PATH.VIEW_BLOG}>
						{STRINGS.VIEW_BLOGS}
					</Link>
				),
			},
			{
				key: PATH.ADD_BLOGS,
				icon: <MdPostAdd size={18} />,
				label: <Link to={PATH.ADD_BLOGS}>{STRINGS.ADD_BLOGS}</Link>,
			},
		],
	},
	{
		key: STRINGS.EVENTS,
		icon: <BiCategory />,
		label: STRINGS.EVENTS,
		show: true,
		children: [
			{
				key: PATH.VIEW_EVENTS,
				icon: <BiCategory size={18} />,
				label: (
					<Link to={PATH.VIEW_EVENTS}>
						{STRINGS.VIEW_EVENTS}
					</Link>
				),
			},
		
		],
	},
	{
		key: STRINGS.CATEGORY,
		icon: <BiCategory />,
		label: STRINGS.CATEGORY,
		show: true,
		children: [
			{
				key: PATH.VIEW_CATEGORY,
				icon: <BiCategory size={18} />,
				label: (
					<Link to={PATH.VIEW_CATEGORY}>
						{STRINGS.VIEW_CATEGORY}
					</Link>
				),
			},
			{
				key: PATH.ADD_CATEGORY,
				icon: <TbCategoryPlus />,
				label: <Link to={PATH.ADD_CATEGORY}>{STRINGS.ADD_CATEGORY}</Link>,
			},
		],
	},
	{
		key: STRINGS.NETWORK,
		icon: <FaNetworkWired />,
		label: STRINGS.NETWORK,
		show: true,
		children: [
			{
				key: PATH.VIEW_NETWORK,
				icon: <FaNetworkWired size={18} />,
				label: (
					<Link to={PATH.VIEW_NETWORK}>
						{STRINGS.VIEW_NETWORK}
					</Link>
				),
			},
			{
				key: PATH.ADD_NETWORK,
				icon: <FaNetworkWired />,
				label: <Link to={PATH.ADD_NETWORK}>{STRINGS.ADD_NETWORK}</Link>,
			},
		],
	},
	{
		key: PATH.INSTITUTE_SETTINGS,
		icon: <CiSettings size={18} />,
		label: (
			<Link to={PATH.INSTITUTE_SETTINGS}>{STRINGS.INSTITUTE_SETTINGS}</Link>
		),
		show: true,
	},
	// {
	// 	key: STRINGS.STUDENT_GRADING,
	// 	icon: <MdAssessment />,
	// 	label: STRINGS.STUDENT_GRADING,
	// 	show: true,
	// 	children: [
	// 		{
	// 			key: PATH.STUDENT_GRADE_ASSIGNMENTS,
	// 			icon: <IoDocumentText size={18}/>,
	// 			label: <Link to={PATH.STUDENT_GRADE_ASSIGNMENTS}>{STRINGS.STUDENT_GRADE_ASSIGNMENTS}</Link>,
	// 		},
	// 		{
	// 			key: PATH.STUDENT_GRADE_QUIZZES,
	// 			icon: <MdQuiz size={18} />,
	// 			label: <Link to={PATH.STUDENT_GRADE_QUIZZES}>{STRINGS.STUDENT_GRADE_QUIZZES}</Link>,
	// 		},
	// 	],
	// },
];
let user = localStorage.getItem("super_user");
user = user ? JSON.parse(user) : null;
console.log("user:::😊😊😊", user)
export const roleBasedItems = {
	/** INSTITUTE */
	[LOOKUP_TYPES.Role.ADMIN]: [
		PATH.MANAGE_STUDENTS,
		PATH.CREATE_USER,
		PATH.ADMIN_DASHBOARD,
		PATH.MANAGE_PRODUCTS,
		PATH.MANAGE_COUPONS,
		PATH.STORES,
		PATH.ADD_STORES,
		PATH.ADD_BLOGS,
		PATH.VIEW_BLOG,
		PATH.ADD_CATEGORY,
		PATH.VIEW_CATEGORY,
		PATH.ADD_NETWORK,
		PATH.VIEW_EARNINGS,
		PATH.VIEW_NETWORK,
		PATH.VIEW_EVENTS

	],
	/** STUDENT */
	[LOOKUP_TYPES.Role.USER]: [
		// PATH.STUDENT_DASHBOARD,
		PATH.USER_DASHBOARD,
		//ignore ts
		//@ts-ignore
		(user && user.user_permissions?.includes('visit_product_page')) && PATH.MANAGE_PRODUCTS,
		//@ts-ignore
		(user && user.user_permissions?.includes('visit_store_page')) && PATH.STORES,
		//@ts-ignore
		(user && user.user_permissions?.includes('visit_coupon_page')) && PATH.MANAGE_COUPONS,

	],
	/** TEACHER */
	[LOOKUP_TYPES.Role.TEACHER]: [
		PATH.STORES,
		PATH.STUDENTS,
	],
	/** INDIVIDUAL */
	[LOOKUP_TYPES.Role.INDIVIDUAL]: [PATH.STORES],
	/** SUPER ADMIN */
	// [LOOKUP_TYPES.Role.SUPER_ADMIN]: [],
	/** TEACHING ASSISTANT */
	// [LOOKUP_TYPES.Role.TEACHING_ASSISTANT]: [],
};
