"use client";
import AddCategory from "@/components/Dashboard/Category/AddCategory";
import EditCategory from "@/components/Dashboard/Category/EditCategory";
import NavbarCategories from "@/components/Dashboard/Category/NavbarCategories";
import { useStoreProducts } from "@/zustand/store";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Delete, Edit } from "../../../../../assets/Dashboard/IconActions";
import { Tooltip } from "@nextui-org/react";

function Categories() {
  const {
    categories,
    fetchDeleteCategoryId,
    fetchAllCategories,
    setCategories,
  } = useStoreProducts();
  const [addCategory, setAddCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const handleAddCategory = () => {
    setAddCategory(true);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
  };

  const handleDeleteCategory = async (category) => {
    await fetchDeleteCategoryId(category._id);
  };

  useEffect(() => {
    setCategories(categories);
    return () => setCategories([]);
  }, [categories]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className=" w-full max-w-[960px] mx-auto p-6 relative">
      <Toaster position="top-center" />
      <div className="flex flex-col gap-y-2">
        <NavbarCategories handleAddCategory={handleAddCategory} />
        <ul className="pb-2 bg-white rounded-md">
          {categories?.map((item, index) => (
            <li
              key={index}
              className="w-full py-2 px-4 border-slate-200 border-b-1 relative"
            >
              <div>
                <div className="flex justify-between">
                  <h2>{item.name}</h2>

                  <div className=" flex gap-x-2 cursor-pointer">
                    <Tooltip
                      content="Editar"
                      delay={0}
                      closeDelay={0}
                      placement={"top-end"}
                    >
                      <button onClick={() => handleEditCategory(item)}>
                        <Edit />
                      </button>
                    </Tooltip>
                    <Tooltip
                      content="Eliminar"
                      delay={0}
                      closeDelay={0}
                      placement={"top-end"}
                    >
                      <button onClick={() => handleDeleteCategory(item)}>
                        <Delete />
                      </button>
                    </Tooltip>
                  </div>
                </div>
                {editCategory === item && (
                  <EditCategory
                    item={item}
                    editCategory={editCategory}
                    setEditCategory={setEditCategory}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {addCategory && (
        <AddCategory
          setAddCategory={setAddCategory}
          addCategory={addCategory}
          category={true}
        />
      )}
    </main>
  );
}

export default Categories;
