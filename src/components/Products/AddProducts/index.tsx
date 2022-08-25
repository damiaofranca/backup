import { Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";

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
		// setLoading(true);
		// try {
		// 	await api.post(`/api/product`, values);

		// 	notification.success({
		// 		message: "Produto inserido com sucesso",
		// 	});

		onReset();
		onSubmit && onSubmit();

		setLoading(false);
		// } catch (error) {
		// 	notification.error({
		// 		message:
		// 			"Ocorreu algum erro ao criar o produto. Tente novamente., " +
		// 			error,
		// 	});
		// 	setLoading(false);
		// }
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
			data-testid="modal-el"
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
				data-testid="form-element"
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 4 }]}
				>
					<Input
						placeholder="Digite o nome do produto"
						data-testid="name-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Descrição do produto"
					rules={[{ required: true, max: 512, min: 6 }]}
				>
					<Input
						placeholder="Digite a descrição do produto"
						data-testid="description-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="grace_period"
					label="Período de testes"
					rules={[{ required: true, min: 1 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o período de testes"
						data-testid="grace_period-input-el"
					/>
				</Form.Item>

				<Form.Item
					name="number_of_devices"
					label="Número de dispositivos"
					rules={[{ required: true, min: 1 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite a quantidade de dispositivos que terão acesso ao produto"
						data-testid="number_of_devices-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="price"
					label="Preço do produto"
					rules={[{ required: true, min: 1 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o preço do produto"
						data-testid="price-input-el"
					/>
				</Form.Item>
				<Form.Item name="is_active" valuePropName="checked">
					<Checkbox data-testid="product-active-input-el">
						Produto ativo ?
					</Checkbox>
				</Form.Item>
			</Form>
		</Modal>
	);
};
