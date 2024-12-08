import './App.css';
import 'rsuite/dist/rsuite.min.css';
import { useState, useRef } from 'react';
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Nav,
  IconButton,
  HStack,
  Stack,
  Text,
  Navbar
} from 'rsuite';
import { Icon } from '@rsuite/icons';
import { FaReact } from 'react-icons/fa';
import {
  MdDashboard,
  MdSettings,
  MdOutlineStackedBarChart,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md';

function App() {
  const [expand, setExpand] = useState(true);
  const [activeKey, setActiveKey] = useState(null);
  const contentRef = useRef(null);

  function handleGeo(){
    console.log('handleGeo................');
  }

  return (
    <div height={800} className="show-container">
    <CustomNavbar appearance="inverse" activeKey={activeKey} onSelect={setActiveKey} />
    <Container>
      
      <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
          <Sidenav.Body>
            <Nav defaultActiveKey="1">
              <Nav.Item eventKey="1" icon={<Icon as={MdDashboard} />}>
                Dashboard
              </Nav.Item>
              <Nav.Menu
                eventKey="3"
                trigger="hover"
                title="Advanced"
                icon={<Icon as={MdOutlineStackedBarChart} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1" onSelect={handleGeo}>Geo</Nav.Item>
                <Nav.Item eventKey="3-2">Devices</Nav.Item>
                <Nav.Item eventKey="3-3">Brand</Nav.Item>
                <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="4"
                trigger="hover"
                title="Settings"
                icon={<Icon as={MdSettings} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="4-1">Applications</Nav.Item>
                <Nav.Item eventKey="4-2">Websites</Nav.Item>
                <Nav.Item eventKey="4-3">Channels</Nav.Item>
                <Nav.Item eventKey="4-4">Tags</Nav.Item>
                <Nav.Item eventKey="4-5">Versions</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>

      <Container>
        <Header className="page-header">
        </Header>
        <Content ref={contentRef}></Content>
      </Container>
    </Container>
  </div>
  );
}

const NavToggle = ({ expand, onChange }) => {
  return (
    <Stack className="nav-toggle" justifyContent={expand ? 'flex-end' : 'center'}>
      <IconButton
        onClick={onChange}
        appearance="subtle"
        size="lg"
        icon={expand ? <MdKeyboardArrowLeft /> : <MdOutlineKeyboardArrowRight />}
      />
    </Stack>
  );
};

const Brand = ({ expand }) => {
  return (
    <HStack className="page-brand" spacing={12}>
      <FaReact size={26} />
      {expand && <Text>Brand</Text>}
    </HStack>
  );
};

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">Transportation Network Planning - powered by ACME</Navbar.Brand>
      {/* <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1">Home</Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav> */}
    </Navbar>
  );
};


export default App;
