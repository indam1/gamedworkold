import React from "react";
import {Image} from "react-konva";
import useImage from "use-image";

function ImageElementUser({shapeProps}) {
    const [image] = useImage(shapeProps.src)

    return (
        <React.Fragment>
            <Image
                name={"Image"}
                {...shapeProps}
                image={image}
            />
        </React.Fragment>
    );
}

export default ImageElementUser;