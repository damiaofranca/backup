import { Button, Form, Input, Modal, notification } from "antd";
import React, { useState } from "react";

import api from "../../api";
import { useAuth } from "../../providers/Auth";
import { mustBeEqualTo } from "../../utils/validators";
import PasswordRules, { RULES_PROMISED } from "../PasswordRules";
import { Container } from "./styles";

const ChangeUserPassword: React.FC = () => {
	const { must_reset_password, passwordIsUpdated } = useAuth();

	const [confirmLoading, setConfirmLoading] = useState(false);

	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		setConfirmLoading(true);
		const payload = { ...values };
		try {
			await api.post(`/auth/change/password`, payload);
			passwordIsUpdated();

			notification.success({
				message: "Senha alterada com sucesso",
			});
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao atualizar a senha. Tente novamente., " + error,
			});
		} finally {
			setConfirmLoading(false);
		}
	};

	if (!must_reset_password) {
		return null;
	}

	return (
		<Container>
			<Modal
				title="Troca de senha obrigatória de usuário"
				visible={true}
				confirmLoading={confirmLoading}
				maskClosable={false}
				closable={false}
				footer={[
					<Button
						key="update-password-button"
						type="primary"
						data-testid="buttonSubmitId"
						loading={confirmLoading}
						disabled={confirmLoading}
						onClick={() => form.submit()}
					>
						Atualizar senha
					</Button>,
				]}
			>
				<Form layout="vertical" form={form} name="control-hooks">
					<Form.Item
						name="password"
						label="Senha"
						rules={[{ required: true, min: 8, max: 24 }, ...RULES_PROMISED]}
					>
						<Input.Password
							placeholder="Digite sua nova senha!"
							data-testId="password"
							autoFocus
							disabled={confirmLoading}
						/>
					</Form.Item>

					<Form.Item shouldUpdate={() => true}>
						{(form) => <PasswordRules value={form.getFieldValue(`password`)} />}
					</Form.Item>

					<Form.Item
						name="password_confirm"
						label="Confirme a senha"
						rules={[
							{ required: true, min: 8, max: 24 },
							{ validator: mustBeEqualTo("password", form) },
						]}
					>
						<Input
							type={"password"}
							data-testid="resetPassowordAgainInputId"
							placeholder="Digite sua nova senha!"
							disabled={confirmLoading}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</Container>
	);
};

export default ChangeUserPassword;
