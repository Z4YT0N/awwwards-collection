import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

import { Provider } from './components/setup/provider';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

ReactDOM.createRoot(document.createElement('div')).render(
  // eslint-disable-next-line react/no-children-prop
  <SyntaxHighlighter language="" children={''} />
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
);
