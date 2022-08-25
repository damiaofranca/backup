import { Button, Input, notification } from "antd";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import logoImage from "../../../assets/logo-white.svg";

import {
	Actions,
	Box,
	Container,
	ContainerLogo,
	ContainerOrange,
	Description,
	Title,
} from "./styles";

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = () => {
	let history = useHistory();
	let { token } = useParams<{ token: string }>();
	const [password, setPassword] = useState<string>("");

	const goToHome = () => {
		return history.push("/");
	};

	const resetPassword = async () => {
		if (password.length > 8) {
			try {
				await api.post(`/api/crm/accounts/reset/password`, {
					password,
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
						"Ocorreu algum erro ao inserir a franquia. Tente novamente., " +
						error,
				});
			}
		} else {
			notification.warn({
				message: "A senha deve ter pelo menos 8 dígitos.",
			});
		}
	};

	return (
		<Container>
			<ContainerOrange />
			<Box>
				<ContainerLogo>
					<img src={logoImage} alt="Logo da Brisanet" />
				</ContainerLogo>
				<Title>Resetar senha</Title>
				<Description>Por favor, insira uma nova senha.</Description>
				<Input
					style={{ height: "2.4rem", marginBottom: "1.6rem" }}
					placeholder="Insira uma nova senha"
					onChange={(evt) => {
						setPassword(evt.target.value);
					}}
					value={password}
				/>
				<Actions>
					<Button onClick={goToHome}>Cancelar</Button>
					<Button type="primary" onClick={resetPassword}>
						Resetar
					</Button>
				</Actions>
			</Box>
		</Container>
	);
};
