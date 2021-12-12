import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
import { FaUserAlt, FaUnlockAlt, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./AuthForm.css";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    // <div className="auth-container">
    //   <div className="screen">
    //     <div className="screen__content">
    //       <form className='login' onSubmit={handleSubmit} name={name}>
    //         <div className='login__field'>
    //           <label className='login__icon fas fa-user' htmlFor="username">
    //             <small>Username</small>
    //           </label>
    //           <input name="username" className='login__input' type="text" placeholder="User name" />
    //         </div>
    //         <div>
    //           <label htmlFor="password">
    //             <small>Password</small>
    //           </label>
    //           <input name="password" type="password" placeholder="password" />
    //         </div>
    //         <div>
    //           <button type="submit">{displayName}</button>
    //         </div>
    //         {error && error.response && <div> {error.response.data} </div>}
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="auth-container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit} name={name}>
            <div className="login__field">
              <i className="login__icon">
                <FaUserAlt />
              </i>
              <label htmlFor="username" />
              <input
                type="text"
                name="username"
                className="login__input"
                placeholder="User name"
              />
            </div>
            <div className="login__field">
              <i className="login__icon">
                <FaUnlockAlt />
              </i>
              <label htmlFor="password" />
              <input
                type="password"
                name="password"
                className="login__input"
                placeholder="Password"
              />
            </div>
            {displayName === "Sign Up" ? (
            <Link to="/login">
              <div className="nav_button_back"><FaChevronLeft />Back</div>
            </Link>
          ) : (
            <Link to="/signup">
              <div className="nav__button_register"><FaChevronRight />Register</div>
            </Link>
          )}
            <button type="submit" className="button login__submit">
              <span className="button__text">{displayName}</span>
              <i className="button__icon">
                <FaChevronRight />
              </i>
            </button>
          </form>
          {error && error.response && <div> {error.response.data} </div>}
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
