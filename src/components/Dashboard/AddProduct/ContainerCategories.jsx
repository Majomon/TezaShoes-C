function ContainerCategories({
  dataForm,
  handleChange,
  categories,
  handleClicCategory,
}) {
  return (
    <div>
      <select
        name="category"
        value={dataForm.category}
        onChange={handleChange}
        onClick={handleClicCategory}
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        {categories?.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ContainerCategories;
