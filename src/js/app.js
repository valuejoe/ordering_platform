import React, { useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ShoppingCar from "./component/shoppingCar/shopingCar";
import ProductPage from "./component/product/productPage";
import Login from "./component/auth/login";
import ListManage from "./component/management/listManage";
import AddList from "./component/management/addList";
import AuthManagement from "./component/auth/authManagement";
import ShopRoute from "./route/shopRoute";
import ManageRoute from "./route/manageRoute";
import OrderList from "./component/management/order/orderList";
import CompletedList from "./component/management/completed/completedList";
const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <ShopRoute exact path="/" component={ProductPage} />
                <ShopRoute path="/shoppingCar" component={ShoppingCar} />
                <ManageRoute path="/order" component={OrderList} />
                <ManageRoute path="/completed" component={CompletedList} />
                <ManageRoute path="/listmanage" component={ListManage} />
                <ManageRoute path="/addList" component={AddList} />
                <ManageRoute
                    path="/authManagement"
                    component={AuthManagement}
                />
            </Switch>
        </HashRouter>
    );
};

export default App;
