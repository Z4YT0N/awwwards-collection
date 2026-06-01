import React from "react";

const Featured = () => {
  return (
    <section className="featured-section" data-scroll-section>
      <div className="featured-row-layout">
        <h6>green</h6>
        <img
          src="https://images.unsplash.com/photo-1598838073192-05c942ede858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=100"
          alt=""
          data-scroll
        />
      </div>
      <div className="featured-column-layout">
        <h6>lily</h6>
        <img
          src="https://images.unsplash.com/photo-1552248524-10d9a7e4841c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=881&q=100"
          alt=""
          data-scroll
        />
      </div>
    </section>
  );
};

export default Featured;
