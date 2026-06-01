import React, { useState } from "react";
import {
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "blue",
        fontSize: "20px",
    },
    icon: {
        color: "white",
    },
}));

function DrawerComponent() {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/templates">Templates</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/learn">Learn</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/plugins">Plugins</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/gallery">Gallery</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/usecases">Use Cases</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/resources">Resources</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/support">Support</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link href="/pricing">Pricing</Link>
                        </ListItemText>
                    </ListItem>
                    <Button
                        style={{
                            background:
                                "linear-gradient(99deg, rgb(7, 136, 255) 0%, rgb(153, 0, 255) 100%)",
                            color: "#fff",
                            fontWeight: "bold",
                            marginInline: "10px",
                        }}
                    >
                        Start For Free
                    </Button>
                </List>
            </Drawer>
            <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                style={{ position: "absolute", right: 0 }}
            >
                <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
        </>
    );
}
export default DrawerComponent;
