import axios from "axios";

const CheckStockBeforePurchase = async (cart) => {
  try {
    let updatedCart = [...cart];
    let removedItems = [];

    for (let i = updatedCart.length - 1; i >= 0; i--) {
      const { product_id, colorId, sizeId, count } = updatedCart[i];

      const response = await axios.get(`/products/${product_id}`);
      const product = response.data;

      const color = product.options.find((opt) => opt._id === colorId);
      if (!color) {
        removedItems.push(updatedCart[i]);
        updatedCart.splice(i, 1);
        continue;
      }

      const size = color.sizes.find((s) => s._id === sizeId);
      if (!size || size.stock < count) {
        removedItems.push(updatedCart[i]);
        updatedCart.splice(i, 1);
      }
    }
    // Si se eliminaron productos, actualiza el localStorage
    if (removedItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    if (removedItems.length > 0) {
      const removedProductNames = removedItems
        .map((item) => item.name)
        .join(", ");
      return `Los siguientes productos se eliminaron del carrito por falta de stock: ${removedProductNames}`;
    }

    // Si todos los productos tienen suficiente stock, continuar con la compra
    return true;
  } catch (error) {
    console.error("Error al verificar el stock:", error);
    return "Ocurrió un error al verificar el stock. Por favor, inténtalo de nuevo más tarde.";
  }
};

export default CheckStockBeforePurchase;
