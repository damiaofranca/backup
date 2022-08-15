import { ReloadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	notification,
	PageHeader,
	Row,
	Table,
	TableColumnType,
	Tabs,
} from "antd";
import { Container } from "./styles";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../../../api";
const { TabPane } = Tabs;
interface DetailsProps {}

export const Details: React.FC<DetailsProps> = (props) => {
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
	});
	const loadData = useCallback(async (params: any) => {
		setTableLoading(true);
		const { current, pageSize, sortField, sortOrder, filters } = params;
		try {
			const { data } = await api.get("/api/crm/accounts", {
				params: {
					per_page: pageSize,
					page: current,
				},
			});
			return data;
		} catch (error) {
			throw new Error("Erro ao carregar dados! " + error);
		} finally {
			setTableLoading(false);
		}
	}, []);

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
	];

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

	useEffect(() => {
		let didCancel = false;
		loadData({
			current: 1,
			pageSize: 10,
		})
			.then((response) => {
				!didCancel && setData(response.data);
				setTablePagination((old) => ({ ...old, total: response.total }));
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));

		return () => {
			didCancel = true;
		};
	}, [loadData, shouldReloadTable]);

	return (
		<Container>
			<PageHeader
				title="Detalhes"
				subTitle=""
				extra={[
					<Button
						key="bt-ds-reload"
						icon={<ReloadOutlined />}
						onChange={onHandleReloadData}
					>
						Recarregar dados
					</Button>,
				]}
			>
				<Row style={{ marginTop: 12 }}>
					<Col md={24}>
						<Tabs defaultActiveKey="1">
							<TabPane tab="Assinaturas" key="1">
								<Table
									size="middle"
									rowKey={(record: any) => record.id}
									dataSource={data}
									columns={tableCols}
									loading={tableLoading}
									pagination={tablePagination}
									onChange={onHandleTableChange}
								/>{" "}
							</TabPane>
							<TabPane tab="Informações do cliente" key="2">
								Content of Tab Pane 2
							</TabPane>
						</Tabs>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};
