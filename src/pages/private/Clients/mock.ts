const clientsMock: Client[] = [
	{
		name: "jose",
		email: "josemartins@gmail.com",
		document: "234.432.543-21",
		birth_date: "12/05/1993",
		last_four_numbers: "165",
		brand_card: "elo",
		create_at: "2022-08-10 13:57:11.216",
		update_at: "2022-08-10 13:57:11.216",
		id: "834efdb6-6044-4b44-8fcb-560710936f37",
	},
	{
		name: "maria",
		email: "mariasilvajosemartins@gmail.com",
		document: "132.543.763-64",
		birth_date: "07/02/1998",
		last_four_numbers: "756",
		brand_card: "mastercard",
		create_at: "2022-08-10 13:57:11.216",
		update_at: "2022-08-10 13:57:11.216",
		id: "dff59ac0-4d80-4b96-85c4-14f3a118e7fe",
	},
	{
		name: "vitoria",
		email: "vtoriaalenca@gmail.com",
		document: "546.756.354-27",
		birth_date: "30/10/2002",
		last_four_numbers: "643",
		brand_card: "visa",
		create_at: "2022-08-10 13:57:11.216",
		update_at: "2022-08-10 13:57:11.216",
		id: "511fea83-9f5f-4606-85ec-3d769da4bf63",
	},
	{
		name: "ribas",
		email: "joseribas@gmail.com",
		document: "814.645.343-13",
		birth_date: "17/10/1988",
		last_four_numbers: "952",
		brand_card: "mastercard",
		create_at: "2022-08-10 13:57:11.216",
		update_at: "2022-08-10 13:57:11.216",
		id: "3bc82ef7-1138-4f97-945a-08626a42a648",
	},
];

interface Client {
	id: string;
	name: string;
	email: string;
	document: string;
	birth_date: string;
	brand_card: string;
	update_at: string | Date;
	create_at: string | Date;
	last_four_numbers: string;
}

export default clientsMock;
