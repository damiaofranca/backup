import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, notification, PageHeader, Row, Table, TableColumnType } from "antd";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../api";
import AddPlan from "../AddPlan";
import { DescriptionShorter } from "../../../../utils/description";
import { Container } from "./styles";

export interface ListPlansProps
{
  productId: string;
}

const ListPlans: React.FC<ListPlansProps> = ({ productId }) =>
{
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

  const loadData = useCallback(async (params: any) =>
  {
    setTableLoading(true);
    const { sortOrder, sortField, pageSize, current, filters } = params;
    try
    {
      const { data } = await api.get(`/crm/offer/${ productId }`, {
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
    } catch (error)
    {
      throw new Error("Erro ao carregar dados! " + error);
    } finally
    {
      setTableLoading(false);
    }
  }, []);

  const onHandleTableChange = (pagination: any, filters: any, sorter: any) =>
  {
    if (!pagination) return;
    let newFilters: any = {};
    for (const key in filters)
    {
      if (filters[key] === null) continue;
      const value = filters[key];
      if (value.length > 1)
      {
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
      .then((response) =>
      {
        setTablePagination((old) => ({
          ...old,
          ...pagination,
          total: response.total,
        }));
        setData(response.data);
      })
      .catch(() => notification.error({ message: "Erro ao carregar dados!" }));
  };

  const onHandleReloadData = () => setShouldReloadTable(!shouldReloadTable);

  const tableCols: TableColumnType<any>[] = [
    {
      key: "id",
      title: "Nome",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
      },
      render: (_: any, record) =>
      {
        return <>{ record.name }</>;
      },
      width: 280,
    },
    {
      key: "description",
      title: "Descrição do produto",
      dataIndex: "description",
      render: (_: any, record) =>
      {
        return <DescriptionShorter description={ record.description } limit={ 36 } />;
      },
      width: 300,
    },
    {
      key: "created_at",
      title: "Criado em",
      dataIndex: "created_at",
      render: (_: any, record) =>
      {
        return <>{ format(new Date(record.created_at), "dd/MM/yyyy") }</>;
      },
    },
    {
      key: "view",
      title: "Ações",
      width: "100px",
      align: "center",
      render: (_, record) =>
      {
        return (
          <>
            <Link to={ `/products/${ record.id }` }>
              <Button key="bt-view" size="small">
                Detalhes
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  useEffect(() =>
  {
    let didCancel = false;
    loadData({
      current: 1,
      pageSize: defaultPageSize,
    })
      .then((response) =>
      {
        !didCancel && setData(response.data);
        setTablePagination((old) => ({ ...old, total: response.total }));
      })
      .catch(() => notification.error({ message: "Erro ao carregar dados!" }));
  }, [loadData, shouldReloadTable]);

  return (
    <Container data-testid="container-plans-el">
      <PageHeader
        extra={ [
          <Button key="bt-ds-reload" icon={ <ReloadOutlined /> } onClick={ onHandleReloadData }>
            Recarregar dados
          </Button>,
          <Button key="bt-ds-new" type="primary" icon={ <PlusOutlined /> } onClick={ () => setIsVisibleModal(true) }>
            Novo
          </Button>,
        ] }
      >
        <Row style={ { marginTop: 12 } }>
          <Col md={ 24 }>
            <Table
              rowKey={ (record: any) => record.id }
              data-testid="table-product-plans-el"
              pagination={ tablePagination }
              loading={ tableLoading }
              columns={ tableCols }
              dataSource={ data }
              size="middle"
              onChange={ onHandleTableChange }
            />
          </Col>
        </Row>
      </PageHeader>
      <AddPlan
        onCancel={ () => setIsVisibleModal(false) }
        isVisible={ isVisibleModal }
        onSubmit={ onHandleReloadData }
        productId={ productId }
      />
    </Container>
  );
};

export default ListPlans;
