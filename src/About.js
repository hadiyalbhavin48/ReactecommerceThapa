import React from "react";
import HeroSection from "./component/HeroSection";
import { useProductContext } from "./context/productcontex";

const About = () => {
    const { myName } = useProductContext();

    const data = {
        name: "Thapa Ecommerce",
    };


    return (
        <>
            {myName}
            <HeroSection myData={data} />
        </>
    );
};

export default About;