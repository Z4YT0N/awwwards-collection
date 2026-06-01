"use client";
import { useRevealer } from "@/hooks/useRevealer";

const Contact = () => {
    useRevealer();
    
    return (
        <>
            <div className ="revealer"></div>
            <div className="contact">
                <div className="col">
                    <h2>Contact Us</h2>
                </div>
                <div className="col">
                    <div className="contact-copy">
                        <h2>Collaborations</h2>
                        <h2>studio@zayno.com</h2>
                    </div>
                

                    <div className="contact-copy">
                        <h2>Inquriries</h2>
                        <h2>support@zayno.com</h2>
                    </div>

                    <div className="socials">
                        <p>Instagram</p>
                        <p>Twitter</p>
                        <p>LinkedIn</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact