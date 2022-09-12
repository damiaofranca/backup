import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	notification,
	PageHeader,
	Row,
	Space,
	Table,
	TableColumnType,
	Tabs,
} from "antd";
import { format } from "date-fns";
import { ReloadOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../../api";
import {
	formatCPF,
	formatPhoneNumber,
	formatPrice,
} from "../../../../utils/functions";
import { Container } from "./styles";
import ListPayments from "../../../../components/Clients/Details/ListPayments";
import Filter from "../../../../components/Clients/Details/filter";
const { TabPane } = Tabs;
interface DetailsProps {}

const ClientDetails: React.FC<DetailsProps> = () => {
	const defaultPageSize = 10;
	const history = useHistory();
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const { clientId } = useParams<{ clientId: string }>();
	const [tableLoading, setTableLoading] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
	});
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);
	const loadData = useCallback(async () => {
		setTableLoading(true);
		try {
			const { data } = await api.get(`/crm/customer/${clientId}`, {});
			form.setFieldsValue({
				name: data.name,
				email: data.email,
				document: formatCPF(data.document),
				phone: formatPhoneNumber(data.phone),
			});
		} catch (error) {
			throw new Error("Erro ao carregar dados! " + error);
		} finally {
			setTableLoading(false);
		}
	}, []);

	const loadDataSubscription = useCallback(async (params: any) => {
		setTableLoading(true);
		const { sortOrder, sortField, pageSize, current, filters } = params;
		try {
			const { data } = await api.get(`/crm/customer/${clientId}/subscription`, {
				params: {
					page: current,
					per_page: pageSize,
					...(filters ? { filters } : {}),
					offset: (current - 1) * pageSize,
					...(sortField ? { order_by: sortField } : {}),
					...(sortOrder ? { sort_by: sortOrder } : {}),
				},
			});
			return data;
		} catch (error) {
			throw new Error("Erro ao carregar dados! " + error);
		} finally {
			setTableLoading(false);
		}
	}, []);

	const onHandleTableChange = (pagination: any, filters: any, sorter: any) => {
		if (!pagination) return;
		let newFilters: any = {};
		for (const key in filters) {
			if (filters[key] === null) continue;
			const value = filters[key];
			if (value.length > 1) {
				newFilters[key] = value;
				continue;
			}
			newFilters[key] = value[0];
		}

		loadDataSubscription({
			sortField: sorter.field === "id" ? "name" : sorter.field,
			sortOrder: sorter.order,
			...pagination,
			filters: newFilters,
		})
			.then((response) => {
				setTablePagination((old) => ({
					...old,
					...pagination,
					total: response.total,
				}));
				setData(response.data);
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));
	};

	const tableCols: TableColumnType<any>[] = [
		{
			key: "id",
			width: 240,
			sorter: true,
			title: "Oferta",
			dataIndex: "id",
			render: (_, record) => {
				return <>{record.offer.name}</>;
			},
		},
		{
			width: 180,
			key: "price",
			title: "Preço",
			render: (_, record) => {
				return <>{formatPrice(record.offer.price)}</>;
			},
		},
		{
			width: 180,
			key: "start_date",
			title: "Data de Assínatura",
			render: (_, record) => {
				return <>{format(new Date(record.start_date), "dd/MM/yyyy")}</>;
			},
		},
		{
			width: 180,
			key: "end_date",
			title: "Data de Expiração",
			render: (_, record) => {
				return <>{format(new Date(record.end_date), "dd/MM/yyyy")}</>;
			},
		},
		{
			width: 180,
			title: "Dt fim de carência",
			key: "grace_period_end_date",
			render: (_, record) => {
				return (
					<>{format(new Date(record.grace_period_end_date), "dd/MM/yyyy")}</>
				);
			},
		},
	];

	const setDataSubscriptions = (filters?: any) => {
		let didCancel = false;
		loadDataSubscription({
			pageSize: defaultPageSize,
			current: 1,
			filters,
		})
			.then((response) => {
				!didCancel && setData(response.data);
				setTablePagination((old) => ({ ...old, total: response.total }));
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));

		return () => {
			didCancel = true;
		};
	};

	useEffect(() => {
		loadData();
	}, [clientId]);

	useEffect(() => {
		setDataSubscriptions(null);
	}, [loadDataSubscription, shouldReloadTable]);

	return (
		<Container aria-label="container-el">
			<PageHeader title="Detalhes" onBack={() => history.goBack()}>
				<Tabs defaultActiveKey="details">
					<Tabs.TabPane tab="Dados gerais" key="details">
						<Form
							form={form}
							layout="vertical"
							autoComplete="off"
							data-testid="form-el"
						>
							<Col md={16}>
								<Row gutter={20}>
									<Col md={8}>
										<Form.Item name="name" label="Nome">
											<Input
												placeholder="Digite o nome do cliente"
												aria-label="name-input-el"
												disabled={!isEditing}
											/>
										</Form.Item>
									</Col>
									<Col md={8}>
										<Form.Item name="document" label="Documento">
											<Input
												placeholder="Digite o email do cliente"
												aria-label="email-input-el"
												disabled={!isEditing}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={20}>
									<Col md={8}>
										<Form.Item name="email" label="Email">
											<Input
												placeholder="Digite o email do cliente"
												aria-label="email-input-el"
												disabled={!isEditing}
											/>
										</Form.Item>
									</Col>
									<Col md={8}>
										<Form.Item name="phone" label="Telefone">
											<Input
												placeholder="Digite o telefone do cliente"
												disabled={!isEditing}
											/>
										</Form.Item>
									</Col>
								</Row>
							</Col>
							<Row justify="end">
								<Col aria-label="container-actions-el">
									{isEditing ? (
										<Space>
											<Button
												onClick={() => {
													setIsEditing(false);
													form.setFieldsValue(data);
												}}
												htmlType="button"
											>
												Cancelar
											</Button>
											<Button type="primary" htmlType="submit">
												Salvar dados
											</Button>
										</Space>
									) : null}
								</Col>
							</Row>
						</Form>
					</Tabs.TabPane>
				</Tabs>
				<Divider />
				<Tabs defaultActiveKey="1">
					<TabPane tab="Assinaturas" key="1">
						<PageHeader
							subTitle=""
							extra={[
								<Filter
									key={"filter"}
									onReset={() => {
										setDataSubscriptions(null);
									}}
									onFilter={(filters) => {
										setDataSubscriptions(filters);
									}}
								/>,
								<Button
									key="bt-ds-reload"
									icon={<ReloadOutlined />}
									onClick={onHandleReloadData}
								>
									Recarregar dados
								</Button>,
							]}
						>
							<Row style={{ marginTop: 12 }}>
								<Col md={24}>
									<Table
										size="middle"
										rowKey={(record: any) => record.id}
										onChange={onHandleTableChange}
										pagination={tablePagination}
										loading={tableLoading}
										aria-label="table-el"
										columns={tableCols}
										dataSource={data}
									/>
								</Col>
							</Row>
						</PageHeader>
					</TabPane>
					<TabPane tab="Pagamentos" key="2">
						<ListPayments customerId={clientId} />
					</TabPane>
				</Tabs>
			</PageHeader>
		</Container>
	);
};

export default ClientDetails;
