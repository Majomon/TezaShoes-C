import { useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";
import ImgFirebase from "../AddProduct/ImgFirebase";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ListSizeGuide from "./ListSizeGuide";

function EditCategory({ item, setEditCategory, editCategory }) {
  const { fetchPutCategoryId, fetchAllCategories, setCategories } =
    useStoreProducts();

  const [dataCategory, setDataCategory] = useState({
    id: item._id,
    name: item.name,
    image: item.image,
    tableSizes: item.tableSizes,
  });

  const [listSizeGuide, setListSizeGuide] = useState(
    /* dataCategory.tableSizes */[]
  );

  useEffect(() => {
    setListSizeGuide([...listSizeGuide,...dataCategory?.tableSizes])
  },[dataCategory.tableSizes]) 

  const handleNameChange = (e) => {
    setDataCategory((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };
  const handleSubmit = async (data) => {
    /* console.log(data) */
    await fetchPutCategoryId(data.id, {
      name: data.name,
      image: data.image,
      tableSizes: listSizeGuide,
    });
    setTimeout(() => {
      fetchAllCategories();
    }, 100);
    setEditCategory(false);
  };

  const handleChangeSizeGuide = (e, index) => {
    const { value, name } = e.target;
    let newListValues = [...listSizeGuide];
    if (name === "talle") {
      newListValues[index].size = value;
      setListSizeGuide(newListValues);
    } else {
      newListValues[index].measure = value;
      setListSizeGuide(newListValues);
    }
  };

  const deleteElementSizeGuide = (index) => {
    const listSizeGuideFilter = listSizeGuide.filter(
      (item, indexFilter) => indexFilter !== index
    );
    setListSizeGuide(listSizeGuideFilter);
  };

  const handleClicAddSizeMeasure = () => {
    const newSizeGuide = [...listSizeGuide];
    newSizeGuide.push({ size: "", measure: "" });
    setListSizeGuide(newSizeGuide);
  };

  /* console.log(listSizeGuide) */

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
            <label
              htmlFor="nameCategory"
              className="text-gray-950 text-sm font-normal"
            >
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
          <button
            className=" py-1 px-2 border-1 rounded-full bg-colorGoldSecundary-500 text-white mb-2 w-fit"
            onClick={handleClicAddSizeMeasure}
          >
            + añadir
          </button>
          {listSizeGuide?.length !== 0 ? (
            listSizeGuide?.map((item, index) => {
              return (
                <ListSizeGuide
                  key={index}
                  index={index}
                  size={item.size}
                  measure={item.measure}
                  handleChangeSizeGuide={(e) => handleChangeSizeGuide(e, index)}
                  deleteElementSizeGuide={deleteElementSizeGuide}
                />
              );
            })
          ) : (
            <p className="text-center text-base font-normal">
              Sin talles y medidas
            </p>
          )}
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
