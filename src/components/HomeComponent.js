
import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

//We could put this functional component in a separate file and use it in several
//other cards, but in this project it is only used here. Item is between curly
//braces because the parameter received is props, and we specifically want the
//prop under the field name .item
function RenderCard({item})
{
  return (
    <Card>
      <CardImg src={item.image} alt={item.name} />

      <CardBody>
        <CardTitle>{item.name}</CardTitle>

        {/* If the item to render contains a designation property, add it as a
            subtitle, otherwise just don't render anything (null) */}
        {item.designation != null ? <CardSubtitle>{item.designation}</CardSubtitle> : null}

        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props)
{
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          {/* Functional Component defined above */}
          <RenderCard item={props.dish} />
        </div>

        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} />
        </div>

        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}

export default Home;
