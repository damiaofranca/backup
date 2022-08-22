import React from "react";

export const DescriptionShorter: React.FC<{
	description: string;
	limit: number;
}> = ({ description, limit }) => {
	return (
		<p
			title={description.length > limit ? description : ""}
			style={{ margin: 0 }}
		>
			{description.slice(0, limit) + (description.length > limit ? "..." : "")}
		</p>
	);
};
