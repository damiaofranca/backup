import {
	Button,
	Col,
	notification,
	PageHeader,
	Row,
	Table,
	TableColumnType,
} from "antd";
import api from "../../../api";
import { Container } from "./styles";
import { AddUser } from "../../../components/Users/AddUsers";
import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { EditPassword } from "../../../components/Users/EditPassword";

export const Users: React.FC = (props) => {
	const defaultPageSize = 10;
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: defaultPageSize,
		showSizeChanger: true,
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isVisibleUpdatePassword, setIsVisibleUpdatePassword] =
		useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{ token: string }>({
		token: "",
	});
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

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
		{
			key: "phone_number",
			title: "Telefone",
			dataIndex: "phone_number",
			render: (_, record) => {
				return record.phone_number ? record.phone_number : "Não registrado";
			},
		},
		{
			key: "view",
			title: "Ações",
			width: "100px",
			align: "center",
			render: (_, record) => {
				return (
					<Button
						key="bt-view"
						size="small"
						onClick={() => {
							setUserInfo({ token: record.id });
							setIsVisibleUpdatePassword(true);
						}}
					>
						Trocar senha
					</Button>
				);
			},
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
			pageSize: defaultPageSize,
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
			<AddUser
				isVisible={isVisible}
				onSubmit={() => {
					setIsVisible(false);
					onHandleReloadData();
				}}
				onCancel={() => setIsVisible(false)}
			/>

			<EditPassword
				isVisible={isVisibleUpdatePassword}
				onSubmit={() => {
					setIsVisibleUpdatePassword(false);
					onHandleReloadData();
				}}
				user={userInfo}
				onCancel={() => setIsVisibleUpdatePassword(false)}
			/>
			<PageHeader
				title="Usuários"
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
					>
						Novo
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
