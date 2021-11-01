import React from "react";
import {Group, Rect, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";

function RightScreenUser(props) {
    const {mainWidth, mainHeight} = useWindowDimensions();
    return (
        <React.Fragment>
            <Group // Right
                x={mainWidth * 0.9}
                y={mainHeight * 0.05}
                width={mainWidth * 0.1}
                height={mainHeight * 0.95}
            >
                <Rect
                    fill={"#182430"}
                    x={0}
                    y={0}
                    width={mainWidth * 0.1}
                    height={mainHeight * 0.95}
                    stroke={"#182430"}
                />
                <Text
                    align={"center"}
                    verticalAlign={"middle"}
                    x={0}
                    y={0}
                    height={152}
                    width={mainWidth * 0.1}
                    text={"Правый интерфейс пользователя"}
                    fill={"white"}
                    fontSize={30}
                    fontFamily={"Montserrat"}
                />
            </Group>
        </React.Fragment>
    );
}

export default RightScreenUser;