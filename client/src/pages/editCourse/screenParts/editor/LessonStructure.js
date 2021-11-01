import React, {useContext} from "react";
import {Group, Rect, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {observer} from "mobx-react";

function LessonStructure(props) {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);

    return (
        <React.Fragment>
            <Group
                x={0}
                y={mainHeight * 0.525}
                width={mainWidth * 0.1}
                height={mainHeight * 0.475}
            >
                <Rect
                    fill={"#182430"}
                    width={mainWidth * 0.1}
                    height={mainHeight * 0.475}
                    stroke={"#182430"}
                />
                <Text
                    width={mainWidth * 0.1}
                    height={76}
                    fontFamily={"Montserrat"}
                    text={"Содержание"}
                    fill={"white"}
                    fontSize={24}
                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Group
                    x={10}
                    y={65}
                    width={mainWidth * 0.1 - 20}
                    height={mainHeight * 0.475}
                >
                    {globalStore.numFields.slice().map((eachField, i) => (
                        <Group
                            key={i}
                            onMouseOver={(e) => {
                                e.currentTarget.opacity(0.5);
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.opacity(1);
                            }}
                            onClick={() => {
                                globalStore.setField(i + 1);
                            }}
                        >
                            <Rect
                                fill={"#FFFFFE"}
                                width={mainWidth * 0.02}
                                height={mainHeight * 0.04}
                                x={i % 3 * mainWidth * 0.035}
                                y={Math.floor(i / 3) * mainHeight * 0.05}
                            />
                            <Text
                                width={mainWidth * 0.02}
                                height={mainHeight * 0.04}
                                x={i % 3 * mainWidth * 0.035}
                                y={Math.floor(i / 3) * mainHeight * 0.05}
                                text={i + 1}
                                align={"center"}
                                verticalAlign={"middle"}
                                fontFamily={"Montserrat"}
                                fontSize={20}
                            />
                        </Group>
                    ))}
                </Group>

                <Group
                    y={mainHeight * 0.4}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        globalStore.addNumField(globalStore.numFields.length + 1);
                    }}
                >
                    <Rect
                        width={mainWidth * 0.1}
                        height={mainHeight * 0.04}
                        fill={"white"}
                        stroke={"white"}
                        opacity={0.2}
                    />

                    <Text
                        x={10}
                        height={mainHeight * 0.04}
                        width={mainWidth * 0.1}
                        fill={"white"}
                        verticalAlign={"middle"}
                        fontSize={50}
                        fontFamily={"Montserrat"}
                        text={"+"}
                    />

                    <Text
                        x={mainWidth * 0.03}
                        width={mainWidth * 0.1}
                        height={mainHeight * 0.04}
                        fill={"white"}
                        verticalAlign={"middle"}
                        fontSize={12}
                        fontFamily={"Montserrat"}
                        text={"новое задание"}
                    />
                </Group>
            </Group>
        </React.Fragment>
    );
}

export default observer(LessonStructure);