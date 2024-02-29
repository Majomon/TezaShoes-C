import ProccessPurchase from "@/components/Purchase/ProccessPurchase";
import { Toaster } from "sonner";

export const metadata = {
  title: "TezaShoes - Proceso de compra",
  description: "Tienda de zapatos y carteras - Proceso de compra",
};

export default function PurchaseLayout({ children }) {
  return (
    <aside className="w-full sm:w-5/6 xl:max-w-[1440px] mx-auto h-full flex flex-col px-5 pb-4 relative">
      <Toaster position="top-center" />
      <main>
        <ProccessPurchase />
        <section className="w-full">{children}</section>
      </main>
    </aside>
  );
}
