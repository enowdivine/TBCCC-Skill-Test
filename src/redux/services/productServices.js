import axios from "axios";

const API_URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/product`;

const allProducts = async () => {
  const response = await axios.get(`${API_URL}/readAll`);
  return response.data;
};

const addProduct = async (data) => {
  const response = await axios.post(`${API_URL}/create`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateProduct = async (data) => {
  const response = await axios.put(
    `${API_URL}/update/${data.productId}`,
    data.formData,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const singleProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/readOne/${productId}`);
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/delete/${productId}`);
  return response.data;
};

const productServices = {
  allProducts,
  addProduct,
  singleProduct,
  deleteProduct,
  updateProduct,
};

export default productServices;
