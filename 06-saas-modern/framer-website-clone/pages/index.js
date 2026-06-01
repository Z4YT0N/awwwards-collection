import Footer from '../components/Footer'
import Header from '../components/Header'
import Intro from '../components/Intro'
import Navbar from '../components/Navbar'
import Templates from '../components/Templates'
import Tweets from '../components/Tweets'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Intro />
      <Templates />
      <Tweets />
      <Footer />
    </div>
  )
}
