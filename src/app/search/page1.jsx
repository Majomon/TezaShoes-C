import SearchViejo from "@/components/Search/SearchViejo";

export const metadata = {
  title: "TezaShoes - Search",
  description: "Search en la web de TezaShoes",
};
async function getAllProducts() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/products`);
  const data = await response.json();
  return data;
}

export default async function () {
  const product = await getAllProducts();
  return (
    <div className="w-full min-h-screen flex flex-col gap-y-[40px] ">
      <SearchViejo product={product} />
    </div>
  );
}
