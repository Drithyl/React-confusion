
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {

  constructor(props) {
    super(props);

    console.log("Menu Component constructor() is invoked.");
  }

  renderDish(dish)
  {
    return (

      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />

        <CardBody>
          <CardTitle>{dish.name}</CardTitle>

          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments)
  {
    let items = comments.map((comment) =>
    {
      return (

        <div key={comment.id}>
          <li>
            <p>{comment.comment}</p>
            { /* Intl.DateTimeFormat is a JavaScript Object to format Date strings. */ }
            <p>-- {comment.author}, { new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(comment.date))) }</p>
          </li>
        </div>
      );
    });

    if (comments == null)
    {
      return (
        <div></div>
      );
    }

    return (

      <div>
        <h4>Comments</h4>

        <ul className="list-unstyled">
          {items}
        </ul>
      </div>

    );
  }

  render() {

    console.log("Menu Component render() is invoked.");

    if (this.props.selectedDish == null)
    {
      return (
        <div></div>
      );
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            { this.renderDish(this.props.selectedDish) }
          </div>

          <div className="col-12 col-md-5 m-1">
            { this.renderComments(this.props.selectedDish.comments) }
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
