
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Row, Col } from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

//Check that a value is not null and has length
const required = (val) =>
{
  return val != null && val.length;
};

//Take a length and return a function that takes a value that returns
//true if the value is null or if it's below or equal to the max length.
//The reason for this pattern is that the validation attribute for react-
//redux-form takes functions that it calles by passing in the value of the
//input field, but we also want to specify the length limits in each of the
//fields individually without having to create different maxLength functions.
//So we create a function that takes a length as parameter that returns the
//function that the validation attribute uses respecting that length.
const maxLength = (len) =>
{
  return function(val)
  {
    //val == null passes the check because that's when there is still no
    //input in the field typed by the user, so we don't want to show that as error
    return val == null || val.length <= len;
  }
}

const minLength = (len) =>
{
  return function(val)
  {
    //another way of doing the above check but with minLength
    return val != null && val.length >= len;
  }
};

const isNumber = (val) =>
{
  return isNaN(Number(val)) === false;
}

const validEmail = (val) =>
{
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
}

class Contact extends Component {

  constructor(props) {
    super(props);

    //bind the class context into the functions so the this keyword can be used inside them
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //values are passed to this function by the react-redux-form
  handleSubmit(values)
  {
    console.log(`Current state is ${JSON.stringify(values, null, 2)}`);
    alert(`Current state is ${JSON.stringify(values, null, 2)}`);
    this.props.resetFeedbackForm();
  }

  render()
  {
    return(
      <div className="container">
        <div className="row">
          {/* Add breadcrumbs from reactstrap to keep links to previous pages */}
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>

        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>

          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>

            <address>
            121, Clear Water Bay Road<br />
            Clear Water Bay, Kowloon<br />
            HONG KONG<br />
            <i className="fa fa-phone"></i>: +852 1234 5678<br />
            <i className="fa fa-fax"></i>: +852 8765 4321<br />
            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>

          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>

          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
              <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
              <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
            </div>
          </div>
        </div>

        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your Feedback</h3>
          </div>

          <div className="col-12 col-md-9">
            {/* The Form from react-redux-form preserves its input state even after
                navigating away from it.
                model gives this form a name to be used by the resetFeedbackForm action */}
            <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
              {/* Row replaces the previous FormGroup from reactstrap */}
              <Row className="form-group">
                {/* htmlFor is the JSX equivalent of HTML's for, and marks this
                    label as belonging to the form element with the same name.
                    md={2} means for medium screen sizes and above the Label
                    will occupy two columns. This is an inline style. */}
                <Label htmlFor="firstname" md={2}>First Name</Label>

                {/* Col md={X} is like using div className="col-X" */}
                <Col md={10}>
                  {/* Control. is imported from the react-redux-form and replaces
                      the Input element and the type attribute. It needs a model
                      attribute specifying the field name in which the value will
                      be stored as well.

                      validators is the attribute for the react-redux-form that
                      allows us to specify a set of functions to do validation.
                      It takes them in the form of a JS object and passes in
                      them the value of the input in question. */}
                  <Control.text
                    model=".firstname"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />

                  {/* Errors is a react-redux-form element to display validation
                      errors to the user. The model takes the field name of the
                      input in question, show specifies when the errors will be
                      shown, and messages takes a JS object with the same keys
                      that were specified above as validators. If they evaluated
                      to false, then the error message specified here will be shown. */}
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="lastname" md={2}>Last Name</Label>

                <Col md={10}>
                  <Control.text
                    model=".lastname"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".lastname"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>

                <Col md={10}>
                  <Control.text
                    model=".telnum"
                    id="telnum"
                    name="telnum"
                    placeholder="Tel. Number"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                      isNumber
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".telnum"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 numbers",
                      maxLength: "Must be 15 numbers or less",
                      isNumber: "Must be a number"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="email" md={2}>Email</Label>

                <Col md={10}>
                  <Control.text
                    model=".email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    validators={{
                      required,
                      validEmail
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                      required: "Required",
                      validEmail: "Invalid Email Address"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                {/* Another way to specify the column size is to write in JS object values,
                    so this element will occupy 6 columns for medium and above sizes, and
                    be offset two columns to the right */}
                <Col md={{size: 6, offset: 2}}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".agree"
                        name="agree"
                        className="form-check-input"
                      /> {" "}<strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>

                <Col md={{size: 3, offset: 1}}>
                  <Control.select
                    model=".contactType"
                    name="contactType"
                    className="form-control"
                  >
                    <option>Tel.</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="message" md={2}>Your Feedback</Label>

                <Col md={10}>
                  <Control.textarea
                    model=".message"
                    id="message"
                    name="message"
                    rows="12"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={{size: 10, offset: 2}}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
