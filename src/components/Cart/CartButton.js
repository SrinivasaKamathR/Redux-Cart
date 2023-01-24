import { useDispatch, useSelector } from "react-redux";

import classes from "./CartButton.module.css";
import { cartActions } from "../reduxStore/cartSlice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.totalQuantity);

  const showCartHandler = () => {
    dispatch(cartActions.showCart());
  };

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
