import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

// fetching data on refresh
export const requestingData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.notification({
        status: "pending",
        title: "fetching request",
        message: "fetching cart data...!!!",
      })
    );
    try {
      const response = await fetch(
        "https://connect-database-4a41b-default-rtdb.firebaseio.com/advance-redux-cart.json"
      );
      const data = await response.json();
      if (response.ok) {
        if (data.totalQuantity === 0) {
          dispatch(
            cartActions.replaceCartItem({ cartItems: [], totalQuantity: 0 })
          );
        } else {
          dispatch(cartActions.replaceCartItem(data));
        }
        dispatch(
          uiActions.notification({
            status: "success",
            title: "fetch request successful",
            message: "cart data was fetched successfully...!!!",
          })
        );
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.log(err.message);
      dispatch(
        uiActions.notification({
          status: "error",
          title: "fetch request failed",
          message: "unable to fetch cart data...!!!",
        })
      );
    }
  };
};

// sending cart data to database
export const sendingData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.notification({
        status: "pending",
        title: "sending request",
        message: "sending cart data...!!!",
      })
    );
    try {
      const response = await fetch(
        "https://connect-database-4a41b-default-rtdb.firebaseio.com/advance-redux-cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(
          uiActions.notification({
            status: "success",
            title: "send request successful",
            message: "cart data was sent successfully...!!!",
          })
        );
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      dispatch(
        uiActions.notification({
          status: "error",
          title: "send request failed",
          message: "unable to send cart data...!!!",
        })
      );
    }
  };
};
