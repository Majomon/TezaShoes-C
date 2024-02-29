import NavDashboard from "@/components/Dashboard/NavDashboard";
import { Toaster } from "sonner";

export const metadata = {
  title: "TezaShoes - Dashboard",
  description: "Dashboard - Teza",
};

async function getAllProducts() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/products`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}
async function getAllOrders() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/payOrder`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

async function getAllCategories() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/categories`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

async function getAllUsers() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/users`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

async function DashboardLayout({ children }) {
  const orders = await getAllOrders();
  const category = await getAllCategories();
  const allUsers = await getAllUsers();
  const allProducts = await getAllProducts();

  return (
    <aside className="w-full h-full flex">
      <Toaster position="top-center" />
      <section className="w-2/12 min-h-screen bg-white shadow-xl ">
        <NavDashboard
          orders={orders}
          category={category}
          allUsers={allUsers}
          products={allProducts}
        />
      </section>
      <section className="w-10/12 min-h-screen bg-neutral-100">{children}</section>
    </aside>
  );
}

export default DashboardLayout;
