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
import Filter from "./filter";
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

	const paymentsStatus = (status: string) => {
		switch (status) {
			case "success":
				return <Tag color="green">Succeso</Tag>;
			case "canceled":
				return <Tag color="red">Erro</Tag>;
			case "not_captured":
				return <Tag color="volcano">Não Capturado</Tag>;
			case "payment_unauthorized":
				return <Tag color="orange">Pagamento Não Autorizado</Tag>;
			case "payment_fraud":
				return <Tag color="orange">Fraude no pagamento</Tag>;
			case "payment_error":
				return <Tag color="orange">erro no pagamento</Tag>;
		}
	};

	const tableCols: TableColumnType<any>[] = [
		{
			width: 400,
			sorter: true,
			title: "Oferta",
			key: "offer_name",
			dataIndex: "offer_name",
		},
		{
			width: 300,
			sorter: true,
			key: "brand",
			title: "Bandeira",
			dataIndex: "brand",
		},

		{
			width: 300,
			key: "amount",
			title: "Valor",
			dataIndex: "amount",
		},

		{
			width: 300,
			key: "amount",
			title: "Status do Pagamento",
			dataIndex: "amount",
			render: (_: any, record) => {
				return <>{paymentsStatus(record.payment_status)}</>;
			},
		},
	];

	const setDataSubscriptions = (filters?: any) => {
		let didCancel = false;
		loadData({
			filters,
			current: 1,
			pageSize: defaultPageSize,
		})
			.then((response) => {
				!didCancel && setData(response.data);
				setTablePagination((old) => ({ ...old, total: response.total }));
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));
	};

	useEffect(() => {
		setDataSubscriptions();
	}, [loadData, shouldReloadTable]);

	return (
		<Container data-testid="container-offers-el">
			<PageHeader
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
