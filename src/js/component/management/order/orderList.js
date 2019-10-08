import React from "react";
import OrderContent from "./orderContent";
import Ordertable from "./orderTable";
import TableList from "../../layout/tableList";

const OrderList = () => {
    return (
            <TableList
                TableChildren={Ordertable}
                ContentChildren={OrderContent}
            />
    );
};

export default OrderList;
