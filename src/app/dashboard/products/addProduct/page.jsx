import ContainerInputAddProduct from "@/components/Dashboard/AddProduct/ContainerInputAddProduct";

async function AddProduct() {
  return (
    <div className="w-full p-6">
      <div className=" max-w-[550px] w-full mx-auto">
        <h1 className="py-2 text-lg font-bold uppercase">Agregar producto</h1>
        <ContainerInputAddProduct />
      </div>
    </div>
  );
}

export default AddProduct;
