import React from 'react';
import ReactLoading from 'react-loading';
import Logo from "./img/icons/mainlogo.png";

export const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full ">
            <img
                    src={Logo}
                    alt={"つりちゅーぶ"}
                    className="pointer-events-none h-32 md:h-40 lg:h-48 py-8"
                />
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 py-8">
                <ReactLoading type="spinningBubbles" color='40A4CE' height={'100%'} width={'100%'} />
            </div>
        </div>

    )
};