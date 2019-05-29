
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { Link } from "react-router-dom";

class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contactType: "Tel.",
      message: ""
    };

    //bind the class context into the functions so the this keyword can be used inside them
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //handlers for the below's form's input to change the state
  handleInputChange(event)
  {
    const target = event.target;

    //if the target type is a checkbox, the value is stored in the event.target.checked
    //field, otherwise it gets stored inside the event.target.value field
    const value = target.type === "checkbox" ? target.checked : target.value;

    //the event.target.name field contains the value of the name attribute given
    //to the input field in the JSX code below. This name must match the name of
    //the state key for this code to work
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    console.log(`Current state is ${JSON.stringify(this.state, null, 2)}`);
    alert(`Current state is ${JSON.stringify(this.state, null, 2)}`);

    //this prevents the default browser behaviour of going to the next page on submit
    event.preventDefault();
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
            {/* Tie in the on-submit event to our functions to handle input */}
            <Form onSubmit={this.handleSubmit}>
              {/* FromGroup row defines this as a row inside the form, allowing
                  us to use Bootstrap's grid system within the form itself*/}
              <FormGroup row>
                {/* htmlFor is the JSX equivalent of HTML's for, and marks this
                    label as belonging to the form element with the same name.
                    md={2} means for medium screen sizes and above the Label
                    will occupy two columns. This is an inline style. */}
                <Label htmlFor="firstname" md={2}>First Name</Label>

                {/* Col md={X} is like using div className="col-X" */}
                <Col md={10}>
                  {/* By tying the value to the state this becomes a controlled form,
                      since the state becomes the single source of truth. We also add
                      the handler function for the on-change event where we will be
                      updating the value of the state with what the user inputted */}
                  <Input type="text" id="firstname" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="lastname" md={2}>Last Name</Label>

                <Col md={10}>
                  <Input type="text" id="lastname" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>

                <Col md={10}>
                  <Input type="tel" id="telnum" name="telnum" placeholder="Tel. Number" value={this.state.telnum} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="email" md={2}>Email</Label>

                <Col md={10}>
                  <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                {/* Another way to specify the column size is to write in JS object values,
                    so this element will occupy 6 columns for medium and above sizes, and
                    be offset two columns to the right */}
                <Col md={{size: 6, offset: 2}}>
                  {/* Create a checkbox group */}
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange} /> {" "}<strong>May we contact you?</strong>
                    </Label>
                  </FormGroup>
                </Col>

                <Col md={{size: 3, offset: 1}}>
                  <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                    <option>Tel.</option>
                    <option>Email</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="message" md={2}>Your Feedback</Label>

                <Col md={10}>
                  <Input type="textarea" id="message" name="message" rows="12" value={this.state.message} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={{size: 10, offset: 2}}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
