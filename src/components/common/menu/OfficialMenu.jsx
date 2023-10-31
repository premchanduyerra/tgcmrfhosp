import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { NavLink as ReactLink } from 'react-router-dom'
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../../../hooks/auth';

function OfficialMenu(args) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();  

  const toggle = () => setIsOpen(!isOpen);
  


  useEffect(() => { 

    if(isLoggedIn){
            setUser(getCurrentUserDetails);        
    }   
    }, []);
    const handleLogout =()=>{
       doLogout() 
       navigate('/')
       
    }

  return (
    <div>
      <Navbar {...args} expand='md' color='info'>
        {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
         
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/">Home</NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Services
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem tag={ReactLink} to='/changepwd'>Change Password</DropdownItem>
              <DropdownItem tag={ReactLink} to='/update-hosp'>Update Hospital Details</DropdownItem>
            
         
              </DropdownMenu>
             </UncontrolledDropdown>
             <NavItem>
              <NavLink tag={ReactLink} to="/patient-report">Reports</NavLink>
            </NavItem>

             <NavItem>
              <NavLink tag={ReactLink} to='/#' onClick={handleLogout}>Log Out</NavLink>
            </NavItem>
            
          
          </Nav>
          <NavbarText>{ user?.hospitalName}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default OfficialMenu;