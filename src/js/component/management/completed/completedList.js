import React from "react";
import TableList from "../../layout/tableList";
import CompletedTable from "./completedTable";
import CompletedContent from "./completedContent";
const Test = () => {
    return <div>123</div>;
};

function completedList() {
    return (
        <TableList
            TableChildren={CompletedTable}
            ContentChildren={CompletedContent}
        />
    );
}

export default completedList;
