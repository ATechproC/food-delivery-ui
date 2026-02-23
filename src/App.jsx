import React from 'react'
import { ToastContainer } from 'react-toastify';

import SignupProvider from './providers/SignupProvider'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Search from './pages/Search'
import Restaurant from './pages/Restaurant'
import AddToCartProvider from './providers/AddToCartProvider'
import Cart from './pages/Cart'
import CartModelProvider from './providers/CartModelProvider'
import AppProvider from './providers/AppProvider'
import Profile from './pages/Profile'
import Address from "./pages/Address"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"
import Notifications from "./pages/Notifications"
import Payments from "./pages/Payments"
import Events from './pages/Events'
import Layout from './components/Layout';
import CreateOwnerRestaurant from './pages/CreateOwnerRestaurant';
import AddCategoryModelProvider from './providers/AddCategoryModelProvider';
import Details from './pages/Details';
import FoodMenu from "./pages/FoodMenu";
import FoodCategory from "./pages/FoodCategory"
import Ingredients from "./pages/Ingredients"
import AdminOrders from './pages/AdminOrders';
import AddIngredientCategoryProvider from './providers/AddIngredientCategoryProvider';
import AddIngredientsProvider from './providers/AddIngredientsProvider';
import FoodProvider from './providers/FoodProvider';
import IngredientsInputsProvider from './providers/IngredientsInputsProvider';
import UpdateStatusProvider from './providers/UpdateStatusProvider';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurant/:city/:resId" element={<Restaurant />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin/restaurant" element={<CreateOwnerRestaurant />} />
        <Route path="/admin/restaurant/details" element={<Details />} />
        <Route path="/admin/restaurant/category" element={<FoodCategory />} />
        <Route path="/admin/restaurant/menu" element={<FoodMenu />} />
        <Route path="/admin/restaurant/orders" element={<AdminOrders />} />
        <Route path="/admin/restaurant/ingredients" element={<Ingredients />} />
      </Route>
    )
  )

  return <div>
    <AppProvider>
      <SignupProvider>
        <AddToCartProvider>
          <CartModelProvider>
            <AddCategoryModelProvider>
              <AddIngredientCategoryProvider>
                <AddIngredientsProvider>
                  <FoodProvider>
                    <IngredientsInputsProvider>
                      <UpdateStatusProvider>
                        <RouterProvider router={router} />
                        <ToastContainer />
                      </UpdateStatusProvider>
                    </IngredientsInputsProvider>
                  </FoodProvider>
                </AddIngredientsProvider>
              </AddIngredientCategoryProvider>
            </AddCategoryModelProvider>
          </CartModelProvider>
        </AddToCartProvider>
      </SignupProvider>
    </AppProvider>
  </div>
}

export default App
