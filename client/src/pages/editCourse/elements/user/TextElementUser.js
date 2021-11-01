import React from "react";
import {Text} from "react-konva";

function TextElementUser({shapeProps}) {

    return (
        <React.Fragment>
            <Text
                name={"Text"}
                {...shapeProps}
            />
        </React.Fragment>
    );
}

export default TextElementUser;