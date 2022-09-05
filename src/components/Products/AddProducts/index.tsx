import { Checkbox, Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import api from "../../../api";

interface AddProductProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
}

export const AddProduct: React.FC<AddProductProps> = ({
	onSubmit,
	onCancel,
	isVisible,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.post(`/api/crm/products`, {
				name: values.name,
				// "is_active": true,
				description: values.description,
			});

			notification.success({
				message: "Produto inserido com sucesso",
			});

			onReset();
			onCancel();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao criar o produto. Tente novamente., " + error,
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
			title="Adicionar Produto"
			closable={false}
			maskClosable={false}
			data-testid="modal-product-el"
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
				aria-label="form-el"
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o nome do produto"
						aria-label="name-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Descrição do produto"
					rules={[{ required: true, max: 512, min: 6 }]}
				>
					<Input
						placeholder="Digite a descrição do produto"
						aria-label="description-input-el"
					/>
				</Form.Item>

				<Form.Item name="is_active" valuePropName="checked">
					<Checkbox aria-label="product-active-check-el">
						Produto ativo ?
					</Checkbox>
				</Form.Item>
			</Form>
		</Modal>
	);
};
