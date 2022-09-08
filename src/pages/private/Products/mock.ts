import { Product } from "./model";

export const mock: Product[] = [
  {
    id: "f8810761-1c94-4fd4-b86d-21a404679ccf",
    name: "Reigh",
    description: "loren ipsun",
    created_at: new Date(),
    updated_at: null,
    partner: "kuack",
    offers: [
      {
        id: "dc63d962-6d51-4ce7-895c-dcf2909094d9",
        name: "Brisa music",
        price: 19.9,
        created_at: new Date(),
        updated_at: null,
        description: "loren ipsun plan",
        grace_period: 30,
        external_service_id: 321,
      },
    ],
  },
];
