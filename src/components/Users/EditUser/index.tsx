import { Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";

interface AddUserProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
	user: any;
}

export const EditUser: React.FC<AddUserProps> = ({
	isVisible,
	onSubmit,
	onCancel,
	user,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.post(`/api/accounts/user`, {
				...values,
				consent_email: false,
			});

			notification.success({
				message: "Usuário editado com sucesso",
			});

			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao editar o usuário. Tente novamente., " + error,
			});
			setLoading(false);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	useEffect(() => {
		if (user) {
			form.setFieldsValue({
				email: user.email,
				name: user.name,
				id: user.name,
			});
		}
	}, [user]);

	return (
		<Modal
			visible={isVisible}
			title="Editar Usuário"
			closable={false}
			maskClosable={false}
			okText="Editar"
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
					.catch((info) => {
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
				data-testid="form-el"
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 2 }]}
				>
					<Input
						placeholder="Digite o nome do usuário"
						data-testid="name-input-form"
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true, max: 512, min: 2, type: "email" }]}
				>
					<Input
						placeholder="Digite o email do usuário"
						data-testid="email-input-form"
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
