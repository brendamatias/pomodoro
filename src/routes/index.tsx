import { DefaultLayout } from "@/layouts/Default";
import { Home } from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
];

const router = createBrowserRouter(routes);

const Provider = () => <RouterProvider router={router} />;

export { Provider as RouterProvider };
