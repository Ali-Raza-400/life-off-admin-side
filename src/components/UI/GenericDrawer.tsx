import React from "react";
import { Drawer, Form, FormInstance, Space } from "antd";
import GenericButton from "./GenericButton";
import { FULL_DATE_FORMAT } from "../../utils/constants";
import dayjs from "dayjs";

interface GenericDrawerProps {
  visible: boolean;
  onClose: () => void;
  // onApplyFilters: (filters: any) => void;
  form: FormInstance;
  title?: string;
  children?: React.ReactNode;
  setTableOptions: React.Dispatch<React.SetStateAction<any>>;
}

const GenericDrawer: React.FC<GenericDrawerProps> = ({
  visible,
  onClose,
  // onApplyFilters,
  form,
  title = "Filters",
  children,
  setTableOptions,
}) => {
  // const handleFinish = (values: any) => {
  // 	onApplyFilters(values);
  // 	onClose();
  // };

  const handleFiltersApply = async () => {
    try {
      const values = await form.validateFields();
      setTableOptions((prev: any) => ({
        ...prev,
        filters: {
          ...prev.filters,
          ...values,
          fromDate: values.fromDate
            ? dayjs(values.fromDate).format(FULL_DATE_FORMAT)
            : undefined,
          toDate: values.toDate
            ? dayjs(values.toDate).format(FULL_DATE_FORMAT)
            : undefined,
        },
      }));
      onClose();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Drawer
      title={title}
      placement="right"
      closable={true}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      open={visible}
      maskClosable={false}
      width={320}
      footer={
        <Space>
          <GenericButton
            variant="link"
            color="primary"
            onClick={() => {
              form.resetFields();
              // onClose();
            }}
            label="Reset"
            className="!min-w-12 !w-28 underline"
          />
          <GenericButton
            color="primary"
            onClick={handleFiltersApply}
            label="Apply Filters"
          />
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        {children}
      </Form>
    </Drawer>
  );
};

export default GenericDrawer;
