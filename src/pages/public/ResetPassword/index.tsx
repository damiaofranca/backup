import { Button, Form, Input, notification, Typography } from "antd";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import loginIMG from "../../../assets/login-img.png";

import {
	Container,
	ContainerCard,
	ContainerFlex,
	ContainerFlexSlotLeft,
	ContainerFlexSlotRight,
	ContainerFlexSlotRightTitles,
	ContainerFloatable,
	ContainerImage,
} from "./styles";
const { Title } = Typography;

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = () => {
	let history = useHistory();
	let { token } = useParams<{ token: string }>();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const goToHome = () => {
		return history.replace("/");
	};

	const onFinish = async (values: any) => {
		if (values.password === values.passwordAgain) {
			try {
				await api.post(`/public/user/reset-password`, {
					password: values.password,
					token,
				});
				notification.success({
					message: "Senha alterada com sucesso.",
				});

				setTimeout(() => {
					goToHome();
				}, 2000);
			} catch (error) {
				notification.error({
					message:
						"Ocorreu algum erro ao tentar resetar a senha. Tente novamente., " +
						error,
				});
			}
		} else {
			notification.warn({
				message: "As senhas não se coincidem.",
			});
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
									Resetar senha
								</Title>
								<Title level={5}>Insira uma nova</Title>
							</ContainerFlexSlotRightTitles>
							<ContainerImage>
								<img src={loginIMG} alt="Agility CMS" />
							</ContainerImage>
						</ContainerFlexSlotRight>
						<ContainerFlexSlotLeft>
							<Title className="primary-title" level={2}>
								Resetar
							</Title>
							<Form form={form} onFinish={onFinish}>
								<Form.Item name="password" rules={[{ required: true, min: 8 }]}>
									<Input.Password
										size="large"
										placeholder="Digite a senha"
										aria-label="password-input"
										disabled={loading}
									/>
								</Form.Item>
								<Form.Item
									name="passwordAgain"
									rules={[{ required: true, min: 8 }]}
								>
									<Input.Password
										size="large"
										placeholder="Digite a senha novamente"
										aria-label="password-again-input"
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
										data-testid="submit-button"
									>
										Resetar
									</Button>
								</Form.Item>
								<Form.Item>
									<Button
										onClick={goToHome}
										size="large"
										style={{ display: "block", width: "100%" }}
										data-testid="cancel-button"
									>
										Cancelar
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
