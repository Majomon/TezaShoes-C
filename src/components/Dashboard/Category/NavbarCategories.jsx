import { PlusRunded } from "../../../../assets/Dashboard/IconActions";

function NavbarCategories({ handleAddCategory }) {
  return (
    <div className="w-full flex justify-between items-center ">
      <h1 className=" text-lg font-bold">Categorias</h1>
      <div className=" bg-colorGoldSecundary-500 text-white flex items-center py-2 px-3 gap-x-2 rounded-full cursor-pointer" onClick={handleAddCategory}>
        <div className="p-1 rounded-full bg-gray-50">
          <PlusRunded />
        </div>
        <p className=" text-sm font-normal">Agregar categoria</p>
      </div>
    </div>
  );
}

export default NavbarCategories;
