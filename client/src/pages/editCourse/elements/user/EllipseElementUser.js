import React from "react";
import {Ellipse} from "react-konva";

function EllipseElementUser({shapeProps}) {
    return (
        <React.Fragment>
            <Ellipse
                name={"Ellipse"}
                {...shapeProps}
            />
        </React.Fragment>
    );
}

export default EllipseElementUser;