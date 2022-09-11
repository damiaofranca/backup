import { Checkbox, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";

interface AddUserProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
	user: {
		name: string | null;
		email: string | null;
		id: string | null;
		admin: boolean;
	};
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
			await api.patch(`/crm/user/${user.id}`, {
				...values,
			});

			notification.success({
				message: "Usuário editado com sucesso",
			});
			onCancel();
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
				admin: user.admin,
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
					rules={[{ required: true, max: 512, min: 2 }]}
				>
					<Input
						placeholder="Digite o nome do usuário"
						aria-label="name-input-form"
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true, max: 512, min: 2, type: "email" }]}
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
