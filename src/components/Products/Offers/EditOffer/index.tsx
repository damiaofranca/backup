import { Form, Input, Modal, notification } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import api from "../../../../api";
import { Offer } from "../../../../pages/private/Products/model";

interface AddPartnerProps {
	onCancel: () => void;
	onSubmit: () => void;
	isVisible: boolean;
	offer: Offer;
}

const EditOffer: React.FC<AddPartnerProps> = ({
	onCancel,
	onSubmit,
	isVisible,
	offer,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await api.patch(`/crm/offer/${offer.id}`, {
				...values,
			});

			notification.success({
				message: "Oferta editada com sucesso",
			});
			onCancel();
			onReset();
			onSubmit && onSubmit();

			setLoading(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao editar a oferta. Tente novamente., " + error,
			});
			setLoading(false);
		}
	};

	const onReset = () => {
		form.resetFields();
	};

	useEffect(() => {
		if (offer) {
			form.setFieldsValue({
				name: offer.name,
				price: offer.price,
				description: offer.description,
				grace_period: offer.grace_period,
			});
		}
	}, [offer]);

	return (
		<Modal
			visible={isVisible}
			title="Editar Oferta"
			closable={false}
			maskClosable={false}
			okText="Editar"
			data-testid="modal-offer-product-el"
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
						placeholder="Digite o nome do oferta"
						aria-label="name-input-el"
					/>
				</Form.Item>
				<Form.Item
					name="price"
					label="Preço"
					rules={[{ required: true, max: 512, min: 0 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o preço do oferta"
						aria-label="price-input-el"
						min={0}
					/>
				</Form.Item>
				<Form.Item
					name="grace_period"
					label="Período de testes(dias)"
					rules={[{ max: 365, min: 0 }]}
				>
					<Input
						type={"number"}
						placeholder="Digite o período de teste"
						aria-label="grace-period-input-el"
						min={0}
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Descrição"
					rules={[{ required: true, max: 512, min: 2 }]}
				>
					<Input.TextArea
						placeholder="Digite a descrição do oferta"
						aria-label="description-input-el"
						rows={4}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditOffer;
