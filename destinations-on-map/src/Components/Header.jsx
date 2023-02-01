import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Mapbox from "./Mapbox";
import { Route, Switch } from "react-router";
import Landing from "./Landing";
import Footer from "./Footer";
import History from "./History";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
const Header = () => {
  const [password, setPassword] = useState();
  const [basicModal, setBasicModal] = useState(false);
  const [profile, setprofile] = useState(true);
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();
  const [lastname, setLastname] = useState();
  const toggleShow = () => setBasicModal(!basicModal);
  const [status, setStatus] = useState();
  const [isloged, setLoged] = useState("");
  const [cordslng,setcordslng]=useState([]);
  const [cordslat,setcordslat]=useState([]);
  const [str, setSTR] = useState();

  useEffect(() => {
   

    if (localStorage.getItem("userinfo")) {
      setSTR(localStorage.getItem("userid").slice(1, -1));
      setLoged("logout");
      setprofile(false);
      setFirstname(localStorage.getItem("firstname"));
      setLastname(localStorage.getItem("lastname"));
      setEmail(localStorage.getItem("email"));
    } else {
      setLoged("login");
      setFirstname("notconnected");
      setLastname("notconnected");
      setEmail("notconnected");
      setSTR("undefineduserid");
    }
  }, [isloged]);
  const handlelogoff = () => {
    localStorage.removeItem("userinfo");
    setLoged("login");
    setprofile(true);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
    };
    axios
      .delete("http://localhost:5000/api/users/" + str, {
        headers,
      })
      .then(() => setStatus("Delete successful"));
    {
      handlelogoff();
    }
  };
  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to="/" class="nav-link px-2 text-white">
              <h3>Winshot Maps</h3>
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="/map" class="nav-link px-2 text-white">
                  Map
                </Link>
              </li>
              <li>
                <Link href="#" class="nav-link px-2 text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" class="nav-link px-2 text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" class="nav-link px-2 text-white">
                  <MDBBtn
                    className="text-dark"
                    color="light"
                    onClick={toggleShow}
                    disabled={profile}
                  >
                    my Profile
                  </MDBBtn>
                </Link>
              </li>
            </ul>

            <div className="text-end">
              <Link to="/login">
                <button
                  onClick={handlelogoff}
                  class="btn btn-outline-light me-2"
                >
                  {isloged}
                </button>
              </Link>

              <Link to="/signup">
                <button type="submit" class="btn btn-warning">
                  Sign-up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <Switch>
        <Route path="/login">
          <Login setLoged={setLoged} />
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route exact path="/">
          <Landing></Landing>
        </Route>
        <Link to="/map">
          <div className="container-fluid">
            <div className="row">
              <div className="col-9">
                <Mapbox cordslng={cordslng} cordslat={cordslat} />
              </div>
              <div className="col-3">
                <History setcordslng={setcordslng} setcordslat={setcordslat}  />{" "}
              </div>
            </div>
          </div>
          <Footer />
        </Link>
      </Switch>
      <>
        <MDBModal
          show={basicModal}
          getOpenState={(e) => setBasicModal(e)}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Profile</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form>
                  <MDBInput
                    label="First Name"
                    value={firstname}
                    id="typeText"
                    type="text"
                    className="m-3"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <MDBInput
                    label="Last Name"
                    id="typeText"
                    type="text"
                    value={lastname}
                    className="m-3"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <MDBInput
                    label="Email"
                    id="typeEmail"
                    type="email"
                    value={email}
                    className="m-3"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    label="Password input"
                    id="typePassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </form>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn className="mx-2" color="danger" onClick={handleDelete}>
                  Delete my account
                </MDBBtn>
                <MDBBtn color="secondary" onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn>Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
};

export default Header;
