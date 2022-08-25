import { documentCPF, phoneNumber } from "../../../../utils/validators";
import { DescriptionShorter } from "../../../../utils/description";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "./styles";
import { format } from "date-fns";
import mockDetail from "./mock";
import {
	TableColumnType,
	PageHeader,
	Divider,
	Button,
	Input,
	Space,
	Table,
	Form,
	Tabs,
	Col,
	Row,
	Tag,
} from "antd";
const { TabPane } = Tabs;
interface DetailsProps {}

export const Details: React.FC<DetailsProps> = () => {
	const history = useHistory();
	const [form] = Form.useForm();
	const [data, setData] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [tableLoading, setTableLoading] = useState(false);
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
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
				compare: (a, b) => a.plan.name.localeCompare(b.plan.name),
			},
			render: (_, record) => {
				return <>{record.plan.name}</>;
			},
			width: 280,
		},
		{
			key: "description",
			title: "Descrição do produto",
			dataIndex: "description",
			render: (_, record) => {
				return (
					<DescriptionShorter
						description={record.plan.description}
						limit={36}
					/>
				);
			},
			width: 300,
		},
		{
			key: "price",
			title: "Preço",
			dataIndex: "price",
			render: (_, record) => {
				return <>{record.plan.price + " R$"}</>;
			},
		},
		{
			key: "start_date",
			title: "Data de aquisição",
			dataIndex: "start_date",
			render: (_, record) => {
				return <>{format(new Date(record.start_date), "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "validate_date",
			title: "Data de expiração",
			dataIndex: "validate_date",
			render: (_, record) => {
				return <>{format(new Date(record.validate_date), "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "end_date",
			title: "Data do próximo pagamento",
			dataIndex: "end_date",
			render: (_, record) => {
				return <>{format(new Date(record.end_date), "dd/MM/yyyy")}</>;
			},
		},
		{
			key: "is_active",
			title: "Status da assinatura",
			dataIndex: "is_active",
			render: (_, record) => {
				return (
					<Tag color={record.is_active === true ? "green" : "volcano"}>
						{record.is_active === true ? "Ativado" : "Desativado"}
					</Tag>
				);
			},
		},
	];
	useEffect(() => {
		form.setFieldsValue({
			name: mockDetail.name,
			email: mockDetail.email,
			document: mockDetail.document,
			phone_number: mockDetail.phone_number,
		});
	}, [form]);

	return (
		<Container data-testid="container-el">
			<PageHeader title="Detalhes" onBack={() => history.goBack()}>
				<Tabs defaultActiveKey="details">
					<Tabs.TabPane tab="Dados gerais" key="details">
						<Form
							form={form}
							layout="vertical"
							autoComplete="off"
							data-testid="form-el"
						>
							<Row gutter={16}>
								<Col md={8}>
									<Form.Item
										name="name"
										label="Nome"
										rules={[{ required: true, max: 512, min: 2 }]}
									>
										<Input
											placeholder="Digite o nome do cliente"
											data-testid="name-input-el"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
								<Col md={8}>
									<Form.Item
										name="email"
										label="Email"
										rules={[{ required: true, type: "email" }]}
									>
										<Input
											placeholder="Digite o email do cliente"
											data-testid="email-input-el"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
								<Col md={8}>
									<Form.Item
										name="document"
										label="Documento"
										rules={[{ required: true }, { validator: documentCPF }]}
									>
										<Input
											placeholder="Digite o documento do cliente"
											data-testid="document-input-el"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
								<Col md={8}>
									<Form.Item
										name="phone_number"
										label="Telefone"
										rules={[
											{
												required: true,
												max: 512,
												min: 2,
												validator: phoneNumber,
											},
										]}
									>
										<Input
											placeholder="Digite o telefone do cliente"
											disabled={!isEditing}
										/>
									</Form.Item>
								</Col>
							</Row>
							<Row justify="end">
								<Col data-testid="container-actions-el">
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
						<Table
							size="middle"
							rowKey={(record: any) => record.id}
							dataSource={mockDetail.subscription}
							pagination={tablePagination}
							loading={tableLoading}
							columns={tableCols}
							data-testid="table-el"
						/>
					</TabPane>
				</Tabs>
			</PageHeader>
		</Container>
	);
};
