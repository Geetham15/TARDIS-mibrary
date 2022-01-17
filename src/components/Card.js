import React from "react";

function Card(props) {
  const { name, image, address } = props;
  return (
    <div><h1 className=" flex justify-center items-center text-2xl p-2 font-bold w-full text-center">{props.name}</h1>
        <img
          className="w-96 h-96 flex justify-center items-center w-full "
          alt="app-logo"
         src={`${process.env.PUBLIC_URL} images/${props.image}`}
           
        />
        
        <h1 className=" flex justify-center items-center">{props.address}</h1>
      </div>
  );
}

export default Card;
