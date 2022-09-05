import { Form, Input, Modal, notification } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import api from "../../../../api";
import { Plan } from "../../../../pages/private/Products/model";

interface AddPartnerProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
	idPlan: string;
	plan: Plan;
}

export const EditPlan: React.FC<AddPartnerProps> = ({
	onCancel,
	onSubmit,
	isVisible,
	idPlan,
	plan,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.put(`/api/crm/plans/${plan.id}`, {
				...values,
				product_id: idPlan,
			});

			notification.success({
				message: "Plano editado com sucesso",
			});
			onCancel();
			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao editar o plano. Tente novamente., " + error,
			});
			setLoading(false);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	useEffect(() => {
		if (plan) {
			form.setFieldsValue({
				name: plan.name,
				price: plan.price,
				is_active: plan.is_active,
				description: plan.description,
				grace_period: plan.grace_period,
				number_of_devices: plan.number_of_devices,
			});
		}
	}, [plan]);

	return (
		<Modal
			visible={isVisible}
			title="Editar Plano"
			closable={false}
			maskClosable={false}
			okText="Editar"
			data-testid="modal-plan-product-el"
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
				aria-label="container-el"
				onFinish={onFinish}
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, max: 512, min: 2 }]}
				>
					<Input
						placeholder="Digite o nome do plano"
						aria-label="name-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Descrição"
					rules={[{ required: true, max: 512, min: 2 }]}
				>
					<Input
						placeholder="Digite a descrição do plano"
						aria-label="description-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="price"
					label="Preço"
					rules={[{ required: true, max: 512, min: 1 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o preço do plano"
						aria-label="price-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="grace_period"
					label="Período de testes"
					rules={[{ required: true, max: 512, min: 1 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o período de teste"
						aria-label="grace-period-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="number_of_devices"
					label="Numéro de dispositivos"
					rules={[{ required: true, max: 512, min: 1 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o aceito de dispositivos"
						aria-label="number-of-devices-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="is_active"
					valuePropName="checked"
					style={{ margin: 0 }}
				>
					<Checkbox aria-label="product-active-check-el">
						Produto ativo ?
					</Checkbox>
				</Form.Item>
			</Form>
		</Modal>
	);
};
