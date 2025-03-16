import PATH from "../../../navigation/Path";
// import { RiCoupon3Fill, RiMoneyDollarCircleFill } from "react-icons/ri";
import STRINGS from "../../../utils/strings";
import { Link } from "react-router-dom";
import { MdCategory, MdDashboard, MdEvent, MdPrivacyTip } from "react-icons/md";
// import { FaBookOpen, FaHandHoldingDollar } from "react-icons/fa6";
import { PiUsersFill } from "react-icons/pi";
import { LOOKUP_TYPES } from "../../../utils/lookup";
import {  FaBoxOpen, FaFileContract, FaFolderPlus, FaNetworkWired, FaStore, FaTicketAlt } from "react-icons/fa";
import {  BiNews } from "react-icons/bi";
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
		key: PATH.MANAGE_PRODUCTS,
		icon: <FaBoxOpen />,
		label: <Link to={PATH.MANAGE_PRODUCTS}>{STRINGS.MANAGE_PRODUCTS}</Link>,
		show: true,
	},
	{
		key: PATH.MANAGE_COUPONS,
		icon: <FaTicketAlt />,
		label: <Link to={PATH.MANAGE_COUPONS}>{STRINGS.MANAGE_COUPONS}</Link>,
		show: true,
	},

	{
		key: STRINGS.MANAGE_STORES,
		icon: <FaStore />,
		label: STRINGS.MANAGE_STORES,
		show: true,
		children: [
			{
				key: PATH.STORES,
				icon: <FaStore />,
				label: <Link to={PATH.STORES}>{STRINGS.STORE}</Link>,
				show: true,
			},
			{
				key: PATH.ADD_STORES,
				icon: <FaStore />,
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
		key: STRINGS.BLOGS,
		icon: <BiNews />,
		label: STRINGS.BLOGS,
		show: true,
		children: [
			{
				key: PATH.VIEW_BLOG,
				icon: <BiNews />,
				label: (
					<Link to={PATH.VIEW_BLOG}>
						{STRINGS.VIEW_BLOGS}
					</Link>
				),
			},
			{
				key: PATH.ADD_BLOGS,
				icon: <BiNews />,
				label: <Link to={PATH.ADD_BLOGS}>{STRINGS.ADD_BLOGS}</Link>,
			},
			{
				key: PATH.UPDATE_BLOG,
				icon: <BiNews />,
				label: <Link to={PATH.UPDATE_BLOG}>{STRINGS.UPDATE_BLOG}</Link>,
			},
		],
	},
	{
		key: STRINGS.EVENTS,
		icon: <MdEvent />,
		label: STRINGS.EVENTS,
		show: true,
		children: [
			{
				key: PATH.VIEW_EVENTS,
				icon: <MdEvent />,
				label: (
					<Link to={PATH.VIEW_EVENTS}>
						{STRINGS.VIEW_EVENTS}
					</Link>
				),
			},
			{
				key: PATH.ADD_EVENT,
				icon: <MdEvent />,
				label: (
					<Link to={PATH.ADD_EVENT}>
						{STRINGS.ADD_EVENT}
					</Link>
				),
			},

		],
	},
	{
		key: STRINGS.CATEGORY,
		icon: <MdCategory />,
		label: STRINGS.CATEGORY,
		show: true,
		children: [
			{
				key: PATH.VIEW_CATEGORY,
				icon: <MdCategory />,
				label: (
					<Link to={PATH.VIEW_CATEGORY}>
						{STRINGS.VIEW_CATEGORY}
					</Link>
				),
			},
			{
				key: PATH.ADD_CATEGORY,
				icon: <MdCategory />,
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
				icon: <FaNetworkWired />,
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
		key: PATH.PRIVACY_POLICY,
		icon: <MdPrivacyTip />,
		label: (
			<Link to={PATH.PRIVACY_POLICY}>{STRINGS.PRIVACY_POLICY}</Link>
		),
		show: true,
	},
	{
		key: PATH.TERMS_CONDITIONS,
		icon: <FaFileContract />,
		label: (
			<Link to={PATH.TERMS_CONDITIONS}>{STRINGS.TERMSANDCONDTIONS}</Link>
		),
		show: true,
	},
];
let user = localStorage.getItem("super_user");
user = user ? JSON.parse(user) : null;
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
		// PATH.UPDATE_BLOG,
		PATH.VIEW_BLOG,
		PATH.ADD_CATEGORY,
		PATH.VIEW_CATEGORY,
		PATH.ADD_NETWORK,
		PATH.VIEW_EARNINGS,
		PATH.VIEW_NETWORK,
		PATH.VIEW_EVENTS,
		PATH.PRIVACY_POLICY,
		PATH.TERMS_CONDITIONS,
		PATH.ADD_EVENT

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
