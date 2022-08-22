const mockDetail: ClientDetail = {
	id: "c5f8ed1f-b03e-4163-848a-d60dc06f50c7",
	email: "damiaoa@gmail.com",
	name: "damião da silva frança",
	birth_date: "12/05/1993",
	document: "234.432.543-21",
	phone_number: "84991947723",
	consent_email: false,
	subscription: [
		{
			id: "3ead6452-bec1-4e18-8f78-252cb409454c",
			is_active: true,
			is_recurrent: true,
			start_date: "2022-08-09T16:42:06.586Z",
			validate_date: "2022-09-07T16:42:06.581Z",
			end_date: "2022-09-08T16:42:06.581Z",
			recurrent_payment_id: null,
			plan: {
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
		},
	],
};

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

interface ClientDetail {
	id: string;
	name: string;
	email: string;
	document: string;
	birth_date?: string;
	phone_number?: string;
	consent_email: boolean;
	subscription: Subscription[];
}

interface Subscription {
	id: string;
	plan: Plan;
	is_active: boolean;
	is_recurrent: boolean;
	end_date: string | Date;
	start_date: string | Date;
	validate_date: string | Date;
	recurrent_payment_id: string | null;
}

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

export { mockDetail, productMock };
