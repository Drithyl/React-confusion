
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent.js";
import { baseUrl } from "../shared/baseUrl.js";

//NPM animation package
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) =>
{
  return val != null && val.length;
};

const maxLength = (len) =>
{
  return function(val)
  {
    return val == null || val.length <= len;
  }
}

const minLength = (len) =>
{
  return function(val)
  {
    return val != null && val.length >= len;
  }
};

class CommentForm extends Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal()
  {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values)
  {
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render()
  {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Submit Comment</ModalHeader>

          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>

                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="author" md={12}>Your Name</Label>

                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".author"
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
                <Label htmlFor="comment" md={12}>Comment</Label>

                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={{size: 10, offset: 2}}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

}

function RenderDish({dish})
{
  return (

    //Card will initially be out of the screen and then pop out into it
    <FadeTransform in transformProps={{existTransform: "scale(0.5) translateY(-50%)"}}>
      <Card>
        <CardImg width="100%" src={`${baseUrl}/{${dish.image}`} alt={dish.name} />

        <CardBody>
          <CardTitle>{dish.name}</CardTitle>

          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function RenderComments({ comments, postComment, dishId })
{
  let items = comments.map((comment) =>
  {
    return (

      <div key={comment.id}>
        {/* react-animation-components animation */}
        <Fade in>
          <li>
            <p>{comment.comment}</p>
            { /* Intl.DateTimeFormat is a JavaScript Object to format Date strings. */ }
            <p>-- {comment.author}, { new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(comment.date))) }</p>
          </li>
        </Fade>
      </div>
    );
  });

  if (comments == null)
  {
    return (
      <div><CommentForm dishId={dishId} postComment={postComment} /></div>
    );
  }

  return (
    <div>
      <h4>Comments</h4>

      {/* react-animation-components animation */}
      <Stagger in>
        <ul className="list-unstyled">
            {items}
        </ul>
      </Stagger>

      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
}

const DishDetail = function(props)
{
  //props received by the MainComponent.js
  if (props.isLoading === true)
  {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  //error happened while fetching data from the server
  if (props.errMess != null)
  {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }

  if (props.dish == null)
  {
    return (
      <div></div>
    );
  }

  return(
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>

        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>

        <div className="col-12 col-md-5 m-1">
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
