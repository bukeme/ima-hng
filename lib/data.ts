import {
  InvoiceFormValues,
  InvoiceRecord,
  NewInvoiceFormValues,
} from "./types";

export const invoices = [
  {
    id: "#RT3080",
    dueDate: "19 Aug 2021",
    customer: "Jensen Huang",
    amount: 1800.9,
    status: "Paid",
  },
  {
    id: "#XM9141",
    dueDate: "20 Sep 2021",
    customer: "Alex Grim",
    amount: 556.0,
    status: "Pending",
  },
  {
    id: "#RG0314",
    dueDate: "01 Oct 2021",
    customer: "John Morrison",
    amount: 14002.33,
    status: "Paid",
  },
  {
    id: "#RT2080",
    dueDate: "12 Oct 2021",
    customer: "Alysa Werner",
    amount: 102.04,
    status: "Pending",
  },
  {
    id: "#AA1449",
    dueDate: "14 Oct 2021",
    customer: "Mellisa Clarke",
    amount: 4032.33,
    status: "Pending",
  },
  {
    id: "#TY9141",
    dueDate: "31 Oct 2021",
    customer: "Thomas Wayne",
    amount: 6155.91,
    status: "Pending",
  },
  {
    id: "#FV2353",
    dueDate: "12 Nov 2021",
    customer: "Anita Wainwright",
    amount: 3102.04,
    status: "Draft",
  },
];

export const paymentTerms = [
  "Net 1 Day",
  "Net 7 Days",
  "Net 14 Days",
  "Net 30 Days",
] as const;

export const defaultValues: NewInvoiceFormValues = {
  invoiceNumber: "",
  billFromStreet: "",
  billFromCity: "",
  billFromPostCode: "",
  billFromCountry: "",
  clientName: "",
  clientEmail: "",
  billToStreet: "",
  billToCity: "",
  billToPostCode: "",
  billToCountry: "",
  invoiceDate: "",
  paymentTerms: "Net 30 Days",
  projectDescription: "",
  items: [],
};

