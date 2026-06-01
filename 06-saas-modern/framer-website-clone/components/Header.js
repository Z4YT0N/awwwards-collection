import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Slider from "./Slider";

export default function Header() {
    return (
        <div
            style={{
                textAlign: "center",
                background: "#000",
                height: "100vh",
                position: "relative",
            }}
        >
            <Box
                style={{
                    position: "absolute",
                    bottom: "300px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    zIndex: "1",
                }}
            >
                <Typography
                    style={{
                        fontWeight: "bold",
                        fontSize: "100px",
                        color: "#fff",
                    }}
                    component="h1"
                >
                    Ship sites with style.
                </Typography>
                <Typography
                    component="p"
                    style={{
                        fontWeight: "bold",
                        fontSize: "40px",
                        color: "#fff",
                        marginBlock: "25px",
                    }}
                >
                    Easily go from design to world class site with <br />{" "}
                    Framer, the web builder for creative pros.
                </Typography>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        style={{
                            background:
                                "linear-gradient(99deg, rgb(7, 136, 255) 0%, rgb(153, 0, 255) 100%)",
                            color: "#fff",
                            fontWeight: "bold",
                            height: "55px",
                            marginInline: "25px",
                            width: "262px",
                        }}
                    >
                        Start For Free
                    </Button>
                    <Button
                        style={{
                            background: "#fff",
                            color: "#000",
                            fontWeight: "bold",
                            height: "55px",
                            marginInline: "25px",
                            width: "262px",
                        }}
                    >
                        Browse Websites
                    </Button>
                </Box>
            </Box>
            <Box>
                <Box style={{ marginBlock: "120px" }}>
                    <Slider />
                </Box>
                <Box style={{ marginBlock: "120px" }}>
                    <Slider />
                </Box>
                <Box style={{ marginBlock: "120px" }}>
                    <Slider />
                </Box>
                <Box style={{ marginBlock: "120px" }}>
                    <Slider />
                </Box>
            </Box>
        </div>
    );
}
