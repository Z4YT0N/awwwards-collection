import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Slider from "./Slider";

function tweets() {
    return (
        <div
            style={{
                background: "#fff",
                textAlign: "center",
                margin: "auto",
                paddingBlock: "40px",
            }}
        >
            <Typography
                style={{
                    fontWeight: "bold",
                    fontSize: "100px",
                    color: "rgb(7, 136, 255)",
                }}
                component="h4"
            >
                “It’s like magic.”
            </Typography>
            <Typography
                component="p"
                style={{
                    fontWeight: "bold",
                    fontSize: "40px",
                    marginBlock: "30px",
                    color: "#000",
                }}
            >
                Our customers love how easy it is to design <br /> and publish a
                professional site in Framer.
            </Typography>
            <Button
                style={{
                    boxShadow: "rgb(255 90 159 / 30%) 0px 0px 0px 0px",
                    background:
                        "linear-gradient(315deg, rgb(7, 222, 255) 0%, rgb(15, 151, 255) 100%)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontWeight: "bold",
                    height: "60px",
                    width: "380px",
                }}
            >
                Watch Beginner tutorial
            </Button>
            <Grid container style={{ justifyContent: "center", marginBlock: "25px" }}>
                <Grid lg={4}>
                    <Slider isVertical />
                </Grid>
                <Grid lg={4}>
                    <Slider isVertical />
                </Grid>
                <Grid lg={4}>
                    <Slider isVertical />
                </Grid>
            </Grid>
        </div>
    );
}

export default tweets;
