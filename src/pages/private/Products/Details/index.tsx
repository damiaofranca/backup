import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Col,
	Divider,
	Form,
	Input,
	notification,
	PageHeader,
	Popconfirm,
	Row,
	Space,
	Table,
	TableColumnType,
	Tabs,
	Tag,
} from "antd";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../../api";
import { AddPlan } from "../../../../components/Products/Plans/AddPlan";
import { EditPlan } from "../../../../components/Products/Plans/EditPlan";
import { mock, Plan } from "../model";
import { Container } from "../styles";
import { ContainerActions } from "./styles";
const { TabPane } = Tabs;

export const DetailsProduct: React.FC = () => {
	const history = useHistory();
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [tableLoading, setTableLoading] = useState(false);
	const { productId } = useParams<{ productId: string }>();
	const [editingLoading, setEditingLoading] = useState(false);
	const [isDeletingLoading, setIsDeletingLoading] = useState(false);
	const [planSelected, setPlanSelected] = useState<Plan | null>(null);
	const [isVisibleModalAdd, setIsVisibleModalAdd] = useState<boolean>(false);
	const [isVisibleModalEdit, setIsVisibleModalEdit] = useState<boolean>(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
	});

	const loadData = useCallback(async (params: any) => {
		setTableLoading(true);
		const {
			start_date,
			sortOrder,
			sortField,
			end_date,
			pageSize,
			current,
			filters,
		} = params;
		try {
			const { data } = await api.get("/api/crm/products", {
				params: {
					start_date: start_date,
					end_date: end_date,
					per_page: pageSize,
					page: current,
					id: productId,
				},
			});
			return data;
		} catch (error) {
			throw new Error("Erro ao carregar dados! " + error);
		} finally {
			setTableLoading(false);
		}
	}, []);

	const setDataFn = () => {
		let didCancel = false;
		loadData({})
			.then((response) => {
				!didCancel && setData(response);
				setTablePagination((old) => ({ ...old, total: response.length }));
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));

		return () => {
			didCancel = true;
		};
	};

	const onFinish = async (values: any) => {
		setEditingLoading(true);
		try {
			await api.put(`/api/crm/products`, {
				id: values.id,
				name: values.name,
				is_active: values.is_active,
				description: values.description,
			});

			notification.success({
				message: "Produto editado com sucesso",
			});

			setEditingLoading(false);
			setIsEditing(false);
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao editar o produto. Tente novamente., " + error,
			});
			setEditingLoading(false);
		}
	};

	const handleDelete = useCallback(async () => {
		setIsDeletingLoading(true);
		try {
			await api.delete(`/product/${productId}/`);
			notification.success({
				message: "Produto deletado com sucesso.",
			});

			form.setFieldsValue(null);

			history.goBack();
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao deletar um produto. Tente novamente., " +
					error,
			});
		} finally {
			setIsDeletingLoading(false);
		}
	}, [productId, history]);

	const handleDeletePlan = useCallback(async () => {
		try {
			await api.delete(`/api/crm/plans`);
			notification.success({
				message: "Plano deletado com sucesso.",
			});
			setDataFn();
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao deletar um plano. Tente novamente., " + error,
			});
		}
	}, [productId, history]);

	const tableCols: TableColumnType<any>[] = [
		{
			key: "id",
			title: "Nome",
			sorter: {
				compare: (a, b) => a.name.localeCompare(b.name),
			},
			render: (_, record) => {
				return <>{record.name}</>;
			},
			width: 280,
		},
		{
			key: "price",
			title: "Preço",
			dataIndex: "price",
			render: (_, record) => {
				return <>{"R$ " + record.price}</>;
			},
		},
		{
			key: "start_date",
			title: "Data de assinatura",
			dataIndex: "start_date",
			render: (_, record) => {
				return <>{format(record.start_date, "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "end_date",
			title: "Data do próximo pagamento",
			dataIndex: "end_date",
			render: (_, record) => {
				return <>{format(record.end_date, "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "is_active",
			title: "Status da assinatura",
			dataIndex: "is_active",
			render: (_, record) => {
				return (
					<Tag color={record.is_active === true ? "green" : "volcano"}>
						{record.is_active === true ? "Ativado" : "Desativado"}
					</Tag>
				);
			},
		},
		{
			key: "view",
			title: "Ações",
			width: "100px",
			align: "center",
			render: (_, record) => {
				return (
					<ContainerActions>
						<Button
							key="bt-edit"
							size="small"
							onClick={() => {
								setPlanSelected(record);
								setIsVisibleModalEdit(true);
							}}
						>
							Editar
						</Button>
						<Popconfirm
							title="Têm certeza que deseja deletar o usuário ?"
							onConfirm={handleDeletePlan}
						>
							<Button
								key="bt-delete"
								size="small"
								danger
								color="danger"
								type="primary"
							>
								deletar
							</Button>
						</Popconfirm>
					</ContainerActions>
				);
			},
		},
	];
	useEffect(() => {
		form.setFieldsValue({
			id: mock[0].id,
			name: mock[0].name,
			is_active: mock[0].is_active,
			description: mock[0].description,
		});
	}, [form]);

	return (
		<Container aria-label="container-el">
			<PageHeader title="Detalhes" onBack={() => history.goBack()}>
				<Tabs defaultActiveKey="details">
					<Tabs.TabPane tab="Dados gerais" key="details">
						<Form
							form={form}
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
											placeholder="Digite o nome do cliente"
											aria-label="name-input-el"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
								<Col md={8}>
									<Form.Item
										name="description"
										label="Descrição"
										rules={[{ required: true }]}
									>
										<Input
											placeholder="Digite sua descrição do produto"
											aria-label="description-input-el"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
								<Col md={8} style={{ display: "flex", alignItems: "center" }}>
									<Form.Item
										name="is_active"
										valuePropName="checked"
										style={{ margin: 0 }}
									>
										<Checkbox
											aria-label="product-active-check-el"
											disabled={!isEditing}
										>
											Produto ativo ?
										</Checkbox>
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
												loading={editingLoading}
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
					<TabPane tab="Planos" key="1">
						<PageHeader
							subTitle=""
							extra={[
								<Button
									aria-label="btn-reload"
									key="bt-ds-reload"
									icon={<ReloadOutlined />}
									onClick={setDataFn}
								>
									Recarregar dados
								</Button>,
								,
								<Button
									key="bt-ds-new"
									type="primary"
									icon={<PlusOutlined />}
									onClick={() => setIsVisibleModalAdd(true)}
								>
									Novo
								</Button>,
							]}
						>
							<Row style={{ marginTop: 12 }}>
								<Col md={24}>
									<Table
										size="middle"
										columns={tableCols}
										loading={tableLoading}
										dataSource={mock[0].plans}
										pagination={tablePagination}
										data-testid="table-details-product"
										rowKey={(record: any) => record.id}
									/>
								</Col>
							</Row>
						</PageHeader>
					</TabPane>
				</Tabs>
			</PageHeader>
			<AddPlan
				onCancel={() => setIsVisibleModalAdd(false)}
				isVisible={isVisibleModalAdd}
				onSubmit={setDataFn}
				idPlan={productId}
			/>
			<EditPlan
				isVisible={isVisibleModalEdit}
				onCancel={() => {
					setIsVisibleModalEdit(false);
					setPlanSelected(null);
				}}
				onSubmit={setDataFn}
				idPlan={productId}
				plan={planSelected!}
			/>
		</Container>
	);
};
