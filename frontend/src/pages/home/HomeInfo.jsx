import React from "react";
import {
    BsCartCheck,
    BsClockHistory,
    BsFillCreditCardFill,
  } from "react-icons/bs";
  import { FaShippingFast } from "react-icons/fa";

const data = [
    {
      icon: <FaShippingFast size={30} color="#8cb4f5" />,
      heading: "Livraison gratuite",
      text: "Livraison gratuite en fonction des produits",
    },
    {
      icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
      heading: "Payement securisé",
      text: "Payement sécurisé",
    },
    {
      icon: <BsCartCheck size={30} color="#fa82ea" />,
      heading: "Produit de qualité",
      text: "On met en vente que des produits testé et approuvé",
    },
    {
      icon: <BsClockHistory size={30} color="#82fa9e" />,
      heading: "24/7 Support",
      text: "Accédez à l'assistance de notre équipe d'expert",
    },
  ];

function HomeInfo(){
    return (
        <div className="infoboxes --mb2">
          {data.map((item, index) => {
            const {icon, heading, text} = item
            return (
              <div className="infobox" key={index}>
                <div className="icon">{icon}</div>
                <div className="text">
                  <h4>{heading}</h4>
                  <p className="--text-sm">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
};

export default HomeInfo;
