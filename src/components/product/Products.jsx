import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../redux/reducers/productReducers";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products &&
          products.map((item) => (
            <div className="group relative" key={item._id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={`${process.env.REACT_APP_ENDPOINT}/${item.image}`}
                  alt="Front of men&#039;s Basic Tee in black."
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/product-details/${item._id}`}>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {item.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Color</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
