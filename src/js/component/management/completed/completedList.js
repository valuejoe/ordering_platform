import React from "react";
import TableList from "../../layout/tableList";
import CompletedTable from "./completedTable";
import CompletedContent from "./completedContent";

function completedList() {
    return (
        <TableList
            TableChildren={CompletedTable}
            ContentChildren={CompletedContent}
        />
    );
}

export default completedList;
