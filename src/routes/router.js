import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Calendar from "../pages/Calendar";
import BigCalendar from "../pages/BigCalendar";
import EventCalendar from "../pages/EventCalendar";
import CreateProduct, {
  action as createProductAction,
} from "../pages/CreateProduct";
import Countries, {
  loader as countriesLoader,
  action as countriesAction,
} from "../pages/Countries";
import ErrorPage from "../pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "calendar", element: <Calendar /> },
      { path: "big-calendar", element: <BigCalendar /> },
      { path: "event-calendar", element: <EventCalendar /> },
      {
        path: "create-product",
        element: <CreateProduct />,
        action: createProductAction,
      },
      {
        path: "countries",
        element: <Countries />,
        loader: countriesLoader,
        action: countriesAction,
      },
    ],
  },
]);
