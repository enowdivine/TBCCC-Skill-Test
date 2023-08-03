import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../../redux/reducers/productReducers";
import userID from "../../shared/userID";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = userID();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();

    if (title && price && desc && image) {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", desc);
      formData.append("image", image);
      dispatch(addProduct(formData), setLoading(true)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setLoading(false);
          toast.success(res.payload.message);
          navigate("/");
        }
        if (res.meta.requestStatus === "rejected") {
          setLoading(false);
          toast.error(res.payload);
        }
      });
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Product
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="number"
                autoComplete="price"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                cols="20"
                rows="10"
                id="desc"
                name="desc"
                type="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image
              </label>
            </div>
            <div className="mt-2">
              <input
                id="image"
                name="image"
                type="file"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div>
            <button
              onClick={addProductHandler}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
