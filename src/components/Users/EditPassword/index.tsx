import { Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api";

interface EditPasswordProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
	user: {
		token: string;
	};
}

export const EditPassword: React.FC<EditPasswordProps> = ({
	onCancel,
	onSubmit,
	isVisible,
	user,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.post(`/api/accounts/reset/password`, values);

			notification.success({
				message: "Senha alterada com sucesso",
			});

			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao alterar a senha. Tente novamente., " + error,
			});
			setLoading(false);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	useEffect(() => {
		if (user.token) {
			form.setFieldsValue({
				token: user.token,
			});
		}
	}, [user]);

	return (
		<Modal
			visible={isVisible}
			title="Editar Usuário"
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
			>
				<Form.Item
					name="password"
					label="Senha"
					rules={[{ required: true, max: 512, min: 6 }]}
				>
					<Input placeholder="Digite a nova senha" />
				</Form.Item>
			</Form>
		</Modal>
	);
};
