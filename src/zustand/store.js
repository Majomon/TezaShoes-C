import axios from "axios";
import { toast } from "sonner";
import zukeeper from "zukeeper";
import { create } from "zustand";

const useStoreDashboard = create(
  zukeeper((setState) => ({
    allOrders: [],
    setAllOrders: (orders) => {
      setState({ allOrders: orders });
    },
    fetchAllOrders: async () => {
      try {
        const response = await axios.get("/payOrder");
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            allOrders: response.data,
          }));
        } else {
          throw new Error(
            `Error al obtener todos los productos: ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          "Error al realizar la solicitud de todos los productos:",
          error
        );
        return false;
      }
    },
  }))
);

const useStoreUsers = create(
  zukeeper((setState) => ({
    users: [],
    userData: {},
    fetchAllUsers: async () => {
      try {
        const response = await axios.get("/users");
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            users: response.data,
          }));
        } else {
          throw new Error(
            `Error al obtener todos los productos: ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          "Error al realizar la solicitud de todos los productos:",
          error
        );
        return false;
      }
    },
    fetchUserId: async (id) => {
      try {
        const response = await axios.get(`/users/${id}`);
        if (response.status === 200) {
          setState((prevState) => ({ ...prevState, userData: response.data }));
        } else {
          throw new Error(
            `Error al obtener el detalle del Producto: ${response.status}`
          );
        }
      } catch (error) {
        console.error(`No existe el usuario de ID: ${id}`, error);
        return false; // Indica falla en la solicitud
      }
    },
    setUserId: (userId) => {
      setState({ userData: userId });
    },
    setUsers: (usersData) => {
      setState({ users: usersData });
    },
    fetchPutUserId: async (id, updatedUserData) => {
      try {
        const response = await axios.put(`/users/${id}`, updatedUserData);
        if (response.status === 200) {
          toast.success("Modificación exitosa");
        } else {
          throw new Error(toast.warning(`Error al realizar la modificacion`));
        }
      } catch (error) {
        console.error(`Error al realizar la solicitud PUT: ${id}`, error);
        return false;
      }
    },
    fetchPutUserOrderStatus: async (id, newStatus) => {
      try {
        const response = await axios.put(`/users/orderStatus/${id}`, newStatus);
        if (response.status === 200) {
          toast.success("Orden modificada", {
            position: "bottom-left",
          });
        } else {
          throw new Error(
            toast.warning(`Error al modificar la orden`, {
              position: "bottom-left",
            })
          );
        }
      } catch (error) {
        console.error(`Error al modificar la orden: ${id}`, error);
        return false;
      }
    },
  }))
);

