"use client";
import AddCategory from "@/components/Dashboard/Category/AddCategory";
import EditCategory from "@/components/Dashboard/Category/EditCategory";
import NavbarCategories from "@/components/Dashboard/Category/NavbarCategories";
import { useStoreProducts } from "@/zustand/store";
import { useState } from "react";
import { Toaster } from "sonner";
import { Delete, Edit } from "../../../../../assets/Dashboard/IconActions";

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

    setTimeout(() => {
      setCategories(fetchAllCategories());
    }, 100);
  };

  return (
    <main className="w-full p-6 relative">
      <Toaster position="top-center" />
      <div className="p-4 border border-gray-300 rounded-md">
        <NavbarCategories handleAddCategory={handleAddCategory} />
        <ul className="py-2">
          {categories?.map((item, index) => (
            <li
              key={index}
              className="w-full  py-2 px-4 border-gray-200 border-1 relative"
            >
              <div>
                <div className="flex justify-between">
                  <h2>{item.name}</h2>

                  <div className=" flex gap-x-2 cursor-pointer">
                    <button onClick={() => handleEditCategory(item)}>
                      <Edit />
                    </button>
                    <button onClick={() => handleDeleteCategory(item)}>
                      <Delete />
                    </button>
                  </div>
                </div>
                {editCategory === item && (
                  <EditCategory item={item} setEditCategory={setEditCategory} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {addCategory && (
        <AddCategory setAddCategory={setAddCategory} category={true} />
      )}
    </main>
  );
}

export default Categories;
