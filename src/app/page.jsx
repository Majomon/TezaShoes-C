import MainHome from "@/components/Home/MainHome";

async function Home() {
  return (
    <>
      <MainHome />
    </>
  );
}

export default Home;



/* async function getAllProducts() {
  const response = await fetch(`https://teza-shoes-api.vercel.app/products`);
  const data = await response.json();
  return data;
} */