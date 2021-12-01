import React, {useContext, useEffect, useRef} from "react";
import {Group, Rect, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {observer} from "mobx-react";
import Konva from "konva";
import {CounterStoreContext} from "../../stores/counterStore";
import {toJS} from "mobx";

function LessonStructure(props) {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const counterStore = useContext(CounterStoreContext)
    const layerRef = useRef(null)
    const chapterRef = useRef([])
    const themeRef = useRef([[]])
    const stepRef = useRef([])
    const chapterText = useRef([])
    const chapterButton = useRef([])

    return (
        <React.Fragment>
            <Group
                y={mainHeight * 0.525}
                width={mainWidth * 0.1}
                height={mainHeight * 0.475}
                ref={layerRef}
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
                    y={65}
                    height={mainHeight * 0.475}
                >
                    {counterStore.chapters.map((eachChapter, i) => (
                        <Group
                            key={i}
                            onMouseOver={() => {
                                chapterButton.current[i].opacity(0.5)
                                chapterText.current[i].opacity(0.5)
                            }}
                            onMouseOut={() => {
                                chapterButton.current[i].opacity(1)
                                chapterText.current[i].opacity(1)
                            }}

                            onClick={() => {
                                chapterRef.current[i].visible(true)
                            }}
                        >
                            <Rect
                                ref={el => chapterButton.current[i] = el}
                                fill={"#FFFFFE"}
                                width={mainWidth * 0.08}
                                height={mainHeight * 0.03}
                                x={mainWidth * 0.01}
                                y={i * mainHeight * 0.04}
                            />
                            <Text
                                ref={el => chapterText.current[i] = el}
                                width={mainWidth * 0.08}
                                height={mainHeight * 0.03}
                                x={mainWidth * 0.01}
                                y={i * mainHeight * 0.04}
                                text={eachChapter.id}
                                align={"center"}
                                verticalAlign={"middle"}
                                fontFamily={"Montserrat"}
                                fontSize={20}
                            />
                            <Group
                                width={mainWidth * 0.02}
                                height={mainHeight * 0.15}
                                x={mainWidth * 0.09}
                                y={(i * mainHeight * 0.04) - mainHeight * 0.15 / 2 + mainHeight * 0.03 / 2}
                                visible={false}
                                ref={el => chapterRef.current[i] = el}
                                onMouseLeave={() => {
                                    chapterRef.current[i].visible(false)
                                }}
                            >
                                <Rect
                                    width={mainWidth * 0.02}
                                    height={mainHeight * 0.15}
                                    fill={"blue"}
                                    stroke={"black"}
                                    strokeWidth={1}
                                />
                                <Rect
                                    width={mainWidth * 0.02}
                                    height={mainHeight * 0.03}
                                    fill={"grey"}
                                    y={mainHeight * 0.12}
                                    onClick={() => {
                                        counterStore.addTheme({
                                            id: 1,
                                            steps: []
                                        }, i)
                                    }}
                                />
                                {eachChapter.themes.map((eachTheme, j) => (
                                    <Group>
                                        <Group
                                            width={mainWidth * 0.015}
                                            height={mainHeight * 0.02}
                                            x={mainWidth * 0.0025}
                                            y={mainHeight * 0.01 * (1 + j * 4)}
                                            onClick={() => {
                                                themeRef.current[i][j].visible(true)
                                            }}
                                        >
                                            <Rect
                                                width={mainWidth * 0.015}
                                                height={mainHeight * 0.02}
                                                fill={"white"}
                                            />
                                            <Text
                                                width={mainWidth * 0.015}
                                                height={mainHeight * 0.02}
                                                text={eachTheme.id}
                                                align={"center"}
                                                verticalAlign={"middle"}
                                                fontFamily={"Montserrat"}
                                                fontSize={20}
                                            />
                                        </Group>
                                        <Group
                                            width={mainWidth * 0.1}
                                            height={mainHeight * 0.03}
                                            x={mainWidth * 0.02}
                                            y={mainHeight * 0.01 * (1 + j * 4) - mainHeight * 0.03 / 2 + mainHeight * 0.02 / 2}
                                            visible={false}
                                            ref={el => themeRef.current[i][j] = el}
                                            onMouseLeave={() => {
                                                themeRef.current[i][j].visible(false)
                                            }}
                                        >
                                            <Rect
                                                width={mainWidth * 0.1}
                                                height={mainHeight * 0.03}
                                                fill={"blue"}
                                                stroke={"black"}
                                                strokeWidth={1}
                                            />
                                            <Rect
                                                width={mainWidth * 0.01}
                                                height={mainHeight * 0.03}
                                                fill={"grey"}
                                                x={mainWidth * 0.08}
                                                onClick={() => {
                                                    counterStore.addStep({
                                                        id: 1,
                                                    }, i, j)
                                                }}
                                            />
                                            {eachTheme.steps.map((eachStep, k) => (
                                                <Group key={k}
                                                       ref={el => stepRef.current[k] = el}
                                                       width={mainWidth * 0.01}
                                                       height={mainHeight * 0.02}
                                                       x={mainWidth * 0.01 * (1 + k * 2)}
                                                       y={mainHeight * 0.005}

                                                       onClick={() => {
                                                           globalStore.setField(i, j, k)
                                                       }}
                                                >
                                                    <Rect
                                                        width={mainWidth * 0.01}
                                                        height={mainHeight * 0.02}
                                                        fill={"white"}
                                                    />
                                                    <Text
                                                        width={mainWidth * 0.01}
                                                        height={mainHeight * 0.02}
                                                        text={eachStep.id}
                                                        align={"center"}
                                                        verticalAlign={"middle"}
                                                        fontFamily={"Montserrat"}
                                                        fontSize={20}
                                                    />
                                                </Group>
                                            ))}
                                        </Group>
                                    </Group>
                                ))}

                            </Group>
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
                        themeRef.current.push([])
                        counterStore.addChapter({
                            id: 1,
                            themes: []
                        })
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