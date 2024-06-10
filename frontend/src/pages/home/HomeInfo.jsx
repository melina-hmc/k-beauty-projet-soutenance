import React from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { MdSecurity } from "react-icons/md";

const data = [
    {
      icon: <GrDeliver size={30} />,
      heading: "Livraison",
      text: "Bénéficiez d'une livraison standard ou express",
    },
    {
        icon: <FaArrowRotateLeft size={30}/>,
        heading: "Retours faciles",
        text: "Retour simple et gratuit",
    },
    {
        icon: <MdSecurity size={30} />,
        heading: "Achats sécurisés",
        text: "cryptage SSL garantit la protection de vos informations",
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
