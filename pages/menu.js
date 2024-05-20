import React, { useState } from "react";
import NavBar from "../components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const [selectedDish, setSelectedDish] = useState(null);

  const menuItems = [
    {
        category: "Appetizers",
        dishes: [
        
          {
            name: "Chicken Foot Soup",
            description: "Hearty soup with chicken feet and vegetables.",
            price: "$5.99",
            image: "/chicken foot soup.jpeg",
          },
          {
            name: "Red Peas Soup",
            description: "A flavorful soup made with red peas and assorted vegetables.",
            price: "$5.99",
            image: "/red peas.jpg",
          },
          {
            name: "Fritters (Banana or Saltfish)",
            description: "Deep-fried fritters made with either ripe bananas or salted fish.",
            price: "$4.99",
            image: "/fritters.jpeg",
          },
          {
            name: "Mannish Water Soup",
            description: "Traditional Jamaican soup with goat meat and vegetables.",
            price: "$6.99",
            image: "/mannish.jpeg",
          },
        ],
    },        
    {
      category: "Main Courses",
      dishes: [
        {
          name: "Jerk Chicken",
          description: "Grilled chicken marinated in jerk spices.",
          price: "$12.99",
          image: "/jerk.webp",
          spiceLevel: "🌶️🌶️🌶️",
        },
        {
          name: "Curry Goat",
          description: "Slow-cooked goat meat in flavorful curry sauce.",
          price: "$14.99",
          image: "/curry.jpeg",
        },
        {
          name: "Escovitch Fish",
          description: "Fried fish topped with spicy pickled vegetables.",
          price: "$16.99",
          image: "/fish.jpg",
        },
        {
            name: "Oxtail",
            description: "Slow-cooked oxtail, tender and succulent, braised to perfection in a savory broth with aromatic herbs and spices. Served with a side of creamy mashed potatoes and seasonal vegetables.",
            price: "$16.99",
            image: "/oxtail.jpeg"
          }          
      ],
    },
    {
        category: "Sides", 
        dishes: [
          {
            name: "Festivals",
            description: "Sweet fried dumplings, often served as a side dish.",
            price: "$3.49",
            image: "/festival.jpeg",
          },
          {
            name: "Bammy",
            description: "Flatbread made from cassava, typically grilled or fried.",
            price: "$2.99",
            image: "/bammy.jpeg",
          },
          {
            name: "Plantain (Green/Ripe)",
            description: "Sliced and fried green or ripe plantains, a delicious side.",
            price: "$2.49",
            image: "/plantain.jpeg",
          },
          {
            name: "Jamaican Rice and Peas",
            description: "Fragrant rice cooked with coconut milk and kidney beans.",
            price: "$2.99",
            image: "/rice and peas.jpeg",
          },
        ],
      },   
    {
      category: "Beverages",
      dishes: [
        {
          name: "Sorrel Punch",
          description: "Refreshing Jamaican drink made from sorrel petals.",
          price: "$3.99",
          image: "/sorrel.jpg",
        },
        {
          name: "Coconut Water",
          description: "Fresh coconut water served chilled.",
          price: "$2.99",
          image: "/coconut water.jpeg",
        },

        {
            name: "Rum Punch",
            description: "Refreshing tropical drink with a mix of rum and fruit juices.",
            price: "$4.99",
            image: "/rum punch.jpg",
          },
          {
            name: "Ting Soda",
            description: "Carbonated grapefruit-flavored soda.",
            price: "$1.99",
            image: "/ting.jpg",
          },
      ],
    },
        {
            category: "Desserts",
            dishes: [
              {
                name: "Rum Cake",
                description: "Rich cake soaked in Jamaican rum.",
                ingredients: ["Flour", "Sugar", "Rum"],
                price: "$7.99",
                image: "/rumcake.jpeg",
              },
              {
                name: "Sweet Potato Pudding",
                description: "Delicious pudding made from sweet potatoes.",
                price: "$6.99",
                image: "/pudding.jpeg",
              },
              {
                name: "Grater Cake",
                description: "Sweet coconut-based cake with a gratable texture.",
                price: "$5.99",
                image: "/grater cake.jpg",
              },
              {
                name: "Blue Draws",
                description: "Traditional Jamaican dessert made with cornmeal and coconut.",
                price: "$4.99",
                image: "/blue draws.jpg",
              },
            ],
          },
          
  ];

  const getGradientColor = (index) => {
    const colors = ["yellow", "black"];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish === selectedDish ? null : dish);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5 pt-4" >
        {menuItems.map((category, index) => (
          <div key={category.category} className="mb-5" >
            <h2
              style={{
                background: `linear-gradient(to right, ${getGradientColor(index)}, transparent)`,
                display: "inline-block",
                padding: "5px 10px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              {category.category}
            </h2>
            <div className="row">
              {category.dishes.map((dish) => (
                <div
                  key={dish.name}
                  className="col-md-3 mb-3"
                  onClick={() => handleDishClick(dish)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={`card ${selectedDish === dish ? "bg-primary text-white" : ""}`}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="card-img-top"
                      style={{ borderRadius: "8px 8px 0 0" }}
                    />
                    <div className="card-body">
                      <h3 className="card-title">{dish.name}</h3>
                      <p className="card-text">{dish.description}</p>
                      <p className="card-text">
                        <strong>Price:</strong> {dish.price}
                      </p>
                    </div>
                    {selectedDish === dish && (
                      <div className="card-footer">
                        {dish.ingredients && (
                          <p>
                            <strong>Ingredients:</strong> {dish.ingredients.join(", ")}
                          </p>
                        )}
                        {dish.spiceLevel && (
                          <p>
                            <strong>Spice Level:</strong> {dish.spiceLevel}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
