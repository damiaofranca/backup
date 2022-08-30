import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
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
import { AddPartner } from "../../../components/Partners/AddPartner";
import { Container } from "./styles";

export const Partners: React.FC = (props) => {
	const defaultPageSize = 10;
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: defaultPageSize,
		showSizeChanger: true,
	});
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

	const loadData = useCallback(async () => {
		setTableLoading(true);
		try {
			const { data } = await api.get("/api/crm/partners", {});
			return data;
		} catch (error) {
			throw new Error("Erro ao carregar dados! " + error);
		} finally {
			setTableLoading(false);
		}
	}, []);

	const tableCols: TableColumnType<any>[] = [
		{
			key: "name",
			title: "Nome",
			dataIndex: "name",
			sorter: true,
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

		loadData()
			.then((response) => {
				setTablePagination((old) => ({
					...old,
					...pagination,
					total: response.length,
				}));
				setData(response);
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));
	};

	useEffect(() => {
		let didCancel = false;

		loadData()
			.then((response) => {
				!didCancel && setData(response);
				setTablePagination((old) => ({ ...old, total: response.length }));
			})
			.catch(() => notification.error({ message: "Erro ao carregar dados!" }));

		return () => {
			didCancel = true;
		};
	}, [loadData, shouldReloadTable]);

	return (
		<Container aria-label="container-el">
			<PageHeader
				title="Parceiros"
				subTitle=""
				extra={[
					<Button
						key="bt-ds-reload"
						icon={<ReloadOutlined />}
						onClick={onHandleReloadData}
					>
						Recarregar dados
					</Button>,
					<Button
						key="bt-ds-new"
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => setIsVisible(true)}
						data-testid="new-partner-el"
					>
						Novo
					</Button>,
				]}
			>
				<Row style={{ marginTop: 12 }}>
					<Col md={24}>
						<Table
							size="middle"
							data-testid="table-partners-el"
							rowKey={(record: any) => record.value}
							dataSource={data}
							columns={tableCols}
							loading={tableLoading}
							pagination={tablePagination}
							onChange={onHandleTableChange}
						/>
					</Col>
				</Row>
			</PageHeader>
			<AddPartner
				data-testid="modal-add-partner"
				isVisible={isVisible}
				onSubmit={() => {
					setIsVisible(false);
					onHandleReloadData();
				}}
				onCancel={() => setIsVisible(false)}
			/>
		</Container>
	);
};
