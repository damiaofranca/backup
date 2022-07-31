import { FormInstance } from "antd";

export function invalidContainNumbers(_: any, value: { number: number }): Promise<void> {
  if (!/\d/gm.test(`${value}`)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Números não permitidos!'));
}

export function invalidContainSpace(_: any, value: { number: number }): Promise<void> {
  if (!/\s/gm.test(`${value}`)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Espaços não permitidos!'));
}

export function documentCPF(_: any, value: { number: number }): Promise<void> {
  if (!value || /\d{3}\.\d{3}\.\d{3}-\d{2}/gm.test(`${value}`)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Formato do documento ínvalido. Tente ex.: 999.999.999-99'));
}

export function phoneNumber(_: any, value: { number: number }): Promise<void> {
  if (!value || /\(\d{2}\)\s?\9?\s?\d{4}-\d{4}/gm.test(`${value}`)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Formato do telefone ínvalido. Tente ex.: (99) 9 9999-9999'));
}

export function phoneResidential(_: any, value: { number: number }): Promise<void> {
  if (!value || /\(\d{2}\)\s?\d{4}-\d{4}/gm.test(`${value}`)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Formato do telefone ínvalido. Tente ex.: (99) 9999-9999'));
}

export function phoneNumber0800(_: any, value: { number: number }): Promise<void> {
  if (!value || /\d{3}\s?\d{3}-\d{4}/gm.test(`${value}`)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('Formato do telefone ínvalido. Tente ex.: 0800 999-9999'));
}

export function mustBeEqualTo(key: string, form: FormInstance): (field: any, value: any) => Promise<void> {
  return (_, value) => {
    const second_value = form.getFieldValue(key);
    
    if (!value || (second_value === value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Campos não coincidem!'));
  }
}