export const initialInvoices: InvoiceRecord[] = [
  {
    id: "1",
    invoiceNumber: "XM9141",
    billFromStreet: "19 Union Terrace",
    billFromCity: "London",
    billFromPostCode: "E1 3EZ",
    billFromCountry: "United Kingdom",

    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    billToStreet: "84 Church Way",
    billToCity: "Bradford",
    billToPostCode: "BD1 9PB",
    billToCountry: "United Kingdom",

    invoiceDate: "2021-08-21",
    paymentTerms: "Net 30 Days",
    projectDescription: "Graphic Design",

    items: [
      { name: "Banner Design", quantity: 1, price: 156 },
      { name: "Email Design", quantity: 2, price: 200 },
    ],

    total: 556,
    status: "Pending",
  },

  {
    id: "2",
    invoiceNumber: "RT3080",
    billFromStreet: "71 Cherry Court",
    billFromCity: "Liverpool",
    billFromPostCode: "L1 8JQ",
    billFromCountry: "United Kingdom",

    clientName: "Jensen Huang",
    clientEmail: "jensen@nvidia.com",
    billToStreet: "88 Market Street",
    billToCity: "Manchester",
    billToPostCode: "M1 2WD",
    billToCountry: "United Kingdom",

    invoiceDate: "2021-08-18",
    paymentTerms: "Net 7 Days",
    projectDescription: "Website Redesign",

    items: [
      { name: "Landing Page", quantity: 1, price: 300 },
      { name: "UI Kit", quantity: 1, price: 250 },
    ],

    total: 550,
    status: "Paid",
  },

  {
    id: "3",
    invoiceNumber: "AA1449",
    billFromStreet: "102 King Street",
    billFromCity: "Birmingham",
    billFromPostCode: "B1 1AA",
    billFromCountry: "United Kingdom",

    clientName: "Sara Connor",
    clientEmail: "sara@mail.com",
    billToStreet: "22 Hill Road",
    billToCity: "Leeds",
    billToPostCode: "LS1 4AP",
    billToCountry: "United Kingdom",

    invoiceDate: "2021-09-10",
    paymentTerms: "Net 14 Days",
    projectDescription: "App UI Design",

    items: [
      { name: "Mobile Screens", quantity: 5, price: 80 },
      { name: "Design System", quantity: 1, price: 200 },
    ],

    total: 600,
    status: "Draft",
  },

  {
    id: "4",
    invoiceNumber: "TY9141",
    billFromStreet: "44 Rose Street",
    billFromCity: "Edinburgh",
    billFromPostCode: "EH2 2PR",
    billFromCountry: "United Kingdom",

    clientName: "Michael Scott",
    clientEmail: "michael@dundermifflin.com",
    billToStreet: "1725 Slough Ave",
    billToCity: "Scranton",
    billToPostCode: "18503",
    billToCountry: "USA",

    invoiceDate: "2021-09-15",
    paymentTerms: "Net 1 Day",
    projectDescription: "Brand Identity",

    items: [
      { name: "Logo Design", quantity: 1, price: 400 },
      { name: "Brand Guide", quantity: 1, price: 150 },
    ],

    total: 550,
    status: "Pending",
  },

  {
    id: "5",
    invoiceNumber: "FV2353",
    billFromStreet: "9 Queen Street",
    billFromCity: "Glasgow",
    billFromPostCode: "G1 3DX",
    billFromCountry: "United Kingdom",

    clientName: "Tony Stark",
    clientEmail: "tony@starkindustries.com",
    billToStreet: "10880 Malibu Point",
    billToCity: "Malibu",
    billToPostCode: "90265",
    billToCountry: "USA",

    invoiceDate: "2021-10-01",
    paymentTerms: "Net 30 Days",
    projectDescription: "Dashboard Design",

    items: [{ name: "Admin Dashboard", quantity: 1, price: 700 }],

    total: 700,
    status: "Paid",
  },

  {
    id: "6",
    invoiceNumber: "KV2312",
    billFromStreet: "88 Oxford Street",
    billFromCity: "London",
    billFromPostCode: "W1D 1BS",
    billFromCountry: "United Kingdom",

    clientName: "Bruce Wayne",
    clientEmail: "bruce@wayneenterprises.com",
    billToStreet: "1007 Mountain Drive",
    billToCity: "Gotham",
    billToPostCode: "10001",
    billToCountry: "USA",

    invoiceDate: "2021-10-12",
    paymentTerms: "Net 7 Days",
    projectDescription: "Mobile App UX",

    items: [
      { name: "UX Research", quantity: 1, price: 300 },
      { name: "Wireframes", quantity: 1, price: 200 },
    ],

    total: 500,
    status: "Draft",
  },

  {
    id: "7",
    invoiceNumber: "LM9021",
    billFromStreet: "12 Baker Street",
    billFromCity: "London",
    billFromPostCode: "NW1 6XE",
    billFromCountry: "United Kingdom",

    clientName: "Sherlock Holmes",
    clientEmail: "sherlock@detective.com",
    billToStreet: "221B Baker Street",
    billToCity: "London",
    billToPostCode: "NW1 6XE",
    billToCountry: "United Kingdom",

    invoiceDate: "2021-10-20",
    paymentTerms: "Net 14 Days",
    projectDescription: "Consulting",

    items: [{ name: "Investigation", quantity: 2, price: 150 }],

    total: 300,
    status: "Pending",
  },

  {
    id: "8",
    invoiceNumber: "ZX7823",
    billFromStreet: "5 Silicon Avenue",
    billFromCity: "San Francisco",
    billFromPostCode: "94107",
    billFromCountry: "USA",

    clientName: "Elon Musk",
    clientEmail: "elon@tesla.com",
    billToStreet: "3500 Deer Creek Road",
    billToCity: "Palo Alto",
    billToPostCode: "94304",
    billToCountry: "USA",

    invoiceDate: "2021-11-01",
    paymentTerms: "Net 30 Days",
    projectDescription: "Product Design",

    items: [{ name: "Prototype Design", quantity: 1, price: 1200 }],

    total: 1200,
    status: "Paid",
  },
];
