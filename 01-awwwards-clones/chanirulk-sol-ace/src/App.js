import './App.css';
import Five from './components/Five/Five';
import Four from './components/Four/Four';
import Home from './components/Home/Home';
import Grid from './components/Second/Grid';
import Seven from './components/Seven/Seven';
import Six from './components/Six/Six';
import Third from './components/Third/Third';
 
function App() {
  return (
    <div className="App">
      <Home/>
      <Grid/>
      <Third/>
      <Four/>
      <Five/>
      <Six/>
      <Seven/>
    </div>
  );
}

export default App;
