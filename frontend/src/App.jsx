import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Landing } from "./components/Navigation/Landing";
import Navigation from "./components/Navigation/";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";

import {
  GetAllProducts,
  PostProduct,
  ProductDetails,
  PutProduct,
} from "./components/Products";
import {
  GetAllShops,
  PostShop,
  PutShop,
  ShopDetails,
} from "./components/Shops";
import {
  GetAllCategories,
  CategoryProductsById,
} from "./components/Categories";

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
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      { path: "/categories", element: <GetAllCategories /> },
      { path: "/categories/:id", element: <CategoryProductsById /> },
      { path: "/products", element: <GetAllProducts /> },
      {
        path: "/products/new",
        element: <PostProduct />,
      },
      { path: "/products/:id/edit", element: <PutProduct /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/shops", element: <GetAllShops /> },
      {
        path: "/shops/new",
        element: <PostShop />,
      },
      { path: "/shops/:id/edit", element: <PutShop /> },
      { path: "/shops/:id", element: <ShopDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
