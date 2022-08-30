import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../providers/Auth";
import { Button, Form, Input, notification, Typography } from "antd";

import {
	Container,
	ContainerCard,
	ContainerFloatable,
	ContainerFlex,
	ContainerFlexSlotRight,
	ContainerFlexSlotLeft,
	ContainerImage,
	ContainerFlexSlotRightTitles,
} from "./styles";

import loginIMG from "../../../assets/login-img.png";

const { Title } = Typography;

const Login: React.FC = () => {
	const history = useHistory();
	const { login } = useAuth();

	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			await login(values.email, values.password);

			notification.info({
				message: `Seja bem-vindo!`,
			});
			history.replace("/");
		} catch (error) {
			notification.error({
				message:
					"Ocorreu algum erro ao tentar entrar. Tente novamente., " + error,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<ContainerCard>
				<ContainerFloatable>
					<ContainerFlex>
						<ContainerFlexSlotRight>
							<ContainerFlexSlotRightTitles>
								<Title className="primary-title" level={3}>
									Nossa plataforma de <br /> vendas digitais
								</Title>
								<Title level={5}>
									Obtenha todos os dados e informações necessárias.
								</Title>
							</ContainerFlexSlotRightTitles>
							<ContainerImage>
								<img src={loginIMG} alt="Agility CMS" />
							</ContainerImage>
						</ContainerFlexSlotRight>
						<ContainerFlexSlotLeft>
							<Title className="primary-title" level={2}>
								Entrar
							</Title>
							<Form form={form} onFinish={onFinish}>
								<Form.Item
									name="email"
									rules={[{ required: true, type: "email" }]}
								>
									<Input
										size="large"
										type={"email"}
										placeholder="Digite o e-mail"
										aria-label="email-input"
										disabled={loading}
									/>
								</Form.Item>
								<Form.Item name="password" rules={[{ required: true }]}>
									<Input.Password
										size="large"
										placeholder="Digite a senha"
										aria-label="password-input"
										disabled={loading}
									/>
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										size="large"
										style={{ display: "block", width: "100%" }}
										disabled={loading}
										loading={loading}
										aria-label="submit-button"
									>
										Entrar
									</Button>
								</Form.Item>
							</Form>
						</ContainerFlexSlotLeft>
					</ContainerFlex>
				</ContainerFloatable>
			</ContainerCard>
		</Container>
	);
};

export default Login;
