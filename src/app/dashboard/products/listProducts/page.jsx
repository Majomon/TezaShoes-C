import ContainerAllProducts from "@/components/Dashboard/ProductsList/ContainerAllProducts";

function ListProducts() {
  return (
    <div className="w-full p-6">
      <div className=" w-full max-w-[960px] mx-auto">
        <h1 className=" text-lg font-bold">Productos</h1>
        <ContainerAllProducts />
      </div>
    </div>
  );
}

export default ListProducts;
