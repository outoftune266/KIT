import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import Toast from "../utils/Toast";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";
import { UserContext } from "../utils/UserStore";
import { ContactsOutlined } from "@material-ui/icons";
import Logo from "../images/logo.png"
import { Container, Col, Row } from "reactstrap";
// import { response } from "express";

function Login() {
  const [newLogin, setLogin] = useState({});
  const [redirect, setRedirect] = useState({ redirect: null });
  const { userState, setUserState } = useContext(UserContext);
  //console.log("seeing user: ", userState);

  useEffect(() => {
    //console.log("State Change");
    //console.log(userState);
    // console.log(userState.password);
    //console.log(redirect);
    if (userState.password !== "") {
      setRedirect({ redirect: true });
    }
  }, [userState]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLogin({ ...newLogin, [name]: value.trim() });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(newLogin);
    if (!newLogin.email || !newLogin.password) {
      Toast.allFields();
    } else
      API.loginUser({
        email: newLogin.email,
        password: newLogin.password,
      })
        .then((res) => {
          console.log(res);
          console.log("Before");
          if (res.data !== "No User exists") {
            setUserState(res.data);
          } else 
            Toast.validPassword();
          
          console.log(res.data);
          //setUserState(res.data);
          console.log("After");
          //setUserState(res.data);
          //redirect();
        })
        .then((res) => {
          console.log(res);
          console.log("Before");
          console.log(res.data);

          setUserState(res.data);
          console.log("After");
          //setUserState(res.data);
          //redirect();
        })
        .catch(err => console.log(err));
  }

  if (redirect.redirect) {
    return <Redirect to={"/user/" + userState.username} />;
  } else {
    return (
      
        <Container>
          <Row>
            <Col className= "col-md-6">
          <div className= "logo float-child-left"> 
            <img src= {Logo} />
          </div>
            </Col>
            <Col className= "col-md-6 col-12">
          <div className="login__content float-child-right">
            <form>
              {/* <h2>Login</h2> */}

              <div className="form-group">
                {/* <label>Email address</label> */}
                <input
                  onChange={handleInputChange}
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                {/* <label>Password</label> */}
                <input
                  onChange={handleInputChange}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>

              <button
                onClick={handleFormSubmit}
                type="submit"
                className="signup__btn"
              >
                Login
            </button>
              {/* <p className="register"></p> */}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="signup__btn">Sign Up</button>
              </Link>
            </form>
          </div>
          </Col>
          </Row>
          </Container>
      

   
    
    );
  }
}

export default Login;