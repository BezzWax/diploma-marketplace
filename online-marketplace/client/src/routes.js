import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTARTION_ROUTE, SHOP_ROUTE } from "./utils/consts";
import DevicePage from "./pages/DevicePage";
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTARTION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]