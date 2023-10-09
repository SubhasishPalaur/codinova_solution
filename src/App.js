import logo from './logo.svg';
import './App.css';
import HomePage from './Homepage';
import { ContextProvider } from './context';

function App() {
  return (
       <ContextProvider>
        <HomePage/>
       </ContextProvider>
  );
}

export default App;
