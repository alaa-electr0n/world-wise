import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// import HomePage from "./assets/pages/homePage/Homepage";
// import Pricing from "./assets/pages/pricing/Pricing";
// import Product from "./assets/pages/product/Product";
// import Login from "./assets/pages/login/Login";
// import PageNotFound from "./assets/pages/pagenotfound/PageNotFound";
// import AppLayout from "./assets/pages/appPage/AppLayout";

//optimizing the js bundle and turned it into chuncks
const Homepage = lazy(() => import("./assets/pages/homePage/Homepage"));
const Pricing = lazy(() => import("./assets/pages/pricing/Pricing"));
const Product = lazy(() => import("./assets/pages/product/Product"));
const Login = lazy(() => import("./assets/pages/login/Login"));
const PageNotFound = lazy(() =>
  import("./assets/pages/pagenotfound/PageNotFound")
);
const AppLayout = lazy(() => import("./assets/pages/appPage/AppLayout"));

import Form from "./assets/components/Form/Form";
import CityList from "./assets/components/City/CityList";
import CountryList from "./assets/components/Country/CountryList";
import City from "./assets/components/City/City";
import { CitiesProvider } from "./assets/contexts/CitiesContext";
import { UseAuthProvider } from "./assets/contexts/UserAuthContext";
import ProtectedRoute from "./assets/pages/protectectionPage/ProtectedRoute";
import SpinnerFullPage from "./assets/components/SpinnerFullPage/SpinnerFullPage";

function App() {
  return (
    <div>
      <CitiesProvider>
        <UseAuthProvider>
          <BrowserRouter>
            {/* Suspense in a React Component is used to show a fallback UI while the lazy-loaded component is being loaded. */}
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                {/* Route "index" is  a flag for the default page to go to in the app */}
                <Route index element={<Homepage />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="Product" element={<Product />} />
                <Route path="login" element={<Login />} />

                {/* Protected Routes : protect all the app from unAuthnticated users */}
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* {redirect to cities as a default page} */}
                  <Route index element={<Navigate to={"cities"} replace />} />
                  <Route path="cities" element={<CityList />} />
                  {/* using Params and quesries*/}
                  {/* Step 1: Setting the Route Path: ":/id" and what element it will lead to */}
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </UseAuthProvider>
      </CitiesProvider>
    </div>
  );
}

export default App;
