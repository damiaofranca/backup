import { FilterOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";

interface FilterByDateProps {
	onReset: () => void;
	onFilter: (start_date: string, end_date: string) => void;
}

export const FilterByDate: React.FC<FilterByDateProps> = ({
	onReset,
	onFilter,
}) => {
	const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
	const [form] = Form.useForm();

	const onResetFilter = () => {
		onReset();
		form.resetFields();
		setShowModalFilter(false);
	};

	const saveFilter = () => {
		const { start_date, end_date } = form.getFieldsValue();
		onFilter(
			format(new Date(start_date), "MM-dd-yy"),
			format(new Date(end_date), "MM-dd-yy")
		);
		setShowModalFilter(false);
	};

	return (
		<>
			<Button
				key="bt-ds-reload"
				icon={<FilterOutlined />}
				onClick={() => {
					setShowModalFilter(true);
				}}
			>
				Filtrar
			</Button>

			<Modal
				visible={showModalFilter}
				title="Filtrar Leads"
				closable={false}
				maskClosable={false}
				okText="Filtrar"
				data-testid="modal-el"
				onOk={() => {
					form
						.validateFields()
						.then(() => {
							form.submit();
						})
						.catch((info) => {
							console.log("Validate Failed: ", info);
						});
				}}
				onCancel={() => {
					setShowModalFilter(false);
				}}
				footer={[
					<Button
						key="reset"
						onClick={() => {
							setShowModalFilter(false);
						}}
					>
						Cancelar
					</Button>,
					<Button key="cancel" onClick={onResetFilter}>
						Resetar filtro
					</Button>,
					<Button key="filter" type="primary" onClick={() => [form.submit()]}>
						Filtrar
					</Button>,
				]}
			>
				<Form
					layout="vertical"
					form={form}
					name="control-hooks"
					onFinish={saveFilter}
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<Form.Item
						name="start_date"
						label="Data inicial"
						rules={[{ required: true }]}
					>
						<DatePicker placeholder="Data inicial" style={{ width: "94%" }} />
					</Form.Item>
					<Form.Item
						name="end_date"
						label="Data final"
						rules={[{ required: true }]}
					>
						<DatePicker placeholder="Data final" style={{ width: "94%" }} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
