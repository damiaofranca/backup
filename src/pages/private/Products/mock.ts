const productMock: Plan[] = [
	{
		id: "cd2d5fb4-287f-4ac1-bf73-0a6e9eb21350",
		description: "Plano para toda a família!",
		name: "Brisamusic Agility",
		is_active: true,
		grace_period: 30,
		external_service_id: 742,
		number_of_devices: 1,
		price: "16.98",
		created_at: "2022-08-09T16:41:36.850Z",
		partner: {
			id: "e4271e08-32c4-49b9-b9d4-a638b238aaa5",
			name: "alpha",
		},
	},
];

interface Plan {
	id: string;
	name: string;
	price: string;
	is_active: boolean;
	description: string;
	grace_period: number;
	number_of_devices: number;
	created_at: string | Date;
	external_service_id: number;
	partner: {
		id: string;
		name: string;
	};
}

export default productMock;
