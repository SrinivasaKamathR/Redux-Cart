import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

import { cartActions } from "../reduxStore/cartSlice";

const products = [
  {
    id: "id1",
    title: "Test",
    price: 6,
    description: "This is the first product - amazing!",
  },
  {
    id: "id2",
    title: "Test 2",
    price: 3,
    description: "This is the second product - again amazing!",
  },
];

const productList = products.map((item) => (
  <ProductItem key={item.id} product={item} />
));

const Products = (props) => {
  const dispatch = useDispatch();

  // fetching data on refresh
  useEffect(() => {
    const requestingData = async () => {
      try {
        const response = await fetch(
          "https://connect-database-4a41b-default-rtdb.firebaseio.com/advance-redux-cart.json"
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(cartActions.replaceCartItem(data.cart));
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    requestingData();
  }, [dispatch]);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