const useStoreProducts = create(
  zukeeper((setState) => ({
    allProducts: [],
    productsFilter: [],
    detail: {},
    categories: [],
    isLoading: true,
    fetchDetailProduct: async (id) => {
      try {
        const response = await axios.get(`/products/${id}`);
        if (response.status === 200) {
          setState((prevState) => ({ ...prevState, users: response.data }));
        } else {
          throw new Error(
            `Error al obtener el detalle del Producto: ${response.status}`
          );
        }
      } catch (error) {
        console.error(`No existe el producto de ID: ${id}`, error);
        return false; // Indica falla en la solicitud
      }
    },
    fetchPutProductId: async (id, updateProductData) => {
      try {
        const response = await axios.put(`/products/${id}`, updateProductData);
        if (response.status === 200) {
          toast.success("Modificado con exito");

          const response = await axios.get("products");

          setState((prevState) => ({
            ...prevState,
            allProducts: response?.data,
          }));
        }
      } catch (error) {
        console.error(`No existe el producto de ID: ${id}`, error);
        return false; // Indica falla en la solicitud
      }
    },
    fetchAllProducts: async () => {
      try {
        const response = await axios.get("products");
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            allProducts: response?.data,
          })); // Actualiza el estado allProducts con la información de todos los productos
        } else {
          throw new Error(
            `Error al obtener todos los productos: ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          "Error al realizar la solicitud de todos los productos:",
          error
        );
        return false; // Indica falla en la solicitud
      }
    },
    fetchAllProductsFilter: async ({ category, name, color, size }) => {
      try {
        // Construye la URL de la solicitud basada en las query strings
        let url = "/products";
        if (category || name || color || size) {
          url += "?";
          if (category) url += `category=${category}`;
          if (name) url += `&name=${name}`;
          if (color) url += `&color=${encodeURIComponent(color)}`;
          if (size) url += `&size=${size}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setState({ productsFilter: response.data });
          setState({ isLoading: false });
          return response.data; // Retorna los productos obtenidos
        } else {
          throw new Error(`Error al obtener los productos: ${response.status}`);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        return false; // Indica falla en la solicitud
      }
    },
    fetchDeleteProductId: async (id) => {
      try {
        const response = await axios.delete(`/products/${id}`);

        if (response.status === 200) {
          toast.success("Producto eliminado");

          const response = await axios.get("products");

          setState((prevState) => ({
            ...prevState,
            allProducts: response?.data,
          }));
        }
      } catch (error) {
        console.error(`No existe el producto de ID: ${id}`, error);
        return false; // Indica falla en la solicitud
      }
    },
    fetchAllCategories: async () => {
      try {
        const response = await axios.get("/categories");
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            categories: response.data,
          }));
        } else {
          throw new Error(
            `Error al obtener las categorias: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error al realizar la solicitud", error);
        return false; // Indica falla en la solicitud
      }
    },
    fetchPostCategory: async (requestData) => {
      try {
        const response = await axios.post(`/categories`, requestData);
        if (response.status === 200) {
          toast.success("Categoria creada");

          const response = await axios.get("/categories");
          setState((prevState) => ({
            ...prevState,
            categories: response?.data,
          }));

          setState((prevState) => ({ ...prevState, orderData: response.data }));
        } else {
          throw new Error(toast.warning(`Error al crear la categoria`));
        }
      } catch (error) {
        console.error(`Error al crear la categoria`, error);
        return false;
      }
    },
    fetchPutCategoryId: async (id, updatedCategoryData) => {
      try {
        const response = await axios.put(
          `/categories/${id}`,
          updatedCategoryData
        );
        if (response.status === 200) {
          toast.success("Modificación exitosa");
          const response = await axios.get("/categories");
          setState((prevState) => ({
            ...prevState,
            categories: response?.data,
          }));
        } else {
          throw new Error(toast.warning(`Error al realizar la modificacion`));
        }
      } catch (error) {
        console.error(`Error al realizar la solicitud PUT: ${id}`, error);
        return false;
      }
    },
    fetchDeleteCategoryId: async (id) => {
      try {
        const response = await axios.delete(`/categories/${id}`);
        if (response.status === 200) {
          const response = await axios.get("/categories");
          toast.success("Categoria eliminado");
          setState((prevState) => ({
            ...prevState,
            categories: response?.data,
          }));
        } else {
          throw new Error(
            toast.warning(`Error al eliminar la categoria: ${response.status}`)
          );
        }
      } catch (error) {
        console.error(`No existe la categoria de ID: ${id}`, error);
        return false; // Indica falla en la solicitud
      }
    },
    fetchPostPutProducts: async (requestData) => {
      try {
        const response = await axios.post(`/products/stock`, requestData);
        if (response.status === 200) {
          /*        toast.success("Proceso de compra"); */
          return "Ok";
        } else {
          throw new Error(toast.warning(`Error al descontar el stock`));
        }
      } catch (error) {
        console.error(`Error al descontar el stock`, error);
        return false;
      }
    },
    fetchPostPutProductsRestore: async (requestData) => {
      try {
        const response = await axios.post(
          `/products/stock/restore`,
          requestData
        );
        if (response.status === 200) {
          /*     toast.success("Se restauro el stock"); */
          return "Ok";
        } else {
          throw new Error(toast.warning(`Error al restaurar el stock`));
        }
      } catch (error) {
        console.error(`Error al restaurar el stock`, error);
        return false;
      }
    },
    setProducts: (products) => {
      setState({ allProducts: products });
    },
    setDetail: (product) => {
      setState({ detail: product });
    },
    setCategories: (category) => {
      setState({ categories: category });
    },
    setProductsFilter: (productsFilter) => {
      setState({ productsFilter: productsFilter });
    },
  }))
);

const useStoreProductsFilter = create(
  zukeeper((set) => ({
    productsFilterTwo: [],
    selectColor: null,
    selectSize: null,
    selectOrder: null,
    setProductsFilterTwo: (state) => {
      set({ productsFilterTwo: state });
    },
    setSelectColor: (stateColor) => {
      set({ selectColor: stateColor });
    },
    setSelectSize: (stateSize) => {
      set({ selectSize: stateSize });
    },
    setSelectOrder: (stateOrder) => {
      set({ selectOrder: stateOrder });
    },
  }))
);

const useStoreOpenSearch = create(
  zukeeper((set) => ({
    isOpenSearch: false,
    setIsOpenSearch: (state) => {
      set({ isOpenSearch: state });
    },
  }))
);

const useStoreOpenCart = create(
  zukeeper((set) => ({
    isOpenCart: false,
    setIsOpenCart: (state) => {
      set({ isOpenCart: state });
    },
  }))
);

const useStoreCartLocalStorage = create(
  zukeeper((set) => ({
    totalCart: 0,
    cartLocalStorage: [],
    setTotalCart: (state) => {
      set({ totalCart: state });
    },
    setCartLocalStorage: (state) => {
      set({ cartLocalStorage: state });
    },
  }))
);

const useStoreUserId = create(
  zukeeper((set) => ({
    userId: null,
    setUserId: (state) => {
      set({ userId: state });
    },
  }))
);

const useStorePayOrder = create(
  zukeeper((setState) => ({
    idOrderData: {},
    orderData: {},
    fetchGetOrder: async (id) => {
      try {
        const response = await axios.get(`/payOrder/${id}`);
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            idOrderData: response.data,
          }));
        } else {
          throw new Error(
            `Error al obtener las ordenes de compra: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error al realizar la solicitud", error);
        return false; // Indica falla en la solicitud
      }
    },

    fetchPostOrder: async (requestData) => {
      try {
        const response = await axios.post(`/payOrder`, requestData);

        if (response.status === 200) {
          /*  toast.success("Orden creada"); */
          setState({ orderData: response.data });
          /*         setState((prevState) => ({ ...prevState, orderData: response.data })); */
          return "Orden creada";
        } else {
          throw new Error(toast.warning(`Error al crear la orden`));
        }
      } catch (error) {
        console.error(`Error al crear la orden`, error);
        return false;
      }
    },
    fetchPutOrderId: async (id, updateProductData) => {
      try {
        const response = await axios.put(`/payOrder/${id}`, updateProductData);
        if (response.status === 200) {
          /*  toast.success("Modificado con exito"); */
          return "Orden modificada";
        } else {
          throw new Error(
            toast.warning(`Error al realizar la modificacion`, {
              position: "bottom-left",
            })
          );
        }
      } catch (error) {
        console.error(`No existe el producto de ID: ${id}`, error);
        return false; // Indica falla en la solicitud
      }
    },
    setOrderData: (data) => {
      setState({ orderData: data });
    },
    setOrderId: (state) => {
      setState({ idOrderData: state });
    },
  }))
);

