import React, { useState } from "react";
import { Row, Col, Input, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { LuSlidersHorizontal } from "react-icons/lu";
import GenericButton from "../UI/GenericButton";
import dayjs from "dayjs";
import { FULL_DATE_FORMAT } from "../../utils/constants";

interface SearchFilterWithDrawerProps {
	setTableOptions: (options: any) => void;
	onOpenDrawer?: () => void;
	defaultTableOptions: any;
	form: any;
}

const SearchFilterWithDrawer: React.FC<SearchFilterWithDrawerProps> = ({
	setTableOptions,
	onOpenDrawer,
	defaultTableOptions,
	form,
}) => {
	const [, setRenderForm] = useState(false);
	const formValues = form?.getFieldsValue();

	const onRemoveFilter = (key: string) => {
		const updatedValues = { ...formValues, [key]: null };
		form.setFieldsValue(updatedValues);
		setTableOptions((prev: any) => {
			const updatedFilters: any = { ...prev.filters };
			delete updatedFilters[key];
			return {
				...prev,
				filters: updatedFilters,
			};
		});
	};

	const renderTag = (key: string, value: any) => {
		if (value === null || value === undefined) return null;

		// Convert snake_case or camelCase key to space-separated Title Case
		const formattedKey = key
			.replace(/([A-Z])/g, " $1") // Convert camelCase to spaces
			.replace(/_/g, " ") // Replace underscores with spaces
			.trim()
			.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

		// Handle boolean keys like "isMandatory"
		const displayKey =
			key.startsWith("is") && typeof value === "boolean"
				? formattedKey.replace(/^Is /, "") // Remove "Is" from the beginning
				: formattedKey;

		// Format value to display
		let displayValue;

		if (typeof value === "boolean") {
			displayValue = value ? "Yes" : "No"; // Show "Yes" for true and "No" for false
		} else if (dayjs(value).isValid()) {
			// If the value is a valid Day.js object
			displayValue = dayjs(value).format("DD/MM/YYYY"); // Format date as DD/MM/YYYY
		} else if (typeof value === "number" && !isNaN(value)) {
			// Check if the value is a timestamp
			displayValue = dayjs(value).format("DD/MM/YYYY"); // Format timestamp as DD/MM/YYYY
		} else {
			displayValue =
				typeof value === "string" || typeof value === "number"
					? value
					: JSON.stringify(value);
		}

		return (
			<Tag
				key={key}
				closable
				className="cursor-pointer"
				color="#FCAB60"
				onClose={() => onRemoveFilter(key)}
				style={{
					display: "inline-block",
					margin: "4px",
					wordWrap: "break-word",
					whiteSpace: "normal",
				}}
			>
				{`${displayKey}: ${displayValue}`}
			</Tag>
		);
	};

	return (
		<Row>
			{/* Search Bar and Drawer Button */}
			<Col
				xs={24}
				sm={20}
				md={16}
				lg={14}
				xl={7}
				xxl={8}
				className="flex items-center gap-2"
			>
				<Input
					className="custom-input"
					suffix={<FiSearch size={20} />}
					placeholder="Search..."
					onChange={(e) => {
						const value = e.target.value.trim();
						setTableOptions((prev: { filters: any }) => ({
							...prev,
							filters: {
								...prev.filters,
								name: value ? value : undefined,
								fromDate: prev.filters?.fromDate
									? dayjs(prev.filters.fromDate).format(FULL_DATE_FORMAT)
									: undefined,
								toDate: prev.filters?.toDate
									? dayjs(prev.filters.toDate).format(FULL_DATE_FORMAT)
									: undefined,
							},
						}));
					}}
				/>
				{onOpenDrawer && (
					<GenericButton
						className="!min-w-9 !h-[2.2rem] sm:mb-0"
						variant="solid"
						icon={<LuSlidersHorizontal size={18} />}
						onClick={onOpenDrawer}
					/>
				)}
			</Col>

			{/* Clear Filters Button */}
			<Col xs={24} sm={4} lg={4} xl={4} xxl={4}>
				{formValues &&
					Object.values(formValues)?.some(
						(value) => value !== null && value !== undefined
					) && (
						<GenericButton
							variant="link"
							color="primary"
							onClick={() => {
								form.resetFields();
								setTableOptions(defaultTableOptions);
								setRenderForm((prev) => !prev);
							}}
							label="Clear filters"
							className="!min-w-12 !w-28 underline"
						/>
					)}
			</Col>

			{/* Render Tags */}
			<Col span={24}>
				<div className="gap-[2px] my-2 flex items-center flex-wrap">
					{formValues &&
						Object.entries(formValues).map(([key, value]) =>
							renderTag(key, value)
						)}
				</div>
			</Col>
		</Row>
	);
};

export default SearchFilterWithDrawer;
