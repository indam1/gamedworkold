import {Group, Rect, Text} from "react-konva";
import React from "react";
import {useWindowDimensions} from "../../functions/Functions";

function TextAndTwoButtons(props) {
    const {sideBarWidth} = useWindowDimensions();
    return (
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={sideBarWidth / 2}
                height={60}
                y={props.y}
                fill={"white"}

                align={"center"}
                verticalAlign={"middle"}
            />
            <Group
                width={sideBarWidth / 2}
                height={60}
                x={sideBarWidth / 2}
                y={props.y}
            >
                <Rect
                    fill={"gray"}

                    stroke={"white"}
                    strokeWidth={3}
                    cornerRadius={5}

                    width={sideBarWidth / 8}
                    height={30}

                    x={sideBarWidth / 16}
                    y={15}

                    onClick={props.onClickFirst}
                />
            </Group>

            <Group
                width={sideBarWidth / 2}
                height={60}
                x={sideBarWidth / 2}
                y={props.y}
            >
                <Rect
                    fill={"gray"}

                    stroke={"white"}
                    strokeWidth={3}
                    cornerRadius={5}

                    width={sideBarWidth / 8}
                    height={30}

                    x={5 * sideBarWidth / 16}
                    y={15}

                    onClick={props.onClickSecond}
                />
            </Group>
        </React.Fragment>
    )
}

export default TextAndTwoButtons;