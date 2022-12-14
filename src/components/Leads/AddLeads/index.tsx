import { Form, Input, Modal, notification } from "antd";
import { ReactNode, useState } from "react";
import { Container } from "./styles";
import api from "../../../api";

interface AddPartnerProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
}

export const AddLeads: React.FC<AddPartnerProps> = ({
	onCancel,
	onSubmit,
	isVisible,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.post(`/api/leads`, values);

			notification.success({
				message: "Franquia inserida com sucesso",
			});

			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao inserir a franquia. Tente novamente., " +
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
			title="Adicionar Parceiro"
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
				data-testid="form-leads-element"
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o nome do lead"
						aria-label="name-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true, max: 512, min: 4, type: "email" }]}
				>
					<Input
						placeholder="Digite o email do lead"
						aria-label="email-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="utm_campaign"
					label="UTM Campanha"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o UTM da campanha"
						aria-label="campaign-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="utm_medium"
					label="UTM M??dio"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o UTM m??dio"
						aria-label="medium-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="utm_source"
					label="UTM Fonte"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o UTM da fonte"
						aria-label="source-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="utm_term"
					label="UTM Termo"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o UTM do termo"
						aria-label="term-input-el"
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
