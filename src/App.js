import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import {
  sendingData,
  requestingData,
} from "./components/reduxStore/cart-actions";

let sendRequest = false;
let requestData = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cartUi.showCart);
  const notification = useSelector((state) => state.cartUi.notification);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (requestData) {
      dispatch(requestingData());
      requestData = false;
      return;
    }
    if (!sendRequest) {
      sendRequest = true;
      return;
    }

    dispatch(sendingData(cart));
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
