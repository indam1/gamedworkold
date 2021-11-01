import React from "react";
import {Rect} from "react-konva";

function Icon() {
    return (
        <React.Fragment>
        <Rect
            fill={"#272c60"}
            width={55}
            height={55}
            cornerRadius={10}
        />
        </React.Fragment>
    );
}

export default Icon;