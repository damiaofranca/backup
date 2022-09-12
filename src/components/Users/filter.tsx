import { FilterOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

interface PropsFilter {
	name: string;
	mail: string;
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
		const { name, mail } = form.getFieldsValue();
		onFilter({
			name: name,
			mail: mail,
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
				title="Filtrar Usuários"
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
							placeholder="Digite o nome do usuário"
							aria-label="name-input-el"
						/>
					</Form.Item>
					<Form.Item name="mail" label="Email">
						<Input
							placeholder="Digite o email do usuário"
							aria-label="mail-input-el"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Filter;
