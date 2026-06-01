import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Intro() {
    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                zIndex: "1",
                width: "100%",
                height: "min-content",
                flex: "0 0 auto",
                display: "flex",
                flexFlow: "column nowrap",
                placeContent: "center flex-start",
                alignItems: "center",
                gap: "100px",
                padding: "100px 50px 0",
                boxShadow: "rgb(8 8 8) 0px -1px 0px 0px",
                background:
                    "radial-gradient(62.1% 87.2% at 50% 100%, rgb(44, 59, 232) 0%, rgb(0, 7, 31) 100%)",
                maxHeight: "1500px",
            }}
        >
            <Typography
                style={{
                    fontWeight: "bold",
                    fontSize: "90px",
                    color: "#fff",
                }}
                component="h3"
            >
                Design, publish, done.
            </Typography>
            <Typography
                component="p"
                style={{
                    fontWeight: "bold",
                    fontSize: "40px",
                    color: "#fff",
                }}
            >
                Framer’s canvas is incredible for web design.
                <br /> Create web pages with text, links, media, and <br />{" "}
                animations—no code needed. Ready to ship?
                <br /> Publish your site with a single click.
            </Typography>
            <Button
                style={{
                    background: "linear-gradient(315deg, rgb(7, 222, 255) 0%, rgb(15, 151, 255) 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    height: "80px",
                    marginInline: "25px",
                    width: "380px",
                }}
            >
                Watch Beginner tutorial
            </Button>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        right: "1%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="https://framerusercontent.com/images/QDskOegtO9Mi7zlcyHENctrYu0.jpg?scale-down-to=1024"
                        alt="image"
                    />
                    <img
                        src="https://framerusercontent.com/images/B1QmVFcePTR5dbg9Nu0RC4pB1U.jpg?scale-down-to=512"
                        alt="image"
                        style={{
                            borderRadius: "0 20px 0 0",
                            boxShadow: "rgb(8 8 8) 0px -1px 0px 0px",
                        }}
                    />
                </div>
                <div
                    style={{
                        position: "relative",
                        left: "-3%",
                    }}
                >
                    <img
                        src="https://framerusercontent.com/images/QDskOegtO9Mi7zlcyHENctrYu0.jpg?scale-down-to=1024"
                        alt="image"
                        style={{
                            borderRadius: "20px",
                            boxShadow: "rgb(8 8 8) 0px -1px 0px 0px",
                        }}
                    />
                </div>
            </Box>
        </div>
    );
}

export default Intro;
