import { Form, Input, InputNumber, Modal, notification } from "antd";
import { useState } from "react";
import api from "../../../../api";

interface AddPlanProps
{
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
	productId: string;
}

const AddPlan: React.FC<AddPlanProps> = ({
	onCancel,
	onSubmit,
	isVisible,
	productId,
}) =>
{
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) =>
	{
		setLoading(true);
		try
		{
			await api.post(`/crm/offer`, {
				external_service_id: 1,
				...values,
				grace_period: `${ values.grace_period }`
			});

			notification.success({
				message: "Plano inserido com sucesso",
			});
			onCancel();
			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error)
		{
			notification.error({
				message:
					"Ocorreu algum erro ao inserir o plano. Tente novamente., " + error,
			});
			setLoading(false);
		}
	};

	const onReset = () =>
	{
		form.resetFields();
	};

	console.log(form.getFieldsValue());


	return (
		<Modal
			visible={ isVisible }
			title="Adicionar Plano"
			closable={ false }
			maskClosable={ false }
			okText="Adicionar"
			data-testid="modal-plan-product-el"
			okButtonProps={ {
				htmlType: "submit",
				disabled: loading,
				loading: loading,
			} }
			cancelButtonProps={ {
				disabled: loading,
			} }
			onOk={ () =>
			{
				form
					.validateFields()
					.then(() =>
					{
						form.submit();
					})
					.catch((info) =>
					{
						console.log("Validate Failed: ", info);
					});
			} }
			onCancel={ () =>
			{
				onReset();
				onCancel && onCancel();
			} }
		>
			<Form
				layout="vertical"
				form={ form }
				name="control-hooks"
				aria-label="container-el"
				onFinish={ onFinish }
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={ [{ required: true, max: 512, min: 2 }] }
				>
					<Input
						placeholder="Digite o nome do plano"
						aria-label="name-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="price"
					label="Preço"
					rules={ [{ required: true }] }
				>
					<InputNumber
						className="w-f"
						placeholder="Digite o preço do plano"
						aria-label="price-input-el"
						min={ 0 }
					/>
				</Form.Item>
				<Form.Item
					name="grace_period"
					label="Período de testes(dias)"
					rules={ [] }
				>
					<InputNumber
						className="w-f"
						placeholder="Digite o período de teste"
						aria-label="grace-period-input-el"
						formatter={ (value: any) => `${ value ? Math.floor(+value) : `0` }` }
						parser={ value => value ? value : 0 as any }
						min={ 0 }
						max={ 365 }
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Descrição"
					rules={ [{ max: 512, min: 0 }] }
				>
					<Input.TextArea
						placeholder="Digite a descrição do plano"
						aria-label="description-input-el"
						rows={ 4 }
					/>
				</Form.Item>
			</Form>
		</Modal >
	);
};

export default AddPlan;
