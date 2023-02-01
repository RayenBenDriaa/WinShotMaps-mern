import React, { Component, useState, useEffect } from "react";
import img from "../assets/landing.jpg";
import "./style.css";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useHistory } from "react-router-dom";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const URL = "http://localhost:5000/api/users";

const Login = ({ setLoged }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userinfo")) {
      history.push("/");
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "application/json",
      },
      header: "Access-Control-Allow-Origin, http://localhost:8080",
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        URL + "/login",
        { email, password },

        config
      );

      localStorage.setItem("userinfo", JSON.stringify(data.token));
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("firstname", JSON.stringify(data.firstname));
      localStorage.setItem("lastname", JSON.stringify(data.lastname));
      localStorage.setItem("userid", JSON.stringify(data._id));

      console.log(localStorage.getItem("userinfo"));
      setLoading(false);
      setLoged("logout");
    } catch (errore) {
      setErrore("invalid email or password");
      setLoading(false);
    }
  };
  /*try {
      setLoading(true);
       await axios.post(
        URL + "/login",
        { email, password },
        { headers: "Access-Control-Allow-Origin, http://localhost:8080" }).then
        
     
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };*/

  const mystyle = {
    backgroundImage: `url(${img})`,
    color: "#dea710",
    backgroundPositionX: 0,
    backgroundPositionY: 0,
  };
  return (
    <div className="style">
      <main className="form-signin">
        <div className="container">
          {errore && <ErrorMessage variant="danger">{errore}</ErrorMessage>}
          {loading && <Loading />}
          <form onSubmit={submitHandler}>
            <h1 className=" mb-5 pt-4  text-center text-white"> Login</h1>

            <div className="form-floating mb-5 mywidth text-center">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating mywidth">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="row mt-5">
              <div class="col text-center">
                <button type="submit" class="btn btn-primary ">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
