import React from "react";
import Book from "./components/Book/Book";
import Credit from "./components/Credit/Credit";
import Feelings from "./components/Feelings/Feelings";
import Footer from "./components/Footer/Footer";
import Head from "./components/Head/Head";
import Mail from "./components/Mail/Mail";
import Projects from "./components/Projects/Projects";
const App = () => {
  return (
    <div>
      <Head/>
      <Projects/>
      <Feelings/>
      <Footer/>
      <Book/>
      <Mail/>
      <Credit/>
    </div>
  );
};

export default App;

