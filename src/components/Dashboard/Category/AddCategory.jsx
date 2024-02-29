import { useStoreProducts } from "@/zustand/store";
import { useState } from "react";
import ImgFirebase from "../AddProduct/ImgFirebase";

function AddCategory({ setAddCategory }) {
  const { fetchPostCategory, fetchAllCategories, setCategories } =
    useStoreProducts();

  const [dataCategory, setDataCategory] = useState({
    name: "",
    image: "",
  });

  const handleNameChange = (e) => {
    setDataCategory((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };
  const handleSubmit = async (data) => {
    await fetchPostCategory(data);
    setTimeout(() => {
      setCategories(fetchAllCategories());
    }, 100);
    setAddCategory(false);
  };

  return (
    <div className="w-full fixed inset-0 flex justify-center items-center bg-gray-950/50 z-50">
      <div className="bg-white p-8 rounded-lg w-4/12 h-fit shadow-md shadow-gray-950 relative">
        <div
          className="w-7 h-7 flex justify-center absolute top-1 right-1 bg-gray-950 text-gray-50 p-1 rounded-full cursor-pointer"
          onClick={() => setAddCategory(false)}
        >
          X
        </div>

        <h2 className="font-bold">Crear categoria</h2>
        <div className="w-full flex flex-col">
          <div className="w-full py-2 flex gap-x-2">
            <label htmlFor="nameCategory" className="text-gray-950">
              Nombre de la categoria
            </label>
            <p>-- </p>
            <input
              id="nameCategory"
              value={dataCategory.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="w-full">
            <ImgFirebase setFormData={setDataCategory} nameCategory={true} />
          </div>
        </div>
        {dataCategory.name.length > 0 && dataCategory.image.length > 0 && (
          <div className="bg-colorGoldSecundary-500 text-white flex py-2 px-3 gap-x-2 rounded-lg justify-center">
            <button onClick={() => handleSubmit(dataCategory)}>Crear</button>
          </div>
        )}
      </div>
      ;
    </div>
  );
}

export default AddCategory;
