"use client";
import { capitalize } from "@/utils/capitalize";
import { useStoreProducts } from "@/zustand/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconAdd } from "../../../../assets/svg/IconsDashboards";
import ContainerCategories from "../AddProduct/ContainerCategories";
import ContainerOffer from "../AddProduct/ContainerOffer";
import ImgFirebase from "../AddProduct/ImgFirebase";
import InputAddProduct from "../AddProduct/InputAddProduct";
import InputCheckbox from "../AddProduct/InputCheckbox";
import ShowColorSizeStock from "../AddProduct/ShowColorSizeStock";
import SidebarColorSize from "../AddProduct/SidebarColorSize";

function ContainerEditProduct({ productId }) {
  const { setDetail, categories, detail } = useStoreProducts();
  const [isOpenCart, setIsOpenCart] = useState(false);
  const { options, offer } = detail;
  const [oldColorInput, setOldColorInput] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [dataForm, setDataForm] = useState({});
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [isOpenMeasure, setIsOpenMeasure] = useState(false);
  const [offerInput, setOfferInput] = useState({
    offerActive: false,
    offerPrice: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [colorInputs, setColorInputs] = useState([
    {
      color: {
        codHexadecimal: "#000000",
        nameColor: "",
      },
      sizes: [{ size: "", stock: "" }],
    },
  ]);

  useEffect(() => {
    options?.map((item) => {
      setColorInputs([...options]);
    });
  }, [options]);

  /* useEffect(() => {
    if (offer?.offerActive) {
      setIsNewProduct(true);
    } else if (detail?.newProduct) {
      setIsOn(checked);
      setOfferInput({ ...offerInput, offerActive: checked });
    }
  }, [detail]); */

  useEffect(() => {
    if (dataForm.newProduct) {
      setIsNewProduct(true);
    }
    if (dataForm?.offer?.offerActive) {
      setOfferInput({ ...offerInput, offerActive: true });
      setIsOn(true);
    }
  }, [dataForm.newProduct, dataForm?.offer?.offerActive]);

  useEffect(() => {
    setDataForm({ ...dataForm, newProduct: isNewProduct });
  }, [isNewProduct]);

  useEffect(() => {
    setDataForm({ ...dataForm, offer: offerInput });
  }, [offerInput]);

  /* console.log(dataForm) */

  useEffect(() => {
    if (dataForm.category === "Carteras") {
      setIsOpenMeasure(true);
    }
  }, [dataForm.category]);

  useEffect(() => {
    setDetail(productId);
    return () => {
      setDetail({});
    };
  }, [productId]);

  useEffect(() => {
    if (detail) {
      setDataForm(detail);
    }
  }, [detail]);

  useEffect(() => {
    setDataForm({ ...dataForm, offer: offerInput });
  }, [offerInput]);

  useEffect(() => {
    setDataForm({ ...dataForm, options: colorInputs });
  }, [colorInputs]);

  const upParrayImg = (index) => {
    const updatedImages = [...dataForm.images];
    updatedImages.splice(index, 1);
    setDataForm({
      ...dataForm,
      images: updatedImages,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: capitalize(value) });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setNewImages([...files]); // Agregar los archivos seleccionados al estado de nuevas imágenes
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    /* console.log(e); */
    try {
      const response = await axios.put(`/products/${dataForm._id}`, dataForm);
      if (response.status === 200) {
        toast.success("Propiedad modificada con éxito");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar los cambios");
    }
  };

  const handleSizeChange = (colorIndex, sizeIndex, e) => {
    const { name, value } = e.target;
    /* console.log(value) */
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

  const handleColorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedColors = [...colorInputs];
    updatedColors[index].color[name] = value;
    setColorInputs(updatedColors);
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

  const handleChangeSwitch = (e) => {
    const { name, checked, value } = e.target;

    if (name === "offerActive") {
      setIsOn(checked);
      setOfferInput({ ...offerInput, offerActive: checked });
    } else {
      setOfferInput({ ...offerInput, offerPrice: parseFloat(value) });
    }
  };

  const handleChangeProduct = () => {
    setIsNewProduct(!isNewProduct);
  };

  const handleClicCategory = (e) => {
    const { value } = e.target;
    if (value.toLowerCase() === "carteras") {
      setIsOpenMeasure(true);
    } else {
      setIsOpenMeasure(false);
    }
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

  return (
    <div className="flex flex-col gap-y-3">
      {!productId.error ? (
        <>
          <div className="flex gap-x-2">
            <section>
              <h2 className=" text-base font-bold">Nuevo</h2>
              <InputCheckbox
                handleChange={handleChangeProduct}
                item={isNewProduct}
                id="isNewProductCheckbox"
              />
            </section>
            <ContainerOffer
              isOn={isOn}
              handleChangeSwitch={handleChangeSwitch}
            />
          </div>
          <div className="w-full flex flex-col gap-y-4">
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

            {/* <input
      name="description"
      value={dataForm.description || ""}
      onChange={handleChange}
    /> */}

            {/* Campo de entrada de archivo para cargar nuevas imágenes */}
            {/* <input
      type="file"
      name="images"
      onChange={handleFileChange}
      multiple
      accept="image/*"
    /> */}
            <section className="flex flex-col gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
              <h2 className="text-base font-bold">Fotos</h2>
              <ImgFirebase setFormData={setDataForm} />
            </section>

            {/* Renderizar imágenes actuales */}
            <div className="w-full h-full flex flex-col gap-x-6 bg-white border-1 border-colorGray-100 rounded-lg p-[15px]">
              <p className="text-base font-bold">Imágenes Cargadas</p>
              <div className="w-full h-full flex flex-wrap gap-x-10">
                {dataForm.images?.length > 0 ? (
                  dataForm.images?.map((image, index) => (
                    <div key={`${index}`} className="relative w-fit">
                      <img
                        className="w-24 h-24 object-contain border-1 rounded-lg"
                        src={image}
                        alt={`Image ${index}`}
                      />
                      <button
                        className="absolute top-0 right-0 px-1 py-0.5 rounded-full hover:bg-red-100 "
                        onClick={() => upParrayImg(index)}
                      >
                        <p className="text-red-500 text-sx font-bold">X</p>
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No hay imagenes cargardas</p>
                )}
              </div>
            </div>

            <section className="flex flex-col gap-y-3 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
              <article>
                <h2 className="text-base font-bold">Precio</h2>
                <div className="flex-col w-full ">
                  <p className=" text-xs font-normal">Precio Real</p>
                  <input
                    placeholder={dataForm.price}
                    type="number"
                    min={0}
                    className="w-full h-full min-h-[30px] border-colorGray-100 border-1 focus:outline-none rounded-md px-1"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              </article>
              {isOn && (
                <div className="flex-col w-full ">
                  <p className=" text-xs font-normal">Precio de oferta</p>
                  <input
                    /* type="text" */
                    name={"offer"}
                    /* placeholder={place || ""} */
                    value={dataForm?.offer?.offerPrice || ""}
                    placeholder={offer?.offerPrice}
                    onChange={handleChangeSwitch}
                    type="number"
                    className="w-full h-full min-h-[30px] border-colorGray-100 border-1 focus:outline-none rounded-md px-1"
                  />
                </div>
              )}
            </section>

            <section className="flex flex-col gap-y-2 gap-x-6 border-1 border-colorGray-100 rounded-lg p-[15px] bg-white">
              <h2 className="text-base font-bold">Variantes</h2>
              <div
                onClick={/* handleAddColor */ () => setIsOpenCart(!isOpenCart)}
                className=" flex items-center justify-between gap-x-2 w-fit cursor-pointer"
              >
                <IconAdd />
                <p className=" text-colorGoldSecundary-500 text-sm">
                  Agregar Color
                </p>
              </div>
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
            <div className="w-full mx-auto h-full flex justify-center items-center py-5 border-1">
              <button
                className="w-full h-fit bg-gray-950 text-white py-2 rounded-lg"
                onClick={handlerSubmit}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No existe el id del producto</p>
      )}
    </div>
  );
}

export default ContainerEditProduct;
