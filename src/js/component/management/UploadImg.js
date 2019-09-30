import React, { useState } from "react";
import { ButtonBase, Typography } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const UploadImag = props => {
    const { fileName, onSelectFile } = props;
    const handleChange = e => {
        onSelectFile(e);
    };

    return (
        <React.Fragment>
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChange}
            />
            <label htmlFor="raised-button-file">
                <ButtonBase component="span" style={{ height: "50px" }}>
                    <ImageOutlinedIcon fontSize="large" />
                    <Typography style={{ width: "100px", overflow: "hidden" }}>
                        {fileName}
                    </Typography>
                </ButtonBase>
            </label>
        </React.Fragment>
    );
};

export default UploadImag;
