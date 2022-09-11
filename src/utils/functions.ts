export function removeAnyMask(str: string): string {
	return str.replace(/\.|-|\\|\/|\(|\)|\s/gm, "");
}

export const formatPrice = (price: number) =>
	Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
		price
	);

export const formatPhoneNumber = (value: string): string => {
	value = removeAnyMask(value || "");
	// 88981115258
	if (value.length > 11) {
		value = value.substring(1);
	}
	if (value.length === 11) {
		// (88) 9 8111-5258
		return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, (...params) => {
			return `(${params[1]}) ${params[2]} ${params[3]}-${params[4]}`;
		});
		// 8881115258
	} else if (value.length === 10) {
		// (88) 8111-5258
		return value.replace(/^(\d{2})(\d{4})(\d{4})$/, (...params) => {
			return `(${params[1]}) ${params[2]}-${params[3]}`;
		});
		// 81115258
	} else if (value.length === 8) {
		// 8111-5258
		return value.replace(/^(\d{4})(\d{4})$/, (...params) => {
			return `${params[1]}-${params[2]}`;
		});
	}
	return value;
};

export const formatCPF = (value: string): string => {
	if (value.length === 11) {
		// 111.222.333-44
		return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, (...params) => {
			return `${params[1]}.${params[2]}.${params[3]}-${params[4]}`;
		});
	} else if (value.length === 13) {
		// 08.28.856/0001-73
		return value.replace(
			/^(\d{2})(\d{2})(\d{3})(\d{4})(\d{2})$/,
			(...params) => {
				return `${params[1]}.${params[2]}.${params[3]}/${params[4]}-${params[5]}`;
			}
		);
	}
	return value;
};
