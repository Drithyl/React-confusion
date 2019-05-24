
import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

//This is another way of creating a component. The previous Presentational Component
//that was the Menu was turned into two Functional Components (components that are
//stateless and do not require lifecycle hooks either)
//The two functions that are used as Functional Components *NEED* to be capitalized,
//as that is how React identifies components to be able to use them with the JSX
//notation (<Component />)

function RenderMenuItem({ dish, onClick })
{
  return (
    //events are named with camelToe case with the same HTML names.
    //Declare a function to be called embedded inside the attribute
    //This function is being passed down as props by the Main component,
    //and since it is defined there, it has access to the Main component's
    //state while also receiving the information of which Menu item was clicked
    <Card onClick={ () => { onClick(dish.id) } }>
        <CardImg width="100%" src={dish.image} alt={dish.name} />

        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
    </Card>
  );
}

const Menu = function(props)
{
  //dishes are passed as props by the App component
  const menu = props.dishes.map((dish) =>
  {
    //the return will return this HTML code for every index of the props.dishes
    //array, and store the final HTML array into menu.
    return (
      //Use curly braces {} to embed JavaScript code or references into the HTML
      //The key attribute helps react identify which items change, are added or removed,
      //and should always be added to lists of elements. React only re-renders the parts
      //of the virtual DOM that have changed, so if the array of items changes, it will
      //use the keys to know which ones to re-render and which ones to leave as is
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} onClick={props.onClick}/>
      </div>
    );
  });

  return (
    //HTML attributes use camelCase in JSX to not conflict with JS syntax and keywords
    <div className="container">
      <div className="row">
        {/* Display whatever HTML is contained inside the menu constant */}
        {menu}
      </div>
    </div>
  );
};

export default Menu;
