import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	notification,
	PageHeader,
	Popconfirm,
	Row,
	Table,
	TableColumnType,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../../api";
import { AddUser } from "../../../components/Users/AddUsers";
import { EditUser } from "../../../components/Users/EditUser";
import { Container, ContainerActions } from "./styles";

export const Users: React.FC = (props) => {
	const defaultPageSize = 10;
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		showSizeChanger: true,
		pageSize: defaultPageSize,
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [userInfo, setUserInfo] = useState<{
		name: string | null;
		email: string | null;
		id: string | null;
		admin: boolean;
	}>({
		admin: false,
		email: null,
		name: null,
		id: null,
	});
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

	const clearUserInfo = () => {
		setUserInfo({
			id: null,
			name: null,
			email: null,
			admin: false,
		});
	};

	const sendEmailToReset = async (idUser: string) => {
		try {
			await api.post(`/public/user/${idUser}/change-password`);
			notification.success({ message: "Email enviado com sucesso!" });
		} catch (error) {
			notification.error({ message: "Erro ao enviar dados!" });
			throw new Error("Erro ao enviar dados! " + error);
		}
	};
	//
	const deleteUser = async (id: string) => {
		try {
			await api.delete(`crm/user/${id}`);
			await loadData({
				current: 1,
				pageSize: defaultPageSize,
			})
				.then((response) => {
					setData(response.data);
					setTablePagination((old) => ({ ...old, total: response.total }));
				})
				.catch(() =>
					notification.error({ message: "Erro ao carregar dados!" })
				);
			notification.success({ message: "Usuário deletado com sucesso!" });
		} catch (error) {
			notification.error({ message: "Erro ao deletar usuário!" });
			throw new Error("Erro ao deletar usuário! " + error);
		}
	};

	const loadData = useCallback(async (params: any) => {
		setTableLoading(true);
		const { current, pageSize, sortField, sortOrder, filters } = params;
		try {
			const { data } = await api.get("crm/user", {
				params: {
					current,
					pageSize,
					page: current,
					per_page: pageSize,
					...(filters ? { filters } : {}),
					offset: (current - 1) * pageSize,
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

	const tableCols: TableColumnType<any>[] = [
		{
			dataIndex: "name",
			title: "Nome",
			sorter: true,
			key: "id",
		},
		{
			dataIndex: "email",
			title: "Email",
			sorter: true,
			key: "email",
		},
		{
			key: "view",
			title: "Ações",
			width: "100px",
			align: "center",
			render: (_, record) => {
				return (
					<ContainerActions>
						<Button
							key="bt-edit"
							size="small"
							onClick={() => {
								setUserInfo({
									id: record.id,
									name: record.name,
									email: record.email,
									admin: record.admin,
								});
							}}
						>
							Editar
						</Button>
						<Popconfirm
							title="Têm certeza que deseja trocar a senha ?"
							onConfirm={() => sendEmailToReset(record.id)}
						>
							<Button key="bt-change-password" size="small">
								Alterar senha
							</Button>
						</Popconfirm>
						<Popconfirm
							title="Têm certeza que deseja deletar o usuário ?"
							onConfirm={() => {
								deleteUser(record.id);
							}}
						>
							<Button
								key="bt-delete"
								size="small"
								type="primary"
								color="danger"
								danger
							>
								deletar
							</Button>
						</Popconfirm>
					</ContainerActions>
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
		<Container aria-label="container-el">
			<AddUser
				isVisible={isVisible}
				onSubmit={() => {
					setIsVisible(false);
					onHandleReloadData();
				}}
				onCancel={() => setIsVisible(false)}
			/>

			<EditUser
				isVisible={userInfo.name !== null ? true : false}
				onSubmit={() => {
					onHandleReloadData();
				}}
				user={userInfo}
				onCancel={clearUserInfo}
			/>
			<PageHeader
				title="Usuários"
				subTitle=""
				extra={[
					<Button
						onClick={onHandleReloadData}
						data-testid="load-data-el"
						icon={<ReloadOutlined />}
						key="bt-ds-reload"
					>
						Recarregar dados
					</Button>,
					<Button
						onClick={() => setIsVisible(true)}
						data-testid="new-data-el"
						icon={<PlusOutlined />}
						key="bt-ds-new"
						type="primary"
					>
						Novo
					</Button>,
				]}
			>
				<Row style={{ marginTop: 12 }}>
					<Col md={24}>
						<Table
							rowKey={(record: any) => record.id}
							onChange={onHandleTableChange}
							pagination={tablePagination}
							loading={tableLoading}
							data-testid="table-users-el"
							columns={tableCols}
							dataSource={data}
							size="middle"
						/>
					</Col>
				</Row>
			</PageHeader>
		</Container>
	);
};
