import { PlusRunded } from "../../../../assets/Dashboard/IconActions";

function NavbarCategories({ handleAddCategory }) {
  return (
    <div className="w-full flex justify-between items-center px-4">
      <h1 className="">Categorias</h1>
      <div className="bg-colorGoldSecundary-500 text-white flex py-2 px-3 gap-x-2 rounded-lg ">
        <div className="p-1 rounded-full bg-gray-50">
          <PlusRunded />
        </div>
        <button onClick={handleAddCategory}>Agregar categoria</button>
      </div>
    </div>
  );
}

export default NavbarCategories;
