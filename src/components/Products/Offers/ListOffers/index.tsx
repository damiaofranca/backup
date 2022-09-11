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
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../api";
import AddOffer from "../AddOffer";
import { DescriptionShorter } from "../../../../utils/description";
import { Container, ContainerActions } from "./styles";
import { formatPrice } from "../../../../utils/functions";
import EditOffer from "../EditOffer";
import { Offer } from "../../../../pages/private/Products/model";

export interface ListOfferProps {
	productId: string;
}

const ListOffers: React.FC<ListOfferProps> = ({ productId }) => {
	const defaultPageSize = 10;
	const [data, setData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const [shouldReloadTable, setShouldReloadTable] = useState(false);
	const [tablePagination, setTablePagination] = useState({
		current: 1,
		pageSize: 10,
		showSizeChanger: true,
	});
	const [productSelected, setProductSelected] = useState<Offer | null>(null);

	const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

	const loadData = useCallback(async (params: any) => {
		setTableLoading(true);
		const { sortOrder, sortField, pageSize, current, filters } = params;
		try {
			const { data } = await api.get(`/crm/offer/${productId}`, {
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

	const handleDelete = useCallback(async (offerID: string) => {
		try {
			await api.delete(`/crm/offer/${offerID}`);
			onHandleReloadData();
			notification.success({
				message: "Oferta deletada com sucesso",
			});
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao deletar a oferta. Tente novamente., " + error,
			});
		}
	}, []);

	const tableCols: TableColumnType<any>[] = [
		{
			key: "id",
			width: 300,
			title: "Nome",
			dataIndex: "name",
		},
		{
			sorter: true,
			key: "description",
			title: "Descrição",
			dataIndex: "description",
			render: (_: any, record) => {
				return (
					<DescriptionShorter description={record.description} limit={36} />
				);
			},
		},

		{
			width: 180,
			key: "grace_period",
			title: "Período de Testes",
			dataIndex: "grace_period",
			render: (_: any, record) => {
				return <>{record.grace_period + " Dias"}</>;
			},
		},
		{
			width: 180,
			key: "price",
			title: "Preço",
			render: (_, record) => {
				return <>{formatPrice(record.price)}</>;
			},
		},
		{
			width: 180,
			key: "created_at",
			title: "Dt de Criação",
			dataIndex: "created_at",
			render: (_: any, record) => {
				return <>{format(new Date(record.created_at), "dd/MM/yyyy")}</>;
			},
		},
		{
			width: 180,
			key: "view",
			title: "Ações",
			align: "center",
			render: (_, record) => {
				return (
					<ContainerActions>
						<Button
							key="bt-edit"
							size="small"
							onClick={() => {
								setProductSelected(record);
							}}
						>
							Editar
						</Button>
						<Popconfirm
							title="Têm certeza que deseja deletar está oferta ?"
							onConfirm={() => {
								handleDelete(record.id);
							}}
						>
							<Button
								key="bt-delete"
								type="primary"
								color="danger"
								size="small"
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
					<Button
						key="bt-ds-new"
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => setIsVisibleModal(true)}
					>
						Novo
					</Button>,
				]}
			>
				<Row style={{ marginTop: 12 }}>
					<Col md={24}>
						<Table
							rowKey={(record: any) => record.id}
							data-testid="table-product-offers-el"
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
			<AddOffer
				onCancel={() => setIsVisibleModal(false)}
				onSubmit={onHandleReloadData}
				isVisible={isVisibleModal}
				productId={productId}
			/>
			<EditOffer
				isVisible={
					productSelected && productSelected.name !== null ? true : false
				}
				onCancel={() => {
					setProductSelected(null);
				}}
				onSubmit={onHandleReloadData}
				offer={productSelected!}
			/>
		</Container>
	);
};

export default ListOffers;
