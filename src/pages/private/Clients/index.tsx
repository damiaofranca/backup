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
							pagination={tablePagination}
							dataSource={clientsMock}
							loading={tableLoading}
							data-testid="table-el"
							columns={tableCols}
							size="middle"
						/>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};
