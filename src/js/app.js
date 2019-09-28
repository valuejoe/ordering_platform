import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ShoppingCar from "./component/shoppingCar/shopingCar";
import ProductPage from "./component/product/productPage";
import Login from "./component/auth/login";
import ManageList from "./component/management/manageList";
import AddList from "./component/management/addList";
import AuthManagement from "./component/auth/authManagement";
import ShopRoute from "./route/shopRoute";
import ManageRoute from "./route/manageRoute";
const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <ShopRoute exact path="/" component={ProductPage} />
                <ShopRoute path="/shoppingCar" component={ShoppingCar} />
                <ManageRoute path="/manageList" component={ManageList} />
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
