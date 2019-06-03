
import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Loading } from "./LoadingComponent.js";
import { baseUrl } from "../shared/baseUrl.js";

//NPM animation package
import { FadeTransform } from "react-animation-components";

//We could put this functional component in a separate file and use it in several
//other cards, but in this project it is only used here.
function RenderCard({item, isLoading, errMess})
{
  if (isLoading === true)
  {
    return (
      <Loading />
    );
  }

  if (errMess != null)
  {
    return (
      <h4>{errMess}</h4>
    );
  }

  return (
    //Card will initially be out of the screen and then pop out into it
    <FadeTransform in transformProps={{existTransform: "scale(0.5) translateY(-50%)"}}>
      <Card>
        <CardImg src={`${baseUrl}/${item.image}`} alt={item.name} />

        <CardBody>
          <CardTitle>{item.name}</CardTitle>

          {/* If the item to render contains a designation property, add it as a
              subtitle, otherwise just don't render anything (null) */}
          {item.designation != null ? <CardSubtitle>{item.designation}</CardSubtitle> : null}

          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function Home(props)
{
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          {/* Functional Component defined above. Props being passed by the MainComponent.js */}
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>

        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            errMess={props.promosErrMess} />
        </div>

        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leadersLoading}
            errMess={props.leadersErrMess} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
