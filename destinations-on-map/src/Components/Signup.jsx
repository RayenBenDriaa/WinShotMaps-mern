import React, { Component } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const URL = "http://localhost:5000/api/users";

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

const Signup = () => {
  const { register } = useForm();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [errore, setErrore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(firstname);
    if (password !== confirm) {
      setMessage("Passwords do not match");
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
          header: "Access-Control-Allow-Origin, http://localhost:8080",
        };
        setLoading(true);
        const { data } = await axios.post(
          URL,
          { firstname, lastname, email, password },

          config
        );
        setLoading(false);
        localStorage.setItem("userregister", JSON.stringify(data));
      } catch (errore) {
        setErrore("erreur dans l'inscription");
      }
    }
  };

  return (
    <div className="style">
      <main id="main" class="site-main main mywidth text-white">
        <section class="section">
          <div class="container">
            <div class="row">
              <div class="container container--xs">
                <div class="woocommerce">
                  <div id="signup_div_wrapper">
                    <h1 class=" mb-5 pt-4  text-center text-white">Sign up</h1>
                    {errore && (
                      <ErrorMessage variant="danger">{errore}</ErrorMessage>
                    )}
                    {message && (
                      <ErrorMessage variant="danger">{message}</ErrorMessage>
                    )}
                    {loading && <Loading />}

                    <form class="register" onSubmit={submitHandler}>
                      <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
                        <label for="reg_sr_firstname">
                          First Name <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                          id="reg_sr_firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                        <div class="invalid-feedback">
                          This field is required
                        </div>
                      </p>

                      <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
                        <label for="reg_sr_lastname">
                          Last Name <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                          id="reg_sr_lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                        <div class="invalid-feedback">
                          This field is required
                        </div>
                      </p>

                      <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label for="reg_email">
                          Email address <span class="required">*</span>
                        </label>
                        <input
                          type="email"
                          class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                          id="reg_email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div class="invalid-feedback">
                          This field is required
                        </div>
                      </p>

                      <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label for="reg_password">
                          Password <span class="required">*</span>
                        </label>
                        <input
                          type="password"
                          class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                          name="password"
                          id="reg_password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <div class="invalid-feedback">
                          This field is required
                        </div>
                      </p>
                      <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                        <label for="reg_password">
                          Password <span class="required">*</span>
                        </label>
                        <input
                          type="password"
                          class="woocommerce-Input woocommerce-Input--text input-text form-control mywidth"
                          name="confirm"
                          id="reg_confirm"
                          onChange={(e) => setConfirm(e.target.value)}
                          value={confirm}
                        />
                        <div class="invalid-feedback">
                          This field is required
                        </div>
                      </p>

                      <p class="form-row form-row-wide mailchimp-newsletter">
                        <div class="row mt-5">
                          <div class="col text-center">
                            <button type="submit" class="btn btn-primary ">
                              Sign up
                            </button>
                          </div>
                        </div>
                        <div class="invalid-feedback">
                          This field is required
                        </div>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
