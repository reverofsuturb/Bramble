import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "./components/Navigation/";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";

import { GetAllProducts, PostProduct, ProductDetails, PutProduct } from "./components/Products";
import { GetAllShops, PostShop, PutShop } from "./components/Shops";
import { GetAllCategories } from "./components/Categories";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      { path: "/categories", element: <GetAllCategories />},
      { path: "/products", element: <GetAllProducts /> },
      {
        path: "/products/new",
        element: <PostProduct />,
      },
      { path: "/products/:id/edit", element: <PutProduct /> },
      { path: "/products/:id", element: <ProductDetails />},
      { path: "/shops", element: <GetAllShops /> },
      {
        path: "/shops/new",
        element: <PostShop />,
      },
      { path: "/shops/:id", element: <PutShop /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
