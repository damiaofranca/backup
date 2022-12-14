import { Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import api from "../../../api";

interface AddPartnerProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
}

export const AddPartner: React.FC<AddPartnerProps> = ({
	onCancel,
	onSubmit,
	isVisible,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.post(`/api/crm/partners`, values);

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
			data-testid="modal-partner-el"
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
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 2 }]}
				>
					<Input
						placeholder="Digite o nome do parceiro"
						aria-label="name-input-el"
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
