import React from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/lib/table/interface";

export type BuildFilterProps = {
	searchLabel: string;
};

export const buildFilterAttrs = ({ searchLabel }: BuildFilterProps): any => {
	const handleReset = (clearFilters: any) => {
		clearFilters();
	};

	return {
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}: FilterDropdownProps) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder={searchLabel}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => confirm()}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => confirm()}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Filtrar
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Resetar
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
	};
};
