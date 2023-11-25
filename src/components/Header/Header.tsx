import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Header() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  return (
    <header>
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
      >
        <Container>
          <Navbar.Brand href="/">TPI Argentina Programa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            role="navigation"
          >
            <Nav className="me-auto">
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/"
                >
                  Inicio
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/agregar-tarea"
                >
                  Agregar Tareas
                </Nav.Link>
              </Nav>
            </Nav>
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <SunFill
                  className="text-light"
                  size={20}
                />
              ) : (
                <MoonFill
                  className="text-dark"
                  size={20}
                />
              )}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
