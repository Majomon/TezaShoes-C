
async function getAllProducts() {
  const response = await fetch(`https://teza-shoes-api.vercel.app/products`);
  const data = await response.json()
  return data;
}

async function Home() {
  const product = await getAllProducts();
  console.log(product);

  return (
    <>
      <h2>Main</h2>
    </>
  );
}

export default Home;
