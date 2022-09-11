import { ReloadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	notification,
	PageHeader,
	Row,
	Table,
	TableColumnType,
} from "antd";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../../api";
import { formatPhoneNumber } from "../../../utils/functions";
import { Container } from "./styles";

interface ClientsProps {}

const Clients: React.FC<ClientsProps> = () => {
	const defaultPageSize = 10;
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
	});
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

	const loadData = useCallback(async (params: any) => {
		setTableLoading(true);
		const { sortOrder, sortField, pageSize, current, filters } = params;
		try {
			const { data } = await api.get("/crm/customer", {
				params: {
					page: current,
					pageSize: pageSize,
					offset: (current - 1) * pageSize,
					...(filters ? { filters } : {}),
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

		loadData({
			sortField: sorter.field,
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
			title: "Nome",
			sorter: true,
			render: (_: any, record) => {
				return <>{record.name}</>;
			},
		},
		{
			key: "email",
			title: "Email",
			dataIndex: "email",
			sorter: true,
		},

		{
			width: 180,
			key: "phone",
			title: "Telefone",
			render: (_: any, record) => {
				return <>{formatPhoneNumber(record.phone)}</>;
			},
		},

		{
			width: 180,
			key: "created_at",
			title: "Dt de Criação",
			dataIndex: "created_at",
			render: (_: any, record) => {
				return <>{format(new Date(record.created_at), "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "view",
			title: "Ações",
			width: "100px",
			align: "center",
			render: (_, record) => {
				return (
					<>
						<Link to={`/clients/${record.id}`}>
							<Button key="bt-view" size="small">
								Detalhes
							</Button>
						</Link>
					</>
				);
			},
		},
	];

	useEffect(() => {
		let didCancel = false;
		loadData({
			current: 1,
			pageSize: defaultPageSize,
		})
			.then((response) => {
				!didCancel && setData(response.data);
				setTablePagination((old) => ({ ...old, total: response.total }));
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));
	}, [loadData, shouldReloadTable]);

	return (
		<Container data-testid="container-el">
			<PageHeader
				title="Clientes"
				subTitle=""
				extra={[
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
							rowKey={(record: any) => record.id}
							onChange={onHandleTableChange}
							data-testid="table-client-el"
							pagination={tablePagination}
							loading={tableLoading}
							columns={tableCols}
							dataSource={data}
							size="middle"
						/>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};

export default Clients;
