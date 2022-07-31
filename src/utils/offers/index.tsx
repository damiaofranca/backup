import { Col, Form, Input, InputNumber, Select } from "antd";


interface OffersOptions {
  form?: any;
  inputProps?: Partial<any>;
}

interface OffersScheme {
  [x: string]: React.FC[]
}



const Description: React.FC<OffersOptions> = ({ inputProps }) => {
  return (
    <Col md={12} key={'dynamic-description'}>
      <Form.Item
        name={['metadata', 'description']}
        label="Descrição"
        rules={[{ required: true, max: 512, min: 2 }]}
      >
        <Input.TextArea {...inputProps || {}} placeholder='Digite a descrição' rows={4} />
      </Form.Item>
    </Col>
  );
}

const SubTitle: React.FC<OffersOptions> = ({ inputProps }) => {

  return (
    <Col md={12} key={'dynamic-subtitle'}>
      <Form.Item
        name={['metadata', 'subtitle']}
        label="Subtítulo"
        rules={[{ required: true, max: 512, min: 2 }]}
      >
        <Input {...inputProps || {}} placeholder='Digite o subtítulo' />
      </Form.Item>
    </Col>
  );
}

const DownloadSpeed: React.FC<OffersOptions> = ({ inputProps }) => {

  return (
    <Col md={12} key={'dynamic-download_speed'}>
      <Form.Item
        name={['metadata', 'download_speed']}
        label="Velocidade de download"
        rules={[{ required: true }]}
      >
        <InputNumber
          {...inputProps || {}}
          prefix="MB"
          style={{ width: "100%" }}
          placeholder='Digite a velocidade de download'
          formatter={value => `${value} MB`}
          parser={value => value?.replace(' MB', '') as any}
          min={0}
        />
      </Form.Item>
    </Col>
  );
}

const Kind: React.FC<OffersOptions> = ({ inputProps }) => {

  return (
    <Col md={12} key={'dynamic-kind'}>
      <Form.Item
        name={['metadata', 'kind']}
        label="Tipo"
        rules={[{ required: true, max: 512, min: 2 }]}
      >
        <Select
          {...inputProps || {}}
          showSearch
          style={{ width: "100%" }}
          placeholder="Selecione um tipo"
          optionFilterProp="children"
        >
          <Select.Option value={'fiber'}>
            Fibra
          </Select.Option>
          <Select.Option value={'radio'}>
            Rádio
          </Select.Option>
          <Select.Option value={'fiber_radio'}>
            Fibra/Rádio
          </Select.Option>
        </Select>
      </Form.Item>
    </Col>
  );
}


export const OFFERS_SCHEME: OffersScheme  = {
  1: [
    SubTitle,
    DownloadSpeed,
    Kind,
  ],
  8: [
    Description,
  ],
};


export function getOfferScheme(id: any): React.FC<OffersOptions>[] {
  if (id in OFFERS_SCHEME) {
    return OFFERS_SCHEME[id].slice();
  }
  return [];
}
