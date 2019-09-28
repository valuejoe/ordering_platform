import React, { useState } from "react";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography
} from "@material-ui/core";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ value }) => (
    <Paper>
        <Typography>{value.title}</Typography>
        <Typography>{value.cost}</Typography>
    </Paper>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => {
                return (
                    <SortableItem
                        key={`item-${index}`}
                        index={index}
                        value={value}
                        iner={index}
                    />
                );
            })}
        </ul>
    );
});

const ManageList = () => {
    const [items, setitems] = useState([
        { title: "炸雞排", cost: 100 },
        { title: "甜不辣", cost: 50 },
        { title: "洋蔥圈", cost: 40 },
        { title: "吃吃", cost: 100 },
        { title: "屁屁", cost: 250 }
    ]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setitems(arrayMove(items, oldIndex, newIndex));
    };

    return (
        <div>
            <Container>
                <SortableList items={items} onSortEnd={onSortEnd} />
            </Container>
        </div>
    );
};

export default ManageList;
