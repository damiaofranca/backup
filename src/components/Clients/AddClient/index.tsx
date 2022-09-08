import { Select, Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";
import api from "../../../api";

interface AddClientProps {
  onCancel: () => void;
  onSubmit: () => void;
  isVisible: boolean;
}

const AddClient: React.FC<AddClientProps> = ({ onSubmit, onCancel, isVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [partnerList] = useState([
    {
      label: "Kuack",
      value: "kuack",
    },
    {
      label: "Tucano",
      value: "tucano",
    },
  ]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await api.post(`/crm/client`, {
        name: values.name,
        partner: values.partner,
        description: values.description,
      });

      notification.success({
        message: "Produto inserido com sucesso",
      });

      onReset();
      onCancel();
      onSubmit && onSubmit();

      setLoading(false);
    } catch (error) {
      notification.error({
        message: "Ocorreu algum erro ao criar o produto. Tente novamente., " + error,
      });
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Modal
      visible={isVisible}
      title="Adicionar Produto"
      closable={false}
      maskClosable={false}
      data-testid="modal-client-el"
      okText="Adicionar"
      okButtonProps={{
        htmlType: "submit",
        disabled: loading,
        loading: loading,
      }}
      cancelButtonProps={{
        disabled: loading,
      }}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.submit();
          })
          .catch((info) => {
            console.log("Validate Failed: ", info);
          });
      }}
      onCancel={() => {
        onReset();
        onCancel && onCancel();
      }}
    >
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish} aria-label="form-el">
        <Form.Item name="name" label="Nome" rules={[{ required: true, max: 512, min: 4 }]}>
          <Input placeholder="Digite o nome do produto" aria-label="name-input-el" />
        </Form.Item>
        <Form.Item name="partner" label="Parceiro(s)" rules={[{ required: true }]}>
          <Select placeholder="Digite a descrição do produto" aria-label="partner-input-el" options={partnerList} optionLabelProp="label" />
        </Form.Item>
        <Form.Item name="description" label="Descrição do produto" rules={[{ required: true, max: 512, min: 6 }]}>
          <Input.TextArea placeholder="Digite a descrição do produto" aria-label="description-input-el" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClient;