const useStoreSendEmails = create(
  zukeeper((setState) => ({
    fetchPostStatusPayment: async (requestData) => {
      try {
        const response = await axios.post(
          `/resendEmail/paymentReceived`,
          requestData
        );

        if (response.status === 200) {
          toast.success("Se envio notificando el pago", {
            position: "bottom-left",
          });
        } else {
          throw new Error(
            toast.warning(`Error al cambiar el estado del pago`, {
              position: "bottom-left",
            })
          );
        }
      } catch (error) {
        console.error(`Error al cambiar el estado del pago`, error);
        return false;
      }
    },
    fetchPostOrderCancel: async (requestData) => {
      try {
        const response = await axios.post(
          `/resendEmail/paymentCancel`,
          requestData
        );

        if (response.status === 200) {
          toast.success("Se envio email con información del pedido cancelado", {
            position: "bottom-left",
          });
          /*    return "Se envio email con información del pedido cancelado"; */
        } else {
          throw new Error(toast.warning(`Error al cancelar la orden`));
        }
      } catch (error) {
        console.error(`Error al cancelar la orden`, error);
        return false;
      }
    },
    fetchPostOrderCreate: async (requestData) => {
      try {
        const response = await axios.post(
          `/resendEmail/createOrder`,
          requestData
        );

        if (response.status === 200) {
          /*  toast.success("Email enviado por orden creada"); */
          return "Email enviado";
        } else {
          throw new Error(toast.warning(`Error al crear la orden`));
        }
      } catch (error) {
        console.error(`Error al crear la orden`, error);
        return false;
      }
    },
    fetchPostNotification: async (item, requestData) => {
      try {
        const response = await axios.post(`/resendEmail/packageSent`, {
          item,
          requestData,
        });

        if (response.status === 200) {
          toast.success("Email enviado - Notificación de envio", {
            position: "bottom-left",
          });
        } else {
          throw new Error(toast.warning(`Error al enviar el email`));
        }
      } catch (error) {
        console.error(`Error al enviar el email`, error);
        return false;
      }
    },
    fetchPostOrderNoticeNaty: async (requestData) => {
      try {
        const response = await axios.post(
          `/resendEmail/orderNotice`,
          requestData
        );

        if (response.status === 200) {
          /*  toast.success("Email enviado por orden creada"); */
          return "Email avisando a naty por la compra del cliente";
        } else {
          throw new Error(toast.warning(`Error al avisarle a Naty`));
        }
      } catch (error) {
        console.error(`Error al avisarle a Naty`, error);
        return false;
      }
    },
    fetchPostStatusPaymentNaty: async (requestData) => {
      try {
        const response = await axios.post(
          `/resendEmail/paymentOrderModo`,
          requestData
        );

        if (response.status === 200) {
          /*  toast.success("Email enviado por orden creada"); */
          return "Email avisando a naty el estado del pago de la orden";
        } else {
          throw new Error(
            toast.warning(
              `Error al avisarle a Naty el estado del pago de la orden`
            )
          );
        }
      } catch (error) {
        console.error(
          `Error al avisarle a Naty el estado del pago de la orden`,
          error
        );
        return false;
      }
    },
  }))
);

