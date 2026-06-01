import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Second from './components/Second/Second';
import Third from './components/Third/Third';
import Four from './components/Four/Four';
import Five from './components/Five/Five';

function App() {
  return (
    <div className="App">
      <Home/>
      <Second/>
      <Third/>
      <Four/>
      <Five/>
      <div class="noise"></div>
     <div class="container"></div>
    </div>
  );
}

export default App;
