import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';

import { Container, RuleText } from './styles';

export const RULES = [
  {
    label: `Deve conter um caractere especial (!@#$%^&*()_)`,
    validator: (v: any) => /[!@#\$%\^\&*\)\(+=._-]/gm.test(v),
  },
  {
    label: `Deve conter uma letra maiúscula`,
    validator: (v: any) => /[A-Z]/.test(v),
  },
  {
    label: `Deve conter um número`,
    validator: (v: any) => /\d/.test(v),
  },
  /* {
    label: `Deve ser maior que 8 e menor que 24`,
    validator: (v: any) => /\w+./.test(v),
  } */
];

export const RULES_PROMISED = RULES.map((r) => {
  return {
    validator: (_: any, v: any) => new Promise((resolve, reject) => {
      if (r.validator(v)) {
        resolve(false);
      } else {
        reject(false);
      }
    })
  }
});

const PasswordRules: React.FC<{ value: any; }> = ({ value }) => {
  return (
    <Container>
      {RULES.map((rule, index) => {
        const valid = rule.validator(value);

        return (
          <RuleText key={index}>
            <Typography.Text type={valid ? `success` : `danger`}>
              {valid ? <CheckOutlined /> : <CloseOutlined />} {rule.label}
            </Typography.Text>
          </RuleText>
        );
      })}
    </Container>
  )
}

export default PasswordRules;
