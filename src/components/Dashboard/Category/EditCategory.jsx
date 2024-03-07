import { useStoreProducts } from "@/zustand/store";
import { useState } from "react";
import ImgFirebase from "../AddProduct/ImgFirebase";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

function EditCategory({ item, setEditCategory, editCategory }) {
  const { fetchPutCategoryId, fetchAllCategories, setCategories } =
    useStoreProducts();

  const [dataCategory, setDataCategory] = useState({
    id: item._id,
    name: item.name,
    image: item.image,
  });

  const handleNameChange = (e) => {
    setDataCategory((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };
  const handleSubmit = async (data) => {
    await fetchPutCategoryId(data.id, data);
    setTimeout(() => {
      setCategories(fetchAllCategories());
    }, 100);
    setEditCategory(false);
  };

  return (
    <Modal
      isOpen={editCategory}
      placement={"center"}
      onOpenChange={() => setEditCategory(!editCategory)}
        >
          <ModalContent>
        <ModalHeader>
        <h2 className="text-base font-bold">Editar categoria</h2>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="nameCategory" className="text-gray-950 text-sm font-normal">
              Nombre de la categoria
            </label>
                        <input
              id="nameCategory"
              value={dataCategory.name}
              onChange={handleNameChange}
              className="border-1 border-colorGray-100 rounded-xl p-1"
            />
          </div>
          <div className="w-full">
            <ImgFirebase
              setFormData={setDataCategory}
              nameCategory={"nameCategory"}
            />
          </div>
        </ModalBody>
        <ModalFooter>
        {dataCategory.name.length > 0 && dataCategory.image.length > 0 && (
          <div className="bg-colorGoldSecundary-500 text-white flex py-2 px-3 gap-x-2 rounded-full justify-center">
            <button onClick={() => handleSubmit(dataCategory)}>
              Modificar
            </button>
          </div>
        )}
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCategory;
