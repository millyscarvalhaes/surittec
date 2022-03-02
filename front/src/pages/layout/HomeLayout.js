import React, { useEffect } from "react";

//Style
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions/user-actions";
import { alertActions } from "../../store/actions/alert-action";

//Router
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

//Components
import { PrivateRoute } from "../../components";

//Pages
import { ClientListPage } from "../client/ClientListPage";
import { ClientFormPage } from "../client/ClientFormPage";
import { HomePage } from "../layout/HomePage";
import { NotFoundPage } from "../info/NotFoundPage";

function HomeLayout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userName = useSelector((state) => state.authenticationState.user.username) || {};
  const alert = useSelector((state) => state.alertState);

  useEffect(() => {
    dispatch(alertActions.clear());
  }, []);

  const onChangeRoute = () => {
    console.log("CHANGE");
    dispatch(alertActions.clear());
  };

  const handleLogout = async () => {
    await dispatch(userActions.logout());
    navigate("/");
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to={"/"} className="navbar-brand">
            Millys Carvalhaes
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/client"} className="nav-link">
                Clientes
              </Link>
            </Nav>
            <Nav>
              <NavDropdown title={userName} id="collasible-nav-dropdown" align="end">
                <NavDropdown.Item href="#" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {alert !== undefined && alert.message && <div className={`text-center alert ${alert.type}`}>{alert.message}</div>}

        <Routes onChange={onChangeRoute}>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/client"
            element={
              <PrivateRoute>
                <ClientListPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/client/form"
            element={
              <PrivateRoute>
                <ClientFormPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/client/form/:id"
            element={
              <PrivateRoute>
                <ClientFormPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <NotFoundPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
      <footer className="footer bg-dark text-light mt-3 p-2 text-center">Copyright © Millys Carvalhaes | {new Date().getFullYear()}.</footer>
    </div>
  );
}

export { HomeLayout };
