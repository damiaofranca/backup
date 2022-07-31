import { UserType } from "../../../../../brisa/agility-cms/src/utils/enums";

export interface Zone {
	id: string;
	name: string;
}

export type CheckPermArg = UserType | UserType[];

export interface AuthProps {
	user_type: UserType;
	name: string;
	email: string;
	access_token: string;
	zones: Zone[];

	isAuthenticated: boolean;

	franchisee_id: string;
	franchisee: any;
	attendat: any;

	zone_id: any;

	must_reset_password: boolean;

	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	checkPermission: (userType: CheckPermArg) => boolean;
	userTypeIs: (userType: CheckPermArg) => boolean;
	hasZones: () => boolean;
	passwordIsUpdated: () => void;
	selectZone: (id: any) => void;
}
