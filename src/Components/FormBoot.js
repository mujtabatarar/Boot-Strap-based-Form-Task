import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FloatingLabel, Row, Col, Button } from "react-bootstrap";
import isEmail from "validator/lib/isEmail";
import { CountryDropdown } from "react-country-region-selector";
import validator from "validator";

const styleObj = {
  aspectratio: "16/9",
  flexgrow: 1,
  margin: "10px",
  align: "center",
  width: "380px",
};

export const FormBoot = () => {
  // useState
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("example@gmail.com");
  const [countryCode, setCountryCode] = useState("000");
  const [phoneNo, setPhoneNo] = useState("00000000");
  const [country, setCountry] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [gender, setGender] = useState("");

  //useRef
  const firstNameElement = useRef();
  const lastNameElement = useRef();
  const emailElement = useRef();
  const countryCodeElement = useRef();
  const phoneNumberElement = useRef();

  /**
   * will check if all data fields are filled.
   * and if they are it show a button by making a boolean to true.
   */
  const handleForm = () => {
    if (
      firstName !== "First Name" &&
      lastName !== "Last Name" &&
      email !== "example@gmail.com" &&
      countryCode !== "" &&
      phoneNo !== "" &&
      country !== "" &&
      gender !== ""
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  /**
   * checkIfAllEnteriesAreValid will check if all user entered data is in valid from
   *
   */
  const checkIfAllEnteriesAreValid = () => {
    /**
     * Check if the string is whole number, note these are whole numbers (0,1,2,3,4,5,6,7,8,9)
     * @param {* n represent the string you want to check
     * @returns 
     */
    function isDecimal(n) {
        if (n == "") return false;

        var strCheck = "0123456789";
        var i;

        for (i in n) {
          if (strCheck.indexOf(n[i]) == -1) return false;
        }
        return true;
      }

      /**
       * Check If this Value is in required length
       * @param {*} value 
       * @param {*} minLength 
       * @param {*} maxLength 
       * @returns 
       */
    function isThisValueInDesireLength(value,minLength,maxLength){
        let ok = false;
      if (value.length <= maxLength && value.length >= minLength) {
            return true;
      } else {
            return false;     
         }
    }





    /**
     * check for First name validation.
     */
    if (firstNameElement.current.style) {
      if (validator.isAlpha(firstName.split(/\s+/).join("")) && isThisValueInDesireLength(firstName,0,64)) {
        firstNameElement.current.style.borderColor = "";
      } else {
        firstNameElement.current.style.borderColor = "red";
        firstNameElement.current.style.borderWidth = "thick";
      }
    }

    /**
     * check for Last name validation
     */

    if (lastNameElement.current.style) {
      if (validator.isAlpha(lastName.split(/\s+/).join("")) &&  isThisValueInDesireLength(lastName,0,64)) {
        lastNameElement.current.style.borderColor = "";
      } else {
        lastNameElement.current.style.borderColor = "red";
        lastNameElement.current.style.borderWidth = "thick";
      }
    }

    /**
     * check for email validation
     */
    if (emailElement.current.style) {
      if (isEmail(emailElement.current.value) &&  isThisValueInDesireLength(email,0,320)) {
        emailElement.current.style.borderColor = "";
      } else {
        emailElement.current.style.borderColor = "red";
        emailElement.current.style.borderWidth = "thick";
      }
    }

    /**
     * validate country code validation.
     */
    if (countryCodeElement.current.style) {
      let cc = countryCodeElement.current.value;
      if (isDecimal(cc) && isThisValueInDesireLength(cc,0,3)) {
        countryCodeElement.current.style.borderColor = "";
      } else {
        countryCodeElement.current.style.borderColor = "red";
        countryCodeElement.current.style.borderWidth = "thick";
      }
    }


    /**
     * validate Phone Number.
     */
     if (phoneNumberElement.current.style) {
        let pNo = phoneNumberElement.current.value;
        if (isDecimal(pNo) && isThisValueInDesireLength(pNo,0,15)) {
          phoneNumberElement.current.style.borderColor = "";
        } else {
          phoneNumberElement.current.style.borderColor = "red";
          phoneNumberElement.current.style.borderWidth = "thick";
        }
      }
  };

  /**
   * user data will be submitted by this methodd
   */
  const submitForm = () => {
    const userFinalData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      countryCode: countryCode,
      phoneNo: phoneNo,
      country: country,
      showButton: showButton,
      gender: gender,
    };
    console.table(userFinalData);
  };

  useEffect(() => {
    checkIfAllEnteriesAreValid();
    handleForm();
  }, [firstName, lastName, email, countryCode, phoneNo, country, gender]);

  return (
    <div className="mainForm">
      <form style={styleObj}>
        <div className="heading">
          <label>User Data Form</label> <br />
          <label>Please fill out this form</label> <br />
        </div>

        {/**
         * First Name Floating bootstrap
         */}
        <FloatingLabel
          controlId="floatingFirstName"
          label="First Name"
          className="mb-3"
        >
          <Form.Control
            ref={firstNameElement}
            type="FirstName"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FloatingLabel>
        {/**
         * Last Name Floating bootstrap
         */}
        <FloatingLabel
          controlId="floatingLastName"
          label="Last Name"
          className="mb-3"
        >
          <Form.Control
            ref={lastNameElement}
            type="LastName"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FloatingLabel>
        {/**
         * Email Floating bootstrap
         */}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            ref={emailElement}
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>
        {/**
         * Email Floating bootstrap
         */}
        <Row className="g-2">
          <Col xs={6} md={4}>
            <FloatingLabel
              controlId="floatingInput"
              label="C-Code"
              className="mb-3"
            >
              <Form.Control
                ref={countryCodeElement}
                type="countryCode"
                placeholder="092"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </FloatingLabel>
          </Col>

          <Col xs={12} md={8}>
            <FloatingLabel
              controlId="floatingInput"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                ref={phoneNumberElement}
                type="phoneNumber"
                placeholder="03331234567"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <br />
        {/*
        <Form.Select id="country" aria-label="Default select example">
          <option>Select your Country</option>
          <option value={country}>India</option>
          <option value={country}>Pakistan</option>
          <option value={country}>Korea</option>
        </Form.Select>
        <br />
        */}

        <div className="mb-2">
          <CountryDropdown
            className="countryDropDown"
            value={country}
            onChange={(e) => setCountry(e)}
          />
        </div>

        <Row className="g-2">
          <Col xs={2} md={2}>
            <label>Sex</label>
          </Col>

          <Col xs={1} md={2}>
            <span className="btn-separator genderSeperator"></span>
          </Col>

          <Col xs={4} md={3}>
            <Form.Check
              inline
              type="radio"
              label="Male"
              name="group1"
              aria-label="radio 1"
              onChange={() => setGender("male")}
            />
          </Col>

          <Col>
            <Form.Check
              inline
              id="femaleRadioCheck"
              type="radio"
              name="group1"
              label="Female"
              aria-label="radio 1"
              onChange={() => setGender("female")}
            />
          </Col>
        </Row>
        <hr />

        <div>
          {showButton && (
            <Button variant="secondary" onClick={submitForm}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
