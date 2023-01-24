import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./components/reduxStore/uiSlice";

let sendRequest = false;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cartUi.showCart);
  const notification = useSelector((state) => state.cartUi.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendData = async () => {
      try {
        dispatch(
          uiActions.notification({
            status: "pending",
            title: "sending request",
            message: "sending cart data...!!!",
          })
        );
        const response = await fetch(
          "https://connect-database-4a41b-default-rtdb.firebaseio.com/advance-redux-cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
              cart: cart,
            }),
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

    if (!sendRequest) {
      sendRequest = true;
      return;
    }

    sendData();
  }, [cart, dispatch]);
  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
