import logo from './logo.svg';
import './App.css';
import { CustomProvider, Container, Button, Sidebar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() { 
  return (
    <CustomProvider theme="light">
      <Container className="app">
        <header className="app-header">
          <div className='Parent-div'>
            <div className='Child-div'><img src={logo} className="App-logo" alt="logo" /></div>
            <div className='Child-div'><h2>hahahahhaha</h2></div>
          </div>
          <hr />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <Button href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </Button>
        </header>
      </Container>
    </CustomProvider>
  );
}

export default App;
