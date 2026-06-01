import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: "#000",
    },
    logo: {
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: "35px",
        "&:hover": {
            color: "yellow",
            borderBottom: "1px solid white",
        },
    },
}));

function Navbar() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position="static" className={classes.toolbar} style={{ backgroundColor: "#000" }}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h4" className={classes.logo}>
                    Framer
                </Typography>
                {isMobile ? (
                    <DrawerComponent />
                ) : (
                    <div 
                        className={classes.navlinks}
                        style={{
                            marginLeft: "25px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        <Link href="/templates" className={classes.link}>
                            Templates
                        </Link>
                        <Link href="/learn" className={classes.link}>
                            Learn
                        </Link>
                        <Link href="/plugins" className={classes.link}>
                            Plugins
                        </Link>
                        <Link href="/gallery" className={classes.link}>
                            Gallery
                        </Link>
                        <Link href="/usecases" className={classes.link}>
                            Use Cases
                        </Link>
                        <Link href="/resources" className={classes.link}>
                            Resources
                        </Link>
                        <Link href="/support" className={classes.link}>
                            Support
                        </Link>
                        <Link href="/pricing" className={classes.link}>
                            Pricing
                        </Link>
                        <Button
                            style={{
                                background:
                                    "linear-gradient(99deg, rgb(7, 136, 255) 0%, rgb(153, 0, 255) 100%)",
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Start For Free
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
