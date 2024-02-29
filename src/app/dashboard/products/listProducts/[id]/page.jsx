import ContainerEditProduct from "@/components/Dashboard/ProductsList/ContainerEditProduct";

async function getProductId(id) {
  const response = await fetch(`${process.env.URL_BASE_DEV}/products/${id}`);
  const data = await response.json();
  return data;
}

async function getProductDashboardId({ params }) {
  const productId = await getProductId(params.id);

  return (
    <div className="w-full p-6">
      <div className=" max-w-[550px] w-full mx-auto">
        <h1 className="py-2 text-lg font-bold uppercase">Editar producto</h1>
        <ContainerEditProduct productId={productId} />
      </div>
    </div>
  );
}

export default getProductDashboardId;
