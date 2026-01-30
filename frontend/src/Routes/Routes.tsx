import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchPage from "../Pages/SearchPage/SearchPage";
import HomePage from "../Pages/HomePage/HomePage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import { UserProvider } from "../Context/useAuth";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "company/:ticker", element: <CompanyPage />,
        children: [{path: "company-profile", element: <CompanyProfile />},
                   {path: "income-statement", element: <IncomeStatement />},
        ],
       },

    ],
  },
]);