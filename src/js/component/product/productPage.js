import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fade, Container, Grid } from "@material-ui/core";
import ProductList from "./productList";

const TabPanel = props => {
    const { value, index, category } = props;
    const { product } = useSelector(state => state.data);
    return (
        <Fade in={value === index}>
            <Container hidden={value !== index}>
                <Grid
                    container
                    spacing={1}
                    justify="flex-start"
                    style={{ marginTop: "3%" }}
                >
                    {product &&
                        product.map((doc, index) => {
                            if (doc.category === category) {
                                return (
                                    <Grid
                                        key={index}
                                        item
                                        xs={12}
                                        sm={4}
                                        md={3}
                                    >
                                        <ProductList product={doc} />
                                    </Grid>
                                );
                            }
                        })}
                </Grid>
            </Container>
        </Fade>
    );
};

const ProductPage = () => {
    const { category } = useSelector(state => state.data);
    const { tabSelectValue } = useSelector(state => state.UI);
    return (
        <React.Fragment>
            {category &&
                category.map((doc, index) => (
                    <TabPanel
                        key={index}
                        value={tabSelectValue}
                        index={index}
                        category={doc._id}
                    />
                ))}
        </React.Fragment>
    );
};

export default ProductPage;
