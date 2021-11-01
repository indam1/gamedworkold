import React from "react";
import {Rect} from "react-konva";

function RectangleElementUser({shapeProps}) {

    return (
        <React.Fragment>
            <Rect
                name={"Rectangle"}
                {...shapeProps}
            />
        </React.Fragment>
    );
}

export default RectangleElementUser;