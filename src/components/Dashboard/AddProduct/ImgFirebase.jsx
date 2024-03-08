"use client";
import appFirebase from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const storage = getStorage(appFirebase);

function ImgFirebase({ setFormData, nameCategory }) {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  /* console.log(setFormData.url) */

  useEffect(() => {
    if (imageUrls?.length > 0) {
      if (nameCategory) {
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrls[0],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          images: imageUrls,
        }));
      }
    }
  }, [imageUrls]);

  const fileHandler = async (e) => {
    const fileList = Array.from(e.target.files);
    setLoading(true);

    const uploadTasks = fileList.map(async (file) => {
      const uniqueFileName = `${uuidv4()}_${file.name}`;
      const storageRef = ref(storage, `${uniqueFileName}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    Promise.all(uploadTasks)
      .then((urls) => {
        /* console.log(urls) */
        setImageUrls(urls);
        setLoading(false);
        console.log("URLs de las imágenes subidas:", urls);
      })
      .catch((error) => {
        console.error("Error al subir las imágenes:", error);
      });
  };

  /* console.log(imageUrls) */

  return (
    <div>
      <div className="w-full py-2 flex flex-col gap-y-3">
        {nameCategory ? (
          <label htmlFor="fileUpload" className="w-full cursor-pointer">
            Seleccionar imagen
          </label>
        ) : (
          <label htmlFor="fileUpload" className="w-full cursor-pointer">
            Seleccionar imagenes
          </label>
        )}

        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={fileHandler}
          style={{ display: "none" }}
          multiple={!nameCategory} // Permitir múltiples archivos si no existe nameCategory
        />

        {loading && (
          <div className="w-full flex justify-center">
            <p className="py-2 ">Subiendo...</p>
          </div>
        )}
        {imageUrls?.length > 0 && nameCategory ? (
          <div>
            <img
              src={imageUrls[0]}
              alt={`Imagen `}
              className="w-full h-[130px] rounded-md object-cover"
            />
          </div>
        ) : (
          <div>
            <ul className="w-full grid grid-cols-3 gap-3">
              {imageUrls?.map((url, index) => (
                <li key={index}>
                  <img
                    src={url}
                    alt={`Imagen ${index}`}
                    className="w-full h-[130px] rounded-md object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImgFirebase;
