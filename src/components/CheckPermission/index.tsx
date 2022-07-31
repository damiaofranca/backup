import React from "react";
import { useAuth } from "../../providers/Auth";
import { UserType } from "../../utils/enums";

const CheckPermission: React.FC<{
	userType: UserType;
	children: React.ReactNode;
}> = ({ userType, children }) => {
	const { checkPermission } = useAuth();

	if (checkPermission(userType)) {
		return <>{children}</>;
	}

	return null;
};

export default CheckPermission;
