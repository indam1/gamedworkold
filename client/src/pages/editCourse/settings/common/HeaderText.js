import {Text} from "react-konva";
import React from "react";
import {useWindowDimensions} from "../../functions/Functions";

function HeaderText(props) {
    const {sideBarWidth} = useWindowDimensions();

    return(
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={sideBarWidth}
                y={props.y}
                height={60}
                fill={"white"}

                align={"center"}
                verticalAlign={"middle"}
            />
        </React.Fragment>
    )
}

export default HeaderText;