const useStoreTimePurchase = create(
  zukeeper((set) => ({
    timePurchase: false,
    purchaseCancel: false,
    setTimePurchase: (state) => {
      set({ timePurchase: state });
    },
    setPurchaseCancel: (state) => {
      set({ purchaseCancel: state });
    },
  }))
);

const useStoreResetPassword = create(
  zukeeper((setState) => ({
    errorMessage: null,
    okChange: false,
    setOkChange: (state) => {
      setState({ okChange: state });
    },
    setErrorMessage: (state) => {
      setState({ errorMessage: state });
    },
    fetchPutResetPassword: async (id, updatedPassword) => {
      try {
        const response = await axios.put(
          `/resetPassword/${id}`,
          updatedPassword
        );
        if (response.status === 200) {
          setState({ okChange: true });
          toast.success("Modificación exitosa");
        } else {
          throw new Error("Error al realizar la modificacion");
        }
      } catch (error) {
        console.error(
          `Error al realizar la solicitud PUT: ${id}`
          /*     error.request.response */
        );

        // Extraer el mensaje de error del objeto JSON
        const errorMessage = JSON.parse(error.request.response).error;
        setState({ errorMessage: errorMessage || "Error desconocido" });
        return false;
      }
    },
  }))
);

export {
  useStoreCartLocalStorage,
  useStoreDashboard,
  useStoreOpenCart,
  useStoreOpenSearch,
  useStorePayOrder,
  useStoreProducts,
  useStoreProductsFilter,
  useStoreResetPassword,
  useStoreSendEmails,
  useStoreTimePurchase,
  useStoreUserId,
  useStoreUsers,
};
