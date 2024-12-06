import logo from './logo.svg';
import {Button, CustomProvider, Container} from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import './App.css';
import loadedGraph from './graph/loadGraph';

function App() {
  // console.log("Distance is:"+loadedGraph.CalculatePathDistance('A','B','C'));
  console.log(loadedGraph.shortestPathDijkstra('A','C'));
  return (
    <CustomProvider theme="light">
    <Container className="app">
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
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
