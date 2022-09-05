export interface Product {
	id: string;
	name: string;
	plans: Plan[];
	is_active: boolean;
	description: string;
	created_at: Date;
	updated_at: Date | null;
	deleted_at: Date | null;
}

export interface Plan {
	id: string;
	name: string;
	price: string;
	created_at: Date;
	end_date: Date;
	start_date: Date;
	updated_at: Date | null;
	deleted_at: Date | null;
	is_active: boolean;
	description: string;
	grace_period: number;
	number_of_devices: number;
	external_service_id: number;
}

export const mock: Product[] = [
	{
		id: "f8810761-1c94-4fd4-b86d-21a404679ccf",
		name: "Reigh",
		is_active: true,
		description: "loren ipsun",
		deleted_at: null,
		created_at: new Date(),
		updated_at: null,
		plans: [
			{
				id: "dc63d962-6d51-4ce7-895c-dcf2909094d9",
				name: "Brisa music",
				price: "19.90",
				created_at: new Date(),
				end_date: new Date(),
				start_date: new Date(),
				updated_at: null,
				deleted_at: null,
				is_active: true,
				description: "loren ipsun plan",
				grace_period: 30,
				number_of_devices: 4,
				external_service_id: 321,
			},
		],
	},
];
