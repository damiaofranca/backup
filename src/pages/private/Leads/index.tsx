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
import React, { useCallback, useEffect, useState } from "react";
import api from "../../../api";
import { FilterByDate } from "../../../utils/filterByDate";
import { Container } from "./styles";

export const Leads: React.FC = (props) => {
	const defaultPageSize = 10;
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: defaultPageSize,
		showSizeChanger: true,
	});
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

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
			const { data } = await api.get("/api/crm/leads", {
				params: {
					filtered: "only_leads",
					start_date: start_date,
					end_date: end_date,
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
			key: "value",
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
			key: "utm_campaign",
			title: "UTM Campanha",
			dataIndex: "utm_campaign",
		},
		{
			key: "utm_medium",
			title: "UTM Médio",
			dataIndex: "utm_medium",
		},
		{
			key: "utm_source",
			title: "UTM Fonte",
			dataIndex: "utm_source",
		},
		{
			key: "utm_term",
			title: "UTM Termo",
			dataIndex: "utm_term",
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

	const setDataLeads = (
		start_date?: string | null,
		end_date?: string | null
	) => {
		let didCancel = false;
		loadData({
			pageSize: defaultPageSize,
			start_date: start_date,
			end_date: end_date,
			current: 1,
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
		setDataLeads();
	}, [loadData, shouldReloadTable]);

	return (
		<Container aria-label="container-el">
			<PageHeader
				title="Leads"
				subTitle=""
				extra={[
					<FilterByDate
						key={"filter"}
						onReset={() => {
							setDataLeads(null, null);
						}}
						onFilter={(start, end) => {
							setDataLeads(start, end);
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
							dataSource={data}
							columns={tableCols}
							aria-label="table-el"
							loading={tableLoading}
							pagination={tablePagination}
							onChange={onHandleTableChange}
						/>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};
