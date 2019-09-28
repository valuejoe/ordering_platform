import React from "react";
import Navbar from "./navbar";

const Home = props => {
    const { children } = props;
    return (
        <React.Fragment>
            <div>
                <Navbar />
                <div
                    style={{
                        overflow: "auto",
                        height: "90vh"
                    }}
                >
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
