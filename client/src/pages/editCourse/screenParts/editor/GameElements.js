import React, {useContext} from "react";
import {Group, Rect, Text} from "react-konva";
import Icon from "../../templates/Icon";
import {CounterStoreContext} from "../../stores/counterStore";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {ElemStoreContext} from "../../stores/elemStore";
import {observer} from "mobx-react";

function GameElements() {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const counterStore = useContext(CounterStoreContext);
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    return (
        <React.Fragment>
            <Group // DownRight
                x={mainWidth * 0.4}
                y={mainHeight * 0.8075}
                width={mainWidth * 0.5}
                height={mainHeight * 0.1925}
            >
                <Rect
                    fill={"#434e99"}
                    width={mainWidth * 0.5}
                    height={mainHeight * 0.1925}
                    stroke={"#434e99"}
                />
                <Text
                    width={mainWidth * 0.5}
                    height={40}
                    fontFamily={"Montserrat"}
                    align={"center"}
                    verticalAlign={"middle"}
                    text={"Игровые элементы"}
                    fill={"white"}
                    fontSize={24}
                />

                <Group
                    x={20}
                    y={40}
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
                            field: globalStore.selectedField.toString(),

                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,

                            height: 300,
                            width: 300,
                            fill: "#000002",
                            cornerRadius: 0,

                            answer: {
                                height: 40,
                                width: 40,
                                backgroundFill: "#FFFFFE",
                                textFill: "#000002",
                                fontSize: 16,
                                cornerRadius: 0,
                                fontFamily: "Arial",
                                visible: false,
                            },
                            button: {
                                x: 0,
                                y: 60,
                                text: "старт",
                                height: 25,
                                width: 50,
                                backgroundFill: "#FFFFFE",
                                textFill: "#000002",
                                fontSize: 16,
                                cornerRadius: 0,
                                fontFamily: "Arial",
                                visible: true,
                            },
                            theme: {
                                text: "Theme",
                                x: 0,
                                y: 0,
                                fontSize: 32,
                                fill: "#FFFFFE",
                                fontFamily: "Arial",
                            },
                            question: {
                                visible: false,
                                x: 0,
                                y: 40,
                                fontSize: 24,
                                fill: "#FFFFFE",
                                fontFamily: "Arial",
                            },
                            questions: [
                                {
                                    text: "Question1",
                                    answers: [
                                        {
                                            x: 10,
                                            y: 100,
                                            text: "ответ 1",
                                        },
                                        {
                                            x: 70,
                                            y: 100,
                                            text: "ответ 2",
                                        },
                                        {
                                            x: 10,
                                            y: 200,
                                            text: "ответ 3",
                                        },
                                        {
                                            x: 70,
                                            y: 200,
                                            text: "ответ 4",
                                        }
                                    ],
                                    result: null,
                                },
                            ],
                            result: {
                                x: 0,
                                y: 160,
                                fontSize: 24,
                                fill: "#FFFFFE",
                                text: "Result",
                                visible: false,
                                fontFamily: "Arial",
                            },
                        });
                    }}
                >
                    <Icon/>
                    <Text
                        fontSize={20}
                        text={'?'}
                        fill={'white'}
                        padding={23}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"тест"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    x={85}
                    y={40}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={(e) => {
                        counterStore.counterFlashcards++;
                        counterStore.counterCommon++;

                        elemStore.addFlashcard({
                            counter: counterStore.counterCommon,
                            field: globalStore.selectedField.toString(),
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            height: 200,
                            width: 200,
                            fontSize: 24,
                            cornerRadius: 0,
                            fill: "#000002",
                            theme: {
                                text: "Theme",
                                x: 0,
                                y: 0,
                                fontSize: 32,
                                fontFamily: "Arial",
                                fill: "#FFFFFE",
                            },
                            word: {
                                text: "word",
                                x: 0,
                                y: 35,
                                fontSize: 20,
                                fontFamily: "Arial",
                                fill: "#FFFFFE",
                            },
                            meaning: {
                                text: "meaning",
                                x: 0,
                                y: 60,
                                fontSize: 20,
                                fontFamily: "Arial",
                                fill: "#FFFFFE",
                            },
                            input: {
                                x: 0,
                                y: 90,
                                width: 150,
                                height: 25,
                                fontSize: 20,
                            },
                            button: {
                                align: 'center',
                                verticalAlign: 'middle',
                                cornerRadius: 0,
                                x: 0,
                                y: 130,
                                width: 40,
                                height: 40,
                                fontSize: 16,
                                fontFamily: "Arial",
                                backgroundFill: "#FFFFFE",
                                textFill: "#000002",
                                text: "start",
                            },
                            result: {
                                x: 0,
                                y: 180,
                                fontSize: 14,
                                fontFamily: "Arial",
                                fill: "#FFFFFE",
                                text: "result",
                                answer: null,
                                visible: false,
                            },
                            pairs: [],
                            id: 'flashcards' + counterStore.counterFlashcards.toString(),
                        });
                    }}
                >
                    <Icon/>
                    <Text
                        fontSize={20}
                        text={'F'}
                        fill={'white'}
                        padding={23}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"flashcards"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    x={150}
                    y={40}
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
                            field: globalStore.selectedField.toString(),
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            curText: 0,
                            id: 'textquest' + counterStore.counterTextquest.toString(),
                            unit: {
                                height: 200,
                                width: 200,
                                fontSize: 20,
                                fontFamily: "Arial",
                                backgroundFill: "#FFFFFE",
                                textFill: "#000002",
                                opacity: 1,
                                cornerRadius: 0,
                            },
                            button: {
                                width: 50,
                                height: 50,
                                cornerRadius: 0,
                                fontSize: 20,
                                fontFamily: "Arial",
                                backgroundFill: "#000002",
                                textFill: "#FFFFFE",
                            },
                            units: [{
                                x: 0,
                                y: 0,
                                number: 0,
                                text: "Текст",
                                buttons: [{
                                    x: 0,
                                    y: 50,
                                    text: 'д1'
                                }],
                            }],
                        });
                    }}
                >
                    <Icon/>
                    <Text
                        x={-8}
                        fontSize={20}
                        text={'TQ'}
                        fill={'white'}
                        padding={23}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"textQuest"}
                        fill={"white"}
                    />
                </Group>

            </Group>
        </React.Fragment>
    );
}

export default observer(GameElements);