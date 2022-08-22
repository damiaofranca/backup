import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, PageHeader, Row, Table, TableColumnType } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import clientsMock from "./mock";
import { Container } from "./styles";

export const Clients: React.FC = (props) => {
	const defaultPageSize = 10;
	// const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: defaultPageSize,
		showSizeChanger: true,
	});
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

	// const loadData = useCallback(async (params: any) => {
	// 	setTableLoading(true);
	// 	const { current, pageSize, sortField, sortOrder, filters } = params;
	// 	try {
	// 		const { data } = await api.get("/api/crm/accounts", {
	// 			params: {
	// 				per_page: pageSize,
	// 				page: current,
	// 			},
	// 		});
	// 		return data;
	// 	} catch (error) {
	// 		throw new Error("Erro ao carregar dados! " + error);
	// 	} finally {
	// 		setTableLoading(false);
	// 	}
	// }, []);

	const tableCols: TableColumnType<any>[] = [
		{
			key: "id",
			title: "Nome",
			dataIndex: "name",
			sorter: {
				compare: (a, b) => a.name.localeCompare(b.name),
			},
		},
		{
			key: "email",
			title: "Email",
			dataIndex: "email",
		},
		{
			key: "last_four_numbers",
			title: "Final do numero",
			dataIndex: "last_four_numbers",
		},
		{
			key: "birth_date",
			title: "Data de nascimento",
			dataIndex: "birth_date",
		},
		{
			key: "view",
			title: "Ações",
			width: "100px",
			align: "center",
			render: (_, record) => {
				return (
					<Link to={`/clients/${record.id}`}>
						<Button key="bt-view" size="small">
							Detalhes
						</Button>
					</Link>
				);
			},
		},
	];

	// const onHandleTableChange = (pagination: any, filters: any, sorter: any) => {
	// 	if (!pagination) return;
	// 	let newFilters: any = {};
	// 	for (const key in filters) {
	// 		if (filters[key] === null) continue;
	// 		const value = filters[key];
	// 		if (value.length > 1) {
	// 			newFilters[key] = value;
	// 			continue;
	// 		}
	// 		newFilters[key] = value[0];
	// 	}

	// 	loadData({
	// 		sortField: sorter.field,
	// 		sortOrder: sorter.order,
	// 		...pagination,
	// 		filters: newFilters,
	// 	})
	// 		.then((response) => {
	// 			setTablePagination((old) => ({
	// 				...old,
	// 				...pagination,
	// 				total: response.total,
	// 			}));
	// 			setData(response.data);
	// 		})
	// 		.catch(() => notification.error({ message: "Erro ao carregar dados!" }));
	// };

	// useEffect(() => {
	// 	let didCancel = false;
	// 	loadData({
	// 		current: 1,
	// 		pageSize: defaultPageSize,
	// 	})
	// 		.then((response) => {
	// 			!didCancel && setData(response.data);
	// 			setTablePagination((old) => ({ ...old, total: response.total }));
	// 		})
	// 		.catch(() => notification.error({ message: "Erro ao carregar dados!" }));

	// 	return () => {
	// 		didCancel = true;
	// 	};
	// }, [loadData, shouldReloadTable]);

	return (
		<Container>
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
							size="middle"
							rowKey={(record: any) => record.id}
							dataSource={clientsMock}
							columns={tableCols}
							loading={tableLoading}
							pagination={tablePagination}
						/>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};
