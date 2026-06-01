import React from "react";
import SectionHeader from "./SectionHeader";

const Footer = () => {
  return (
    <section className="footer" data-scroll-section>
      <SectionHeader title="Made in" />
      <h1 className="location" id="location-text">
        Cozumel
      </h1>
    </section>
  );
};

export default Footer;
