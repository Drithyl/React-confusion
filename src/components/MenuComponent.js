
import React, { Component } from "react";
import { Media } from "reactstrap";

class Menu extends Component {

  constructor(props) {
    super(props);

    //single source of truth for the state of this component. When you need to
    //alter the state, use the setState({}, cb) function
    this.state =
    {
      dishes:
      [
        {
          id: 0,
          name:'Uthappizza',
          image: 'assets/images/uthappizza.png',
          category: 'mains',
          label:'Hot',
          price:'4.99',
          description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
        },
        {
          id: 1,
          name:'Zucchipakoda',
          image: 'assets/images/zucchipakoda.png',
          category: 'appetizer',
          label:'',
          price:'1.99',
          description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce'
        },
        {
          id: 2,
          name:'Vadonut',
          image: 'assets/images/vadonut.png',
          category: 'appetizer',
          label:'New',
          price:'1.99',
          description:'A quintessential ConFusion experience, is it a vada or is it a donut?'
        },
        {
          id: 3,
          name:'ElaiCheese Cake',
          image: 'assets/images/elaicheesecake.png',
          category: 'dessert',
          label:'',
          price:'2.99',
          description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms'
        }
      ]
    }
  }

  //every component must have a render() function that returns a set of HTML
  //elements inside parenthesis that will be the view of the component. This
  //render function gets called directly by React once the component is attached
  //to ReactDOM.render() like in index.js
  render() {

    const menu = this.state.dishes.map((dish) =>
    {
      //the return will return this HTML code for every index of the this.state.dishes
      //array, and store the final HTML array into menu.
      return (
        //Use curly braces {} to embed JavaScript code or references into the HTML
        <div key={dish.id} className="col-12 mt-5">
          {/* The "li" tag, as in HTML, makes the HTML inside this be an item of a list.
              See the media Bootstrap object for more information at
              https://getbootstrap.com/docs/4.0/layout/media-object/
              and the reactstrap version of it at
              https://reactstrap.github.io/components/media/ */}
          <Media tag="li">
            <Media left middle>
              <Media object src={dish.image} alt={dish.name} />
            </Media>

            <Media body className="ml-5">
              <Media heading>{dish.name}</Media>
              <p>{dish.description}</p>
            </Media>
          </Media>
        </div>
      );
    });

    return (
      //HTML attributes use camelCase in JSX to not conflict with JS syntax and keywords
      <div className="container">
        <div className="row">
          {/* The list attribute marks this element as a list of items */}
          <Media list>
            {/* Display whatever HTML is contained inside the menu constant */}
            {menu}
          </Media>
        </div>
      </div>
    );
  }
}

export default Menu;
