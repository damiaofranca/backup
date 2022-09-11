import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	notification,
	PageHeader,
	Popconfirm,
	Row,
	Select,
	Space,
	Spin,
	Tabs,
} from "antd";
import ListOffers from "../../../../components/Products/Offers/ListOffers";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ContainerLoading } from "./styles";
import { Container } from "../styles";
import { Product } from "../model";
import api from "../../../../api";

const DetailsProduct: React.FC = () => {
	const history = useHistory();
	const [form] = Form.useForm();
	const [data, setData] = useState<Product | null>(null);

	const [partnerList] = useState([
		{
			label: "Kuack",
			value: "kuack",
		},
		{
			label: "Tucano",
			value: "tucano",
		},
	]);

	const { productId } = useParams<{ productId: string }>();
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [isEditingLoading, setIsEditingLoading] = useState(false);
	const [isDeletingLoading, setIsDeletingLoading] = useState(false);

	const loadInfo = useCallback(async () => {
		setLoading(true);
		try {
			const { data } = await api.get(`/crm/product/${productId}`);

			return data;
		} catch (error) {
			throw new Error("Erro ao carregar dados! " + error);
		} finally {
			setLoading(false);
		}
	}, [productId]);

	const handleDelete = useCallback(async () => {
		setIsDeletingLoading(true);
		try {
			await api.delete(`/crm/product/${productId}/`);
			notification.success({
				message: "Produto deletado com sucesso",
			});

			setData(null);

			history.goBack();
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao deletar o produto. Tente novamente., " + error,
			});
		} finally {
			setIsDeletingLoading(false);
		}
	}, [productId, history]);

	const onFinish = async (values: any) => {
		setIsEditingLoading(true);

		try {
			await api.patch(`/crm/product/${productId}`, values);

			notification.success({
				message: "Produto atualizado com sucesso",
			});

			const dataMerged = {
				...values,
				...data,
			};

			setIsEditing(false);

			setTimeout(setData, 10, dataMerged);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao atualizar o produto. Tente novamente., " +
					error,
			});
		} finally {
			setIsEditingLoading(false);
		}
	};

	useEffect(() => {
		let didCancel = false;
		loadInfo()
			.then((response) => {
				!didCancel && setData(response);
				!didCancel && form.setFieldsValue(response);
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));

		return () => {
			didCancel = true;
		};
	}, [form, loadInfo]);

	const loadingTemplate = (
		<ContainerLoading>
			<Spin></Spin>
		</ContainerLoading>
	);

	const loadedTemplate = (
		<>
			<PageHeader title="Detalhes" onBack={() => history.goBack()}>
				<Tabs defaultActiveKey="details">
					<Tabs.TabPane tab="Dados gerais" key="details">
						<Form
							form={form}
							onFinish={onFinish}
							layout="vertical"
							autoComplete="off"
							data-testid="form-details-product-el"
						>
							<Row gutter={16}>
								<Col md={8}>
									<Form.Item
										name="name"
										label="Nome"
										rules={[{ required: true, max: 512, min: 2 }]}
									>
										<Input
											placeholder="Digite o nome do produto"
											aria-label="name-input-el"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
								<Col md={8}>
									<Form.Item
										name="partner"
										label="Parceiro(s)"
										rules={[{ required: true }]}
									>
										<Select
											placeholder="Digite a descrição do produto"
											aria-label="partner-input-el"
											options={partnerList}
											disabled={!isEditing}
											optionLabelProp="label"
										/>
									</Form.Item>
								</Col>
								<Col span={1} />
								<Col md={8}>
									<Form.Item
										name="description"
										label="Descrição"
										rules={[{ required: true }]}
									>
										<Input.TextArea
											placeholder="Digite sua descrição do produto"
											aria-label="description-input-el"
											disabled={!isEditing}
											rows={4}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row justify="end">
								<Col aria-label="container-actions-el">
									{isEditing ? (
										<Space>
											<Button
												onClick={() => {
													setIsEditing(false);
													form.setFieldsValue(data);
												}}
												data-testId="cancel-details-edit-el"
												htmlType="button"
											>
												Cancelar
											</Button>
											<Button
												type="primary"
												htmlType="submit"
												data-testId="save-details-el"
												key={"edit-product"}
												loading={isEditingLoading}
											>
												Salvar dados
											</Button>
										</Space>
									) : null}
								</Col>
							</Row>
						</Form>
						<Row justify="end">
							{!isEditing ? (
								<Space>
									<Popconfirm
										title="Tem certeza, que deseja deletar o produto?!"
										okType="default"
										onConfirm={handleDelete}
										okText="Deletar"
										cancelText="Cancelar"
									>
										<Button
											key="bt-prod-delete"
											danger
											color="danger"
											type="primary"
										>
											Deletar
										</Button>
									</Popconfirm>

									<Button
										key={"edit-product"}
										onClick={() => setIsEditing(true)}
										disabled={isDeletingLoading}
										aria-label="edit-data-el"
										htmlType="button"
										type="primary"
									>
										Editar
									</Button>
								</Space>
							) : null}
						</Row>
					</Tabs.TabPane>
				</Tabs>
				<Divider />
				<Tabs defaultActiveKey="1">
					<Tabs.TabPane tab="Ofertas" key="1">
						<ListOffers productId={productId} />
					</Tabs.TabPane>
				</Tabs>
			</PageHeader>
		</>
	);

	return (
		<Container aria-label="container-el">
			{loading ? loadingTemplate : loadedTemplate}
		</Container>
	);
};

export default DetailsProduct;
