import { UserType } from "../../utils/enums";

export type CheckPermArg = UserType | UserType[];

export interface AuthProps {
	user_type: UserType;
	name: string;
	email: string;
	token: string;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	checkPermission: (userType: CheckPermArg) => boolean;
	userTypeIs: () => boolean;
}
