import { FilterOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";

interface PropsFilter {
	name: string;
	brand: string;
}

interface FiltersProps {
	onReset: () => void;
	onFilter: (filter: PropsFilter) => void;
}

const Filter: React.FC<FiltersProps> = ({ onReset, onFilter }) => {
	const [showModalFilter, setShowModalFilter] = useState<boolean>(false);
	const [form] = Form.useForm();

	const onResetFilter = () => {
		onReset();
		form.resetFields();
		setShowModalFilter(false);
	};

	const saveFilter = () => {
		const { name, brand } = form.getFieldsValue();
		onFilter({
			name: name,
			brand: brand,
		});
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
				title="Filtrar Pagamentos"
				closable={true}
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
						onClick={onResetFilter}
						type="primary"
						color="danger"
						key="cancel"
						danger
					>
						Limpar Filtro
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
				>
					<Form.Item name="name" label="Nome">
						<Input
							placeholder="Digite o nome da oferta"
							aria-label="name-input-el"
						/>
					</Form.Item>
					<Form.Item name="brand" label="Bandeira">
						<Input
							placeholder="Digite a bandeira do cartão"
							aria-label="brand-input-el"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Filter;
