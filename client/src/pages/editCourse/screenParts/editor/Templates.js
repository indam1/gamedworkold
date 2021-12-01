import React, {useContext} from "react";
import {Group, Image, Rect, Text} from "react-konva";
import useImage from "use-image";
import {CounterStoreContext} from "../../stores/counterStore";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {ElemStoreContext} from "../../stores/elemStore";

export const Templates = () => {
    const [imageTextquest] = useImage('../siteImages/textquest.png');
    const [imageFlashcards] = useImage("../siteImages/flashcards.png");
    const [imageTest] = useImage("../siteImages/test.png");
    const {mainWidth, mainHeight} = useWindowDimensions();
    const counterStore = useContext(CounterStoreContext);
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    return (
        <React.Fragment>
            <Group
                x={mainWidth * 0.9}
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
                    text={"Шаблоны"}
                    fill={"white"}
                    fontSize={24}
                    align={"center"}
                    verticalAlign={"middle"}
                />

                <Image
                    x={mainWidth * 0.024}
                    y={mainHeight * 0.07}
                    width={mainWidth * 0.052}
                    height={mainHeight * 0.12}
                    image={imageTextquest}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={(e) => {
                        counterStore.counterTextquest++;
                        counterStore.counterCommon++;

                        elemStore.addTextquest({
                            counter: counterStore.counterCommon,
                            field: globalStore.selectedField,
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            curUnit: 0,
                            height: 236,
                            width: 593 * 2,
                            fill: "#FFFFFE",
                            end: 2,
                            opacity: 0.6,
                            cornerRadius: 5,
                            id: 'textquest' + counterStore.counterTextquest.toString(),
                            text: {
                                fontSize: 20,
                                fontFamily: "Montserrat",
                                fill: "#000002",
                            },
                            button: {
                                width: 204,
                                height: 42,
                                cornerRadius: 5,
                                fontSize: 20,
                                fontFamily: "Montserrat",
                                backgroundFill: "#5753C9",
                                textFill: "#FFFFFE",
                            },
                            units: [
                                {
                                    x: 0,
                                    y: 0,
                                    number: 0,
                                    text: "Текст1",
                                    buttons: [
                                        {
                                            x: 30,
                                            y: 106,
                                            text: 'действие 1',
                                            jump: 1,
                                        },
                                        {
                                            x: 30,
                                            y: 162,
                                            text: 'действие 2',
                                            jump: 1,
                                        }
                                    ],
                                },
                                {
                                    x: 0,
                                    y: 0,
                                    number: 1,
                                    text: "Текст2",
                                    buttons: [
                                        {
                                            x: 30,
                                            y: 106,
                                            text: 'конец',
                                            jump: 2,
                                        }
                                    ],
                                }
                            ],
                        });
                    }}
                />

                <Image
                    x={mainWidth * 0.024}
                    y={mainHeight * 0.20}
                    width={mainWidth * 0.052}
                    height={mainHeight * 0.12}
                    image={imageFlashcards}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        counterStore.counterFlashcards++;
                        counterStore.counterCommon++;

                        elemStore.addFlashcard({
                            counter: counterStore.counterCommon,
                            field: globalStore.selectedField,
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            height: 253,
                            width: 215,
                            fontSize: 24,
                            cornerRadius: 15,
                            fill: "#FFFFFE",
                            theme: {
                                fontFamily: "Montserrat",
                                text: "Theme",
                                x: 50,
                                y: 16,
                                fontSize: 32,
                                fill: "#5753C9",
                            },
                            word: {
                                align: 'center',
                                verticalAlign: 'middle',
                                fontFamily: "Montserrat",
                                text: "word",
                                x: 81,
                                y: 56,
                                fontSize: 20,
                                fill: "#868C92",
                            },
                            meaning: {
                                align: 'center',
                                verticalAlign: 'middle',
                                fontFamily: "Montserrat",
                                text: "meaning",
                                x: 61,
                                y: 93,
                                fontSize: 20,
                                fill: "#868C92",
                            },
                            input: {
                                text: "",
                                x: 30,
                                y: 140,
                                width: 161,
                                height: 34,
                                fontSize: 20,
                                backgroundFill: "white",
                                textFill: "black",
                                cornerRadius: 5,
                                fontFamily: "Montserrat",
                                align: "center",
                                verticalAlign: "middle",
                                strokeWidth: 1,
                                stroke: "black"
                            },
                            button: {
                                align: 'center',
                                verticalAlign: 'middle',
                                fontFamily: "Montserrat",
                                cornerRadius: 5,
                                x: 29,
                                y: 182,
                                width: 161,
                                height: 34,
                                fontSize: 16,
                                backgroundFill: "#5753C9",
                                textFill: "#FFFFFE",
                                text: "start",
                            },
                            result: {
                                fontFamily: "Montserrat",
                                x: 90,
                                y: 225,
                                fontSize: 14,
                                fill: "#3DA556",
                                text: "result",
                                answer: null,
                                visible: false,
                            },
                            pairs: [],
                            id: 'flashcards' + counterStore.counterFlashcards.toString(),
                        });
                    }}
                />

                <Image
                    x={mainWidth * 0.024}
                    y={mainHeight * 0.33}
                    width={mainWidth * 0.052}
                    height={mainHeight * 0.12}
                    image={imageTest}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        counterStore.counterTest++;
                        counterStore.counterCommon++;

                        elemStore.addTest({
                            id: 'test' + counterStore.counterTest.toString(),
                            curQuestion: 0,
                            counter: counterStore.counterCommon,
                            field: globalStore.selectedField,

                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,

                            height: 280,
                            width: 442,
                            fill: "#FFFFFE",
                            cornerRadius: 15,

                            theme: {
                                text: "Theme",
                                x: 165.5,
                                y: 18,
                                fontSize: 32,
                                fill: "#5753C9",
                                fontFamily: "Montserrat",
                            },
                            button: {
                                x: 139,
                                y: 207,
                                text: "старт",
                                height: 34,
                                width: 161,
                                backgroundFill: "#5753C9",
                                textFill: "#FFFFFE",
                                fontSize: 16,
                                cornerRadius: 5,
                                fontFamily: "Montserrat",
                                visible: true,
                            },
                            question: {
                                x: 33,
                                y: 58,
                                fontSize: 20,
                                fill: "#868C92",
                                fontFamily: "Montserrat",
                                visible: false,
                            },
                            answer: {
                                height: 34,
                                width: 161,
                                backgroundFill: "#5753C9",
                                textFill: "#FFFFFE",
                                fontSize: 16,
                                cornerRadius: 5,
                                fontFamily: "Montserrat",
                                visible: false,
                            },
                            questions: [
                                {
                                    text: "Question1",
                                    answers: [
                                        {
                                            text: "ответ 1",
                                            x: 33,
                                            y: 105,
                                        },
                                        {
                                            x: 248,
                                            y: 105,
                                            text: "ответ 2",
                                        },
                                        {
                                            x: 33,
                                            y: 158,
                                            text: "ответ 3",
                                        },
                                        {
                                            x: 248,
                                            y: 158,
                                            text: "ответ 4",
                                        }
                                    ],
                                    result: null,
                                }
                            ],
                            result: {
                                x: 200,
                                y: 255,
                                fontSize: 14,
                                fill: "green",
                                text: "Result",
                                visible: false,
                                fontFamily: "Montserrat",
                            },
                        });
                    }}
                />
            </Group>
        </React.Fragment>
    );
}