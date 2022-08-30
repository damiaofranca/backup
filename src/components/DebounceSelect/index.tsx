import { Select, Spin } from "antd";
import { SelectProps } from "antd/es/select";
import debounce from "lodash/debounce";
import React from "react";

const { Option } = Select;

export interface DebounceSelectProps<ValueType = any>
	extends Omit<SelectProps<ValueType>, "options" | "children"> {
	fetchOptions?: (search: string) => Promise<ValueType[]>;
	afterFetchOptions?: (options?: any[]) => void;
	debounceTimeout?: number;
	labelProp?: string;
	valueProp?: string | false;
	startsWithSearch?: boolean;
	initialOptions?: ValueType[];
	filterOptions?: (options?: any[]) => any[];
}

function DebounceSelect<
	ValueType extends {
		key?: string;
		label: React.ReactNode;
		value: string | number;
	} = any
>({
	fetchOptions,
	afterFetchOptions,
	debounceTimeout = 800,
	valueProp = "value",
	labelProp = "label",
	startsWithSearch,
	initialOptions = [],
	filterOptions,
	...props
}: DebounceSelectProps) {
	const [fetching, setFetching] = React.useState(false);
	const [options, setOptions] = React.useState<ValueType[]>(initialOptions);
	const fetchRef = React.useRef(0);

	const debounceFetcher = React.useMemo(() => {
		if (fetchOptions) {
			const loadOptions = (value: string) => {
				fetchRef.current += 1;
				const fetchId = fetchRef.current;
				setOptions([]);
				setFetching(true);

				fetchOptions(value).then((newOptions) => {
					if (fetchId !== fetchRef.current) {
						// for fetch callback order
						return;
					}

					setOptions(newOptions);
					afterFetchOptions && afterFetchOptions(newOptions);
					setFetching(false);
				});
			};

			return debounce(loadOptions, debounceTimeout);
		}
	}, [fetchOptions, debounceTimeout]);

	return (
		<Select<ValueType>
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small" /> : null}
			{...props}
			{...(props.labelInValue
				? {
						options: (filterOptions ? filterOptions(options) : options).map(
							(item: any) => ({
								value: valueProp
									? item[valueProp || "value"]
									: JSON.stringify(item),
								label: item[labelProp || "label"],
							})
						),
				  }
				: {})}
		>
			{!props.labelInValue
				? (filterOptions ? filterOptions(options) : options).map(
						(option: any) => {
							const value = valueProp
								? option[valueProp || "value"]
								: JSON.stringify(option);
							return (
								<Option key={value} value={value}>
									{option[labelProp || "label"]}
								</Option>
							);
						}
				  )
				: null}
		</Select>
	);
}

export default DebounceSelect;
