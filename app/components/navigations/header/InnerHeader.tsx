import { Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import "./InnerHeader.scss";

import { LogoIcon } from "../../icons";
import PopupModal from "../../PopupModal/PopupModal";
import LoginForm from "../../forms/LoginForm/LoginForm";
import SignupForm from "../../forms/SignupForm/SignupForm";

const navLinks = [
  {
    label: "Sign In",
    link: "/signin",
    isBtnStyle: false,
    isModal: true,
  },
  {
    label: "Create Account",
    link: "/signup",
    isBtnStyle: true,
    isModal: true,
    methodType: "signup",
  },
];

export default function HeaderComponent() {
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setSignup] = useState(false);
  const actionData = useActionData();
  const handleModalOpen = (methodType: string | undefined) => {
    if (methodType === "signup") {
      setSignup(true);
    } else {
      setSignup(false);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSignup = (value: boolean | ((prevState: boolean) => boolean)) => {
    setSignup(value);
  };

  return (
    <>
      <div className="header inner-header">
        <Link to="/">
          <span className="sr-only">Doctor OPT</span>
          <LogoIcon className="header__logo"></LogoIcon>
        </Link>
        <div className="header__center-center">
          <ul className="nav-link_list">
            <li>
              <div>
                <Link className="nav-link_list-item" to="/">
                  Find Doctors
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link className="nav-link_list-item" to="/">
                  Video Consult
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link className="nav-link_list-item" to="/">
                  Surgeries
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="header__navigations">
          {navLinks.map((item, index) =>
            item.isModal ? (
              <button
                onClick={() => handleModalOpen(item.methodType)}
                className={
                  "header__navigations--items " +
                  (item.isBtnStyle ? "header__navigations--items-button" : "")
                }
                key={index}
              >
                <span className="header__navigations--items_text">
                  {item.label}
                </span>
              </button>
            ) : (
              <Link
                to={item.link}
                className={
                  "header__navigations--items " +
                  (item.isBtnStyle ? "header__navigations--items-button" : "")
                }
                key={index}
              >
                <span className="header__navigations--items_text">
                  {item.label}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
      <div className={`modal-overlay ${showModal ? "show" : ""}`}>
        <PopupModal onClose={handleModalClose}>
          <>
            <div className="popup-modal__body">
              <h1 className="popup-modal__body--title">
                {showSignup ? <>Create a new account</> : <>Welcome Back</>}
              </h1>
              <p className="popup-modal__body--description">
                {showSignup ? (
                  <>It&apos;s quick and easy.</>
                ) : (
                  <>
                    Input your email to receive a one-time login code to sign
                    in.
                  </>
                )}
              </p>
              <div className="popup-modal__body--form">
                {actionData?.error && (
                  <p className="error">{actionData.error}</p>
                )}
                {showSignup ? (
                  <SignupForm></SignupForm>
                ) : (
                  <LoginForm></LoginForm>
                )}
              </div>
            </div>
            <div className="popup-modal__footer">
              <p className="popup-modal__footer--text">
                {showSignup ? (
                  <>
                    Already have an account?{" "}
                    <button onClick={() => handleSignup(!showSignup)}>
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <button onClick={() => handleSignup(!showSignup)}>
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </div>
          </>
        </PopupModal>
      </div>
    </>
  );
}
