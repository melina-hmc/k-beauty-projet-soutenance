import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
    {
      id: 1,
      title: "Yeux",
      image: "https://i.pinimg.com/236x/c0/0c/ef/c00cef5d968ff520422320fc459d8e96.jpg",
    },
    {
      id: 2,
      title: "Teint",
      image: "https://i.pinimg.com/564x/57/e4/18/57e418591fc1dbc1148d57b178f78fec.jpg",
    },
    {
      id: 3,
      title: "Lèvres",
      image: "https://i.pinimg.com/236x/f9/93/87/f9938737476870a5b6fb9c3c0bd639ee.jpg",
    },
  ];

  const Category = ({ title, image }) => {
    const navigate = useNavigate();
    return (
      <div className="category">
        <h3>{title}</h3>
        <img src={image} alt="img" />
        <button className="--btn" onClick={() => navigate("/shop")}>
          {"Voir Maintenant >"}
        </button>
      </div>
    );
  };

function ProductCategory(){
    return(
        <div className="categories">
            {categories.map((cat) => {
                return (
                <div key={cat.id} className="--flex-center">
                <Category title={cat.title} image={cat.image} />
                </div>
                );
            })}
      </div>
    )
};

export default ProductCategory;