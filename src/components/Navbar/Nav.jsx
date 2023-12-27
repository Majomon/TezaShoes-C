import NavIcons from "./NavIcons";
import NavLinks from "./NavLinks";
import NavBurger from "./NavBurger";

async function getAllCategories() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/categories`);
  const data = await response.json();
  return data;
}

async function getAllProducts() {
  const response = await fetch(`${process.env.URL_BASE_DEV}/products`);
  const data = await response.json();
  return data;
}
async function Nav() {
  const categories = await getAllCategories();
  const products = await getAllProducts();
  
  return (
    <nav className="bg-white w-full shadow-md flex h-16 items-center ">
      {/* LEFT */}
      <NavBurger categories={categories} />

      {/* CENTER */}
      <NavLinks />

      {/* RIGHT */}
      <NavIcons products={products}/>
    </nav>
  );
}

export default Nav;