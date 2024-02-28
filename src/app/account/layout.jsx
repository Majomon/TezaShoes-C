
import { Toaster } from "sonner";

export const metadata = {
  title: "TezaShoes - Account",
  description: "Tienda de zapatos y carteras - Cuenta Personal",
};

export default function ShopLayout({ children }) {
  return (
    <aside className="w-full flex scroll-smooth focus:scroll-auto">
      <Toaster position="top-center" />
      <section className="w-full min-h-screen ">{children}</section>
    </aside>
  );
}
