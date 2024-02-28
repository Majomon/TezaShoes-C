import ContainerNav from "./ContainerNav";

async function getAllCategories() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/categories`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

async function getAllProducts() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/products`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data;
}

async function Nav() {
  const categorias = await getAllCategories();
  const products = await getAllProducts();

  return (
    <nav className="bg-white w-full ">
      <ContainerNav categorias={categorias} products={products} />
    </nav>
  );
}

export default Nav;

/* async function getAllCategories() {
  const response = await fetch(`https://teza-shoes-api.vercel.app/categories`);
  const data = await response.json();
  return data;
}

async function getAllProducts() {
  const response = await fetch(`https://teza-shoes-api.vercel.app/products`);
  const data = await response.json();
  return data;
}
async function Nav() {
  const categories = await getAllCategories();
  const products = await getAllProducts();
   */
