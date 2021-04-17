import React from "react";
import { Navbar} from "react-bootstrap";


export default function NavigationHome() {
        return(
                 <Navbar style={{backgroundColor:"#292961"}} expand="lg">
                     <Navbar.Brand href="#home" style={{color:"white"}}>ENIGMA CAMP</Navbar.Brand>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                 </Navbar>
        )
    }