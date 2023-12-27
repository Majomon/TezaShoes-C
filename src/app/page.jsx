import MainHome from "@/components/Home/MainHome";

async function getAllProducts() {
  const response = await fetch(`https://teza-shoes-api.vercel.app/products`);
  const data = await response.json();
  return data;
}

async function Home() {
  const product = await getAllProducts();

  return (
    <>
      <MainHome product={product} />
    </>
  );
}

export default Home;
