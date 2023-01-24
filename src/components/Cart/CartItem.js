import React from "react";
import { useDispatch } from "react-redux";

import classes from "./CartItem.module.css";
import { cartActions } from "../reduxStore/cartSlice";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addCartItemHandler = () => {
    dispatch(cartActions.addCartItem(props.item));
  };

  const removeCartItemHandler = () => {
    dispatch(cartActions.removeCartItem(props.item));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.item.title}</h3>
        <div className={classes.price}>
          ${props.item.total.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${props.item.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={addCartItemHandler}>+</button>
          <button onClick={removeCartItemHandler}>-</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
