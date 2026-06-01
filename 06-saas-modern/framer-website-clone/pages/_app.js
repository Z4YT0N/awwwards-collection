import { useEffect } from 'react';
import '../styles/globals.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  useEffect(() =>{
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles);
    }
  },[]);

  return <Component {...pageProps} />
}

export default MyApp;