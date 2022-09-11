import { ReloadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	notification,
	PageHeader,
	Row,
	Table,
	TableColumnType,
	Tag,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import api from "../../../../api";
import { Container } from "./styles";

export interface ListOfferProps {
	customerId: string;
}

const ListPayments: React.FC<ListOfferProps> = ({ customerId }) => {
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
			const { data } = await api.get(`/crm/customer/${customerId}/payment`, {
				params: {
					page: current,
					pageSize: pageSize,
					offset: (current - 1) * pageSize,
					...(filters ? { filters } : {}),
					...(sortField ? { order_by: sortField } : {}),
					...(sortOrder ? { sort_by: sortOrder } : {}),
				},
			});
			console.log(data);
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
			sorter: true,
			key: "brand",
			title: "Marca",
			dataIndex: "brand",
		},

		{
			width: 180,
			key: "amount",
			title: "Valor",
			dataIndex: "amount",
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
		<Container data-testid="container-offers-el">
			<PageHeader
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
							data-testid="table-payments-offers-el"
							pagination={tablePagination}
							loading={tableLoading}
							columns={tableCols}
							dataSource={data}
							size="middle"
							onChange={onHandleTableChange}
						/>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};

export default ListPayments;
