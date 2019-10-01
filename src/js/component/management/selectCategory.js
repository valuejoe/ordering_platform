import React from "react";
import { useSelector } from "react-redux";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { FormHelperText, MenuItem } from "@material-ui/core";

const SelectCategory = props => {
    const { category } = useSelector(state => state.manage);
    const { select, errors } = props;
    const handleChange = e => {
        props.onSelect(e);
    };
    return (
        <FormControl
            style={{ minWidth: "150px" }}
            error={errors.category ? true : false}
        >
            <InputLabel htmlFor="age-simple">選擇分類</InputLabel>
            <Select
                value={select}
                onChange={handleChange}
                inputProps={{
                    id: "category",
                    name: "category"
                }}
            >
                {category &&
                    category.map((doc, index) => (
                        <MenuItem key={index} value={doc._id}>
                            {doc.name}
                        </MenuItem>
                    ))}
            </Select>
            <FormHelperText color="error">{errors.category}</FormHelperText>
        </FormControl>
    );
};

export default SelectCategory;
