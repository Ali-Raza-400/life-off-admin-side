import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { FaEye } from "react-icons/fa6";

interface ButtonGroupProps {
	onApprove?: () => void;
	onReject?: () => void;
	onView?: () => void;
}

const ActionIconBtns: React.FC<ButtonGroupProps> = ({
	onApprove,
	onReject,
	onView,
}) => {
	return (
		<div className="flex items-center gap-2">
			{/* Approve Button */}
			{onApprove && (
				<Tooltip title="Approve">
					<span
						className="hover:bg-[#D3F8E1] p-1 flex items-center rounded-sm cursor-pointer"
						onClick={onApprove}
					>
						<CheckOutlined className="text-[#22C55E] text-[1rem]" />
					</span>
				</Tooltip>
			)}

			{/* Reject Button */}
			{onReject && (
				<Tooltip title="Reject">
					<span
						className="hover:bg-[#F6D5D5] p-1 flex items-center rounded-sm cursor-pointer"
						onClick={onReject}
					>
						<CloseOutlined className="text-[#BA2A2A] text-[1rem]" />
					</span>
				</Tooltip>
			)}

			{/* View Button */}
			{onView && (
				<Tooltip title="View">
					<span
						className="hover:bg-[#DED7F4] p-1 flex items-center rounded-sm cursor-pointer"
						onClick={onView}
					>
						<FaEye className="text-[#7FA842] text-[1rem]" />
					</span>
				</Tooltip>
			)}
		</div>
	);
};

export default ActionIconBtns;
