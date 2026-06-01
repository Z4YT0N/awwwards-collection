import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { 
    AiFillLinkedin, 
    AiFillGithub, 
    AiFillCodepenCircle, 
    AiFillBehanceCircle 
} from "react-icons/ai";

function Footer() {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <footer
            style={{
                background: "#000",
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
                Start for free.
            </Typography>
            <Typography
                component="p"
                style={{
                    fontWeight: "bold",
                    fontSize: "40px",
                    marginBlock: "30px",
                    color: "#fff",
                }}
            >
                Design and publish your first <br /> free site with Framer today.
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
                Try Framer for Free
            </Button>
            <Grid
                container
                style={{
                    justifyContent: "space-between",
                    overflow: "hidden",
                    marginBlock: "25px",
                    maxHeight: "700px",
                    width: "90%",
                    marginInline: "auto"
                }}
            >
                <Grid lg={8}>
                    <img
                        src="https://framerusercontent.com/images/kgbbDuMXQcrih1cAJ6ILx5WjUs.jpg"
                        alt="image"
                        style={{
                            borderRadius: "0 20px 0 0",
                            boxShadow: "rgb(8 8 8) 0px -1px 0px 0px",
                            width: "100%"
                        }}
                    />
                </Grid>
                <Grid lg={4}>
                    <img
                        src="https://framerusercontent.com/images/IQe6pB7tB2VbH0hxRBUyUO04OA.jpg"
                        alt="image"
                        style={{
                            borderRadius: "20px",
                            boxShadow: "rgb(8 8 8) 0px -1px 0px 0px",
                            width: "100%"
                        }}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                style={{
                    justifyContent: "space-between",
                    marginTop: "55px",
                }}
            >
                <Grid lg={4}>
                    <Typography component="h2" style={{ fontWeight: "bold" }}>Framer</Typography>
                    <ul>
                        <li>
                            <Link href="/" passHref><Typography component="span">Learn</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Gallery</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Use Cases</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Pricing</Typography></Link>
                        </li>
                    </ul>
                </Grid>
                <Grid lg={4}>
                    <Typography component="h2" style={{ fontWeight: "bold" }}>Resources</Typography>
                    <ul>
                        <li>
                            <Link href="/" passHref><Typography component="span">Plugins</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Experts</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Startups</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Developers</Typography></Link>
                        </li>
                    </ul>
                </Grid>
                <Grid lg={4}>
                    <Typography component="h2" style={{ fontWeight: "bold" }}>Template</Typography>
                    <ul>
                        <li>
                            <Link href="/" passHref><Typography component="span">New</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Free</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Blog</Typography></Link>
                        </li>
                        <li>
                            <Link href="/" passHref><Typography component="span">Portfolio</Typography></Link>
                        </li>
                    </ul>
                </Grid>
            </Grid>
            {domLoaded && (
                <div 
                    style={{
                        textAlign: "center",
                        padding: "10% 0 0 0",
                    }}
                >
                    All Rights reserved &copy; {new Date().getFullYear()}, <a href="https://github.com/Mohamed-Elhawary/framer" target="_blank">Framer</a> {/* eslint-disable-line */}
                    <p>
                        <div 
                            style={{ 
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Made by: 
                            {/* eslint-disable-next-line */}
                            <a 
                                href="https://www.linkedin.com/in/mohamed-elhawary14/" 
                                target="_blank"
                            >  
                                <img 
                                    src="/signature.png" 
                                    alt="signature" 
                                    width="100" 
                                    height="40" 
                                    style={{ 
                                        position: "relative",
                                        bottom: "10px",
                                        left: "10px",
                                        borderRadius: "12px",
                                        boxShadow: "1px 2px 10px #ccc"
                                    }}
                                />
                            </a>
                        </div>
                    </p> 
                    <ul 
                        style={{
                            listStyle: "none",
                            padding: "0",
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                        }}
                    >
                        <li className="mr-3"><a href="https://www.linkedin.com/in/mohamed-elhawary14/" target="_blank"><AiFillLinkedin size={30} /></a></li> {/* eslint-disable-line */}
                        <li className="mr-3"><a href="https://github.com/Mohamed-Elhawary" target="_blank"><AiFillGithub size={30} /></a></li> {/* eslint-disable-line */}
                        <li className="mr-3"><a href="https://codepen.io/Mohamed-ElHawary" target="_blank"><AiFillCodepenCircle size={30} /></a></li> {/* eslint-disable-line */}
                        <li className="mr-3"><a href="https://www.behance.net/mohamed-elhawary14" target="_blank"><AiFillBehanceCircle size={30} /></a></li> {/* eslint-disable-line */}
                    </ul>
                </div>
            )}
        </footer>
    );
}

export default Footer;
