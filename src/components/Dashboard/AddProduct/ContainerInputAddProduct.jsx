"use client";
import ImgFirebase from "@/components/Dashboard/AddProduct/ImgFirebase";
import InputAddProduct from "@/components/Dashboard/AddProduct/InputAddProduct";
import { capitalize } from "@/utils/capitalize";
import { useStoreProducts } from "@/zustand/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconAdd } from "../../../../assets/svg/IconsDashboards";
import ContainerCategories from "./ContainerCategories";
import ContainerOffer from "./ContainerOffer";
import InputCheckbox from "./InputCheckbox";
import ShowColorSizeStock from "./ShowColorSizeStock";
import SidebarColorSize from "./SidebarColorSize";

function ContainerInputAddProduct() {
  const { categories } = useStoreProducts();
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isOpenMeasure, setIsOpenMeasure] = useState(false);
  const [colorInputs, setColorInputs] = useState([
    {
      color: {
        codHexadecimal: "#000000",
        nameColor: "",
      },
      sizes: [{ size: `${isOpenMeasure ? "1" : ""}`, stock: "" }],
    },
  ]);
  const [isFinishedColorSize, setIsFinishedColorSize] = useState(null);
  const [offerInput, setOfferInput] = useState({
    offerActive: false,
    offerPrice: 0,
  });
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    category: "",
    options: [],
    price: 0,
    description: "",
    measures: "",
    images: [],
    offer: {},
    isActive: true,
    newProduct: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setDataForm({ ...dataForm, [name]: parseFloat(value) });
    } else if (value.toLowerCase() === "carteras") {
      setDataForm({ ...dataForm, [name]: capitalize(value) });
    } else {
      setDataForm({ ...dataForm, [name]: capitalize(value) });
    }
  };

  const handleClicCategory = (e) => {
    const { value } = e.target;
    if (value.toLowerCase() === "carteras") {
      setIsOpenMeasure(true);
    } else {
      setIsOpenMeasure(false);
    }
  };

  const handleAddColor = () => {
    setColorInputs([
      ...colorInputs,
      {
        color: {
          codHexadecimal: "#000000",
          nameColor: "",
        },
        sizes: [{ size: "", stock: "" }],
      },
    ]);
  };

  const handleFinishedColorSize = () => {
    setIsFinishedColorSize([...colorInputs]);
  };

  const handleColorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedColors = [...colorInputs];
    updatedColors[index].color[name] = capitalize(value);
    setColorInputs(updatedColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, e) => {
    const { name, value } = e.target;
    const updatedSizes = [...colorInputs[colorIndex].sizes];
    updatedSizes[sizeIndex][name] = value;
    const updatedColors = [...colorInputs];
    updatedColors[colorIndex].sizes = updatedSizes;
    setColorInputs(updatedColors);
  };

  const handleAddSize = (colorIndex) => {
    const updatedColors = [...colorInputs];
    updatedColors[colorIndex].sizes.push({ size: "", stock: "" });
    setColorInputs(updatedColors);
  };

  const handleChangeSwitch = (e) => {
    const { name, checked, value } = e.target;

    if (name === "offerActive") {
      setIsOn(checked);
      setOfferInput({ ...offerInput, offerActive: checked });
    } else {
      setOfferInput({ ...offerInput, offerPrice: parseFloat(value) });
    }
  };

  const handleChangeActive = () => {
    setIsActive(!isActive);
  };

  const handleChangeProduct = () => {
    setIsNewProduct(!isNewProduct);
  };

  const deleteVariants = (e) => {
    let newColorInputs = colorInputs.filter(
      (item, index) => index !== Number(e.target.id)
    );

    setColorInputs(newColorInputs);
    if (colorInputs.length === 0) {
      setColorInputs({
        color: {
          codHexadecimal: "#000000",
          nameColor: "",
        },
        sizes: [{ size: "", stock: "" }],
      });
    }
  };

  useEffect(() => {
    setDataForm({
      ...dataForm,
      options: colorInputs,
      offer: offerInput,
      newProduct: isNewProduct,
      isActive,
    });
  }, [colorInputs, offerInput, isActive, isNewProduct]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/products`, dataForm);
      if (response.status === 200) {
        toast.success("Producto creado");
        setIsOn(false);
        setOfferInput({
          offerActive: false,
          offerPrice: 0,
        });
        setDataForm({
          name: "",
          category: "",
          options: [],
          price: 0,
          description: "",
          measures: "",
          images: [],
          offer: {},
          isActive: true,
          newProduct: true,
        });
        setColorInputs([
          {
            color: {
              codHexadecimal: "#000000",
              nameColor: "",
            },
            sizes: [{ size: "", stock: "" }],
          },
        ]);
        setIsActive(false);
        setIsNewProduct(false);
      } else {
        toast.warning("Error al crear producto");
        throw new Error(`Error al crear el producto: ${response.status}`);
      }
    } catch (error) {
      toast.warning("Error al crear producto");
      return false;
    }
  };

const checkFormCompletion = () => {
  const requiredFields = [
    "name",
    "category",
    "price",
    "description",
    "images",
  ];
  const isComplete = requiredFields.every((field) => dataForm[field]);

  const isColorNameEmpty = dataForm.options.some(
    (option) => option.color.nameColor === ""
  );

  setIsContinueEnabled(isComplete && !isColorNameEmpty);
};

  useEffect(() => {
    checkFormCompletion();
  }, [dataForm]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <section className=" flex gap-x-5">
        <article>
          <h2 className=" text-base font-bold">Nuevo</h2>
          <InputCheckbox
            handleChange={handleChangeProduct}
            item={isNewProduct}
            id="isNewProductCheckbox"
          />
        </article>
        <ContainerOffer isOn={isOn} handleChangeSwitch={handleChangeSwitch} />
      </section>
      <section className=" flex flex-col gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
        <h2 className=" text-base font-bold">Nombre y Descripcion</h2>
        <InputAddProduct
          dataForm={dataForm}
          name={"name"}
          place={"Nombre"}
          handleChange={handleChange}
        />
        <InputAddProduct
          dataForm={dataForm}
          name={"description"}
          place={"Descripción"}
          handleChange={handleChange}
        />
      </section>

      <section className="flex flex-col gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
        <h2 className="text-base font-bold">Categorias</h2>
        <ContainerCategories
          dataForm={dataForm}
          handleChange={handleChange}
          categories={categories}
          handleClicCategory={handleClicCategory}
        />
      </section>

      {isOpenMeasure ? (
        <section className="flex flex-col gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
          <InputAddProduct
            dataForm={dataForm}
            name={"measures"}
            place={"Descripcion de Medidas"}
            handleChange={handleChange}
          />
        </section>
      ) : (
        ""
      )}

      <section className="flex flex-col gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
        <h2 className="text-base font-bold">Fotos</h2>
        <ImgFirebase setFormData={setDataForm} />
      </section>

      <section className="flex flex-col gap-y-3 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
        <article>
          <h2 className="text-base font-bold">Precio</h2>
          <InputAddProduct
            dataForm={dataForm}
            name={"price"}
            place={"Precio"}
            handleChange={handleChange}
          />
        </article>
        {isOn && (
          <div className="flex-col w-full ">
            <p className=" text-xs font-normal">Precio de oferta</p>
            <input
              className="w-full h-full min-h-[30px] border-colorGray-100 border-1 focus:outline-none rounded-md px-1"
              type="text"
              name={"offer"}
              value={dataForm.offer.offerPrice || ""}
              onChange={handleChangeSwitch}
            />
          </div>
        )}
      </section>

      <section className="flex flex-col gap-y-2 gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
        <h2 className="text-base font-bold">Variantes</h2>

        <button
          onClick={/* handleAddColor */ () => setIsOpenCart(!isOpenCart)}
          className=" flex items-center justify-between gap-x-2 w-fit"
        >
          <IconAdd />
          <p className=" text-colorGoldSecundary-500 text-sm">Agregar Color</p>
        </button>
        <article className=" flex flex-wrap gap-4 ">
          {colorInputs.map((item, index) => {
            const { color, sizes } = item;
            return (
              <ShowColorSizeStock
                key={index}
                index={index}
                color={color}
                sizes={sizes}
                deleteVariants={deleteVariants}
                isOpenMeasure={isOpenMeasure}
              />
            );
          })}
        </article>
      </section>

      <div
        className={`${
          !isOpenCart && "hidden"
        } w-full min-h-screen bg-neutral-950/50 fixed top-0 left-0 right-0 backdrop-blur-sm z-10`}
        onClick={() => setIsOpenCart(false)}
      />
      <SidebarColorSize
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
        colorInputs={colorInputs}
        handleSizeChange={handleSizeChange}
        handleAddSize={handleAddSize}
        handleColorChange={handleColorChange}
        handleAddColor={handleAddColor}
        handleFinishedColorSize={handleFinishedColorSize}
        isOpenMeasure={isOpenMeasure}
      />

      {(!dataForm.name &&
      !dataForm.category &&
      !dataForm.price === 0 &&
      !dataForm.description &&
      dataForm.options.length === 0 &&
      dataForm.images.length === 0) ? (
        <p>sin boton</p>
      ) : (
        <button
          className="bg-gray-950 text-gray-50 py-2 px-4 rounded-md my-4"
          onClick={handlerSubmit}
        >
          Crear
        </button>
      )}
    </div>
  );
}

export default ContainerInputAddProduct;
