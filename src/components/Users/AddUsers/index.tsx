import { Checkbox, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import api from "../../../api";

interface AddUserProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
}

export const AddUser: React.FC<AddUserProps> = ({
	onCancel,
	onSubmit,
	isVisible,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.post(`crm/user`, { ...values });

			notification.success({
				message: "Usuário adicionado com sucesso",
			});

			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao inserir um usuário. Tente novamente., " +
					error,
			});
			setLoading(false);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Modal
			visible={isVisible}
			title="Adicionar Usuário"
			closable={false}
			maskClosable={false}
			okText="Adicionar"
			okButtonProps={{
				htmlType: "submit",
				disabled: loading,
				loading: loading,
			}}
			cancelButtonProps={{
				disabled: loading,
			}}
			onOk={() => {
				form
					.validateFields()
					.then(() => {
						form.submit();
					})
					.catch((info: any) => {
						console.log("Validate Failed: ", info);
					});
			}}
			onCancel={() => {
				onReset();
				onCancel && onCancel();
			}}
		>
			<Form
				layout="vertical"
				form={form}
				name="control-hooks"
				onFinish={onFinish}
				data-testid="form-user-el"
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 5 }]}
				>
					<Input
						placeholder="Digite o nome do usuário"
						aria-label="name-input-form"
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true, max: 512, min: 10, type: "email" }]}
				>
					<Input
						placeholder="Digite o email do usuário"
						aria-label="email-input-form"
					/>
				</Form.Item>
				<Form.Item name="admin" valuePropName="checked">
					<Checkbox aria-label="admin-active-check-el">Administrador</Checkbox>
				</Form.Item>
			</Form>
		</Modal>
	);
};
