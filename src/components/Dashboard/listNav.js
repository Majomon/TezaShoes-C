import {
  IconClients,
  IconProducts,
  IconSell,
} from "../../../assets/Dashboard/IconLinkNavDashboard";

export const optionLinksDashboard = [
  {
    text: "Ventas",
    icon: <IconSell />,
    url: " ",
    additionalOptions: [
      { text: "Lista de ventas", url: "/dashboard/sale/salesList" },
    ],
  },
  {
    text: "Productos",
    icon: <IconProducts />,
    url: " ",
    additionalOptions: [
      { text: "Lista de productos", url: "/dashboard/products/listProducts" },
      { text: "Agregar producto", url: "/dashboard/products/addProduct" },
      { text: "Categorias", url: "/dashboard/products/categories" },
    ],
  },
  {
    text: "Clientes",
    icon: <IconClients />,
    url: " ",
    additionalOptions: [
      { text: "Lista de clientes", url: "/dashboard/clients/list" },
      { text: "Agregar cliente", url: "/dashboard/clients/add" },
    ],
  },
];
