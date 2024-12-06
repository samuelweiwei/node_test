import logo from './logo.svg';
import {Button, CustomProvider, Container} from 'rsuite';
import 'rsuite/dist/rsuite.min.css'
import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Blog from './pages/routers/Blog';
import About from './pages/routers/About';
import NoPage from './pages/routers/NoPage';
import Layout from './pages/routers/Layout';
import loadedGraph from './graph/loadGraph';

function App() {
  console.log("Distance is: "+loadedGraph.CalculateAvailability('A'));
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
    </Container>
  </CustomProvider>
  );
}

export default App;
