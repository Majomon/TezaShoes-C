import { useStoreProducts } from "@/zustand/store";
import { useState } from "react";
import ImgFirebase from "../AddProduct/ImgFirebase";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ListSizeGuide from "./ListSizeGuide";

function AddCategory({ setAddCategory, addCategory }) {
  const { fetchPostCategory, fetchAllCategories, setCategories } =
    useStoreProducts();
  const [finalyDataCategory, setFinalyDataCategory] = useState({
    name: "",
    image: "",
    sizesGuides: [],
  });
  const [dataCategory, setDataCategory] = useState({
    name: "",
    image: "",
  });

  const [accentMark, setAccentMark] = useState(false);

  const [listSizeGuide, setListSizeGuide] = useState([
    {
      size: "",
      measure: "",
    },
  ]);

  const handleNameChange = (e) => {
    setDataCategory((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleSubmit = async (data) => {

    setFinalyDataCategory({ ...finalyDataCategory,
      name: data.name,
      image: data.image,
      sizesGuides: listSizeGuide 
    });

    await fetchPostCategory(/* data */ finalyDataCategory);
    setTimeout(() => {
      setCategories(fetchAllCategories());
    }, 100);
    setAddCategory(false);
  };
  /* 
  console.log(finalyDataCategory); */
  const handleClicCheckbox = (e) => {
    const { value } = e.target;
    if (value) {
      setAccentMark(!accentMark);
    } else {
      setAccentMark(!value);
    }
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

  const handleClicAddSizeMeasure = () => {
    const newSizeGuide = [...listSizeGuide];
    newSizeGuide.push({ size: "", measure: "" });
    setListSizeGuide(newSizeGuide);
  };

  const deleteElementSizeGuide = (index) => {
    const listSizeGuideFilter = listSizeGuide.filter(
      (item, indexFilter) => indexFilter !== index
    );
    setListSizeGuide(listSizeGuideFilter);
  };

  return (
    <Modal
      isOpen={addCategory}
      placement={"center"}
      onOpenChange={() => setAddCategory(!addCategory)}
    >
      <ModalContent>
        <ModalHeader>
          <h1 className=" text-base font-bold">Crear categoria</h1>
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
              className=" border-1 border-colorGray-100 rounded-xl p-1"
            />
          </div>
          <div className="w-full ">
            <ImgFirebase setFormData={setDataCategory} nameCategory={true} />
          </div>
          <div className=" flex items-center gap-x-1">
            <input type="checkbox" value={true} onClick={handleClicCheckbox} />
            <p className=" text-sm font-normal">Guia de talles</p>
          </div>
          {accentMark && (
            <div>
              <button
                className=" py-1 px-2 border-1 rounded-full bg-colorGoldSecundary-500 text-white mb-2"
                onClick={handleClicAddSizeMeasure}
              >
                + añadir
              </button>
              {listSizeGuide.length !== 0 ? (
                listSizeGuide.map((item, index) => {
                  return (
                    <ListSizeGuide
                      key={index}
                      index={index}
                      size={item.size}
                      measure={item.measure}
                      handleChangeSizeGuide={(e) =>
                        handleChangeSizeGuide(e, index)
                      }
                      deleteElementSizeGuide={deleteElementSizeGuide}
                    />
                  );
                })
              ) : (
                <p className="text-center text-base font-normal">
                  Sin talles y medidas
                </p>
              )}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {dataCategory.name.length > 0 && dataCategory.image.length > 0 && (
            <div className="bg-colorGoldSecundary-500 text-white flex py-2 px-3 gap-x-2 rounded-full justify-center">
              <button onClick={() => handleSubmit(dataCategory)}>Crear</button>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddCategory;
