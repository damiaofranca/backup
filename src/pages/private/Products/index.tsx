import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	PageHeader,
	Row,
	Table,
	TableColumnType,
	Tag,
} from "antd";
import { format } from "date-fns";
import { productMock } from "../Clients/Details/mock";

import { useState } from "react";
import { DescriptionShorter } from "../../../utils/description";
import { Container } from "./styles";

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = () => {
	const [tableLoading, setTableLoading] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
	});

	const tableCols: TableColumnType<any>[] = [
		{
			key: "id",
			title: "Nome",
			sorter: {
				compare: (a, b) => a.name.localeCompare(b.name),
			},
			render: (_: any, record) => {
				return <>{record.name}</>;
			},
			width: 280,
		},
		{
			key: "description",
			title: "Descrição do produto",
			dataIndex: "description",
			render: (_: any, record) => {
				return (
					<DescriptionShorter description={record.description} limit={36} />
				);
			},
			width: 300,
		},
		{
			key: "price",
			title: "Preço",
			dataIndex: "price",
			render: (_: any, record) => {
				return <>{record.price + " R$"}</>;
			},
		},
		{
			key: "grace_period",
			title: "Periodo de teste",
			dataIndex: "grace_period",
			render: (_: any, record) => {
				return <>{record.grace_period + " dias"}</>;
			},
		},
		{
			key: "number_of_devices",
			title: "Número de dispositivo",
			dataIndex: "number_of_devices",
			render: (_: any, record) => {
				return <>{record.number_of_devices}</>;
			},
		},
		{
			key: "created_at",
			title: "Criado em",
			dataIndex: "created_at",
			render: (_: any, record) => {
				return <>{format(new Date(record.created_at), "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "is_active",
			title: "Status do plano",
			dataIndex: "is_active",
			render: (_: any, record) => {
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
					<Button key="bt-view" size="small">
						Editar
					</Button>
				);
			},
		},
	];

	return (
		<Container>
			<PageHeader
				title="Produtos"
				subTitle=""
				extra={[
					<Button key="bt-ds-reload" icon={<ReloadOutlined />}>
						Recarregar dados
					</Button>,
					<Button key="bt-ds-new" type="primary" icon={<PlusOutlined />}>
						Novo
					</Button>,
				]}
			>
				<Row style={{ marginTop: 12 }}>
					<Col md={24}>
						<Table
							size="middle"
							rowKey={(record: any) => record.id}
							dataSource={productMock}
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
