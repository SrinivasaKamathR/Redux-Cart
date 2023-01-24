import React from "react";
import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../reduxStore/cartSlice";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addCartItem(props.product));
  };

  // console.log(cartItems);

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{props.product.title}</h3>
          <div className={classes.price}>${props.product.price.toFixed(2)}</div>
        </header>
        <p>{props.product.description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
