import React, {useState} from "react";
import {Group, Rect, Text} from "react-konva";
import {Html} from "react-konva-utils";

function FlashcardsElementUser({shapeProps, onChange}) {
    const [flashState, setFlashState] = useState('Start');
    const [countIter, setCountIter] = useState(0);

    const [answer, setAnswer] = useState('');

    return (
        <React.Fragment>
            <Group
                name={"Flashcards"}
                {...shapeProps}
            >
                <Rect
                    {...shapeProps}
                    name={"Flashcards"}
                    x={0}
                    y={0}
                />
                <Text
                    x={shapeProps.theme.x}
                    y={shapeProps.theme.y}
                    name={"Theme"}
                    text={shapeProps.theme.text}
                    fill={shapeProps.theme.fill}
                    fontSize={shapeProps.theme.fontSize}
                    fontFamily={shapeProps.theme.fontFamily}
                />
                <Text
                    align={shapeProps.word.align}
                    verticalAlign={shapeProps.word.verticalAlign}
                    x={shapeProps.word.x}
                    y={shapeProps.word.y}
                    name={"Word"}
                    text={shapeProps.word.text}
                    fill={shapeProps.word.fill}
                    fontSize={shapeProps.word.fontSize}
                    fontFamily={shapeProps.word.fontFamily}
                />
                <Text
                    align={shapeProps.meaning.align}
                    verticalAlign={shapeProps.meaning.verticalAlign}
                    x={shapeProps.meaning.x}
                    y={shapeProps.meaning.y}
                    name={"Meaning"}
                    text={shapeProps.meaning.text}
                    fill={shapeProps.meaning.fill}
                    fontSize={shapeProps.meaning.fontSize}
                    fontFamily={shapeProps.word.fontFamily}
                />
                <Text
                    name={"Result"}
                    x={shapeProps.result.x}
                    y={shapeProps.result.y}
                    text={shapeProps.result.text}
                    fill={shapeProps.result.fill}
                    fontSize={shapeProps.result.fontSize}
                    fontFamily={shapeProps.word.fontFamily}
                    visible={shapeProps.result.visible}
                />
                <Group
                    name={"Input"}
                    x={shapeProps.input.x}
                    y={shapeProps.input.y}
                    width={shapeProps.input.width}
                    height={shapeProps.input.height + 20}
                >
                    <Rect
                        name={"Input"}
                        width={shapeProps.input.width}
                        height={shapeProps.input.height + 20}
                        fill={shapeProps.input.fill}
                    />
                    <Html>
                    <textarea style={{
                        overflow: "hidden",
                        borderRadius: 5,
                        verticalAlign: "middle",
                        width: shapeProps.input.width,
                        height: shapeProps.input.height,
                        backgroundColor: "#FFFFFE",
                        color: "black",
                        resize: "none",
                        fontSize: shapeProps.input.fontSize,
                        textAlign: "center",
                        outline: "none",
                    }} onChange={(e) => {
                        setAnswer(e.target.value)
                    }} value={answer} rows={1}/>
                    </Html>
                </Group>
                <Group
                    name={"Button"}
                    x={shapeProps.button.x}
                    y={shapeProps.button.y}
                    width={shapeProps.button.width}
                    height={shapeProps.button.height}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        if (flashState === "Start" || (flashState === "Result" && countIter < shapeProps.pairs.length)) {
                            setFlashState("Wait");
                            onChange({
                                ...shapeProps,
                                button: {
                                    align: shapeProps.button.align,
                                    verticalAlign: shapeProps.button.verticalAlign,
                                    x: shapeProps.button.x,
                                    y: shapeProps.button.y,
                                    width: shapeProps.button.width,
                                    height: shapeProps.button.height,
                                    fontSize: shapeProps.button.fontSize,
                                    fontFamily: shapeProps.button.fontFamily,
                                    backgroundFill: shapeProps.button.backgroundFill,
                                    textFill: shapeProps.button.textFill,
                                    text: "Чек",
                                    cornerRadius: shapeProps.button.cornerRadius,
                                },
                                word: {
                                    align: shapeProps.word.align,
                                    verticalAlign: shapeProps.word.verticalAlign,
                                    text: shapeProps.pairs[countIter].word,
                                    x: shapeProps.word.x,
                                    y: shapeProps.word.y,
                                    fontSize: shapeProps.word.fontSize,
                                    fontFamily: shapeProps.word.fontFamily,
                                    fill: shapeProps.word.fill,
                                },
                                meaning: {
                                    align: shapeProps.meaning.align,
                                    verticalAlign: shapeProps.meaning.verticalAlign,
                                    text: "Meaning",
                                    x: shapeProps.meaning.x,
                                    y: shapeProps.meaning.y,
                                    fontSize: shapeProps.meaning.fontSize,
                                    fontFamily: shapeProps.meaning.fontFamily,
                                    fill: shapeProps.meaning.fill,
                                },
                                result: {
                                    x: shapeProps.result.x,
                                    y: shapeProps.result.y,
                                    text: "Result",
                                    fontSize: shapeProps.result.fontSize,
                                    fontFamily: shapeProps.result.fontFamily,
                                    fill: "green",
                                    answer: shapeProps.result.answer,
                                    visible: false,
                                }
                            })
                        } else if (flashState === "Wait") {

                            setFlashState("Result");

                            if (answer === shapeProps.pairs[countIter].meaning) {
                                onChange({
                                    ...shapeProps,
                                    button: {
                                        align: shapeProps.button.align,
                                        verticalAlign: shapeProps.button.verticalAlign,
                                        x: shapeProps.button.x,
                                        y: shapeProps.button.y,
                                        width: shapeProps.button.width,
                                        height: shapeProps.button.height,
                                        fontSize: shapeProps.button.fontSize,
                                        backgroundFill: shapeProps.button.backgroundFill,
                                        textFill: shapeProps.button.textFill,
                                        fontFamily: shapeProps.button.fontFamily,
                                        text: "Дальше",
                                        cornerRadius: shapeProps.button.cornerRadius,
                                    },
                                    meaning: {
                                        align: shapeProps.meaning.align,
                                        verticalAlign: shapeProps.meaning.verticalAlign,
                                        text: shapeProps.pairs[countIter].meaning,
                                        x: shapeProps.meaning.x,
                                        y: shapeProps.meaning.y,
                                        fontSize: shapeProps.meaning.fontSize,
                                        fontFamily: shapeProps.meaning.fontFamily,
                                        fill: shapeProps.meaning.fill,
                                    },
                                    result: {
                                        x: shapeProps.result.x,
                                        y: shapeProps.result.y,
                                        text: "right",
                                        fontSize: shapeProps.result.fontSize,
                                        fontFamily: shapeProps.result.fontFamily,
                                        fill: "green",
                                        answer: shapeProps.result.answer,
                                        visible: true,
                                    }
                                })
                            } else {
                                onChange({
                                    ...shapeProps,
                                    button: {
                                        align: shapeProps.button.align,
                                        verticalAlign: shapeProps.button.verticalAlign,
                                        x: shapeProps.button.x,
                                        y: shapeProps.button.y,
                                        width: shapeProps.button.width,
                                        height: shapeProps.button.height,
                                        fontSize: shapeProps.button.fontSize,
                                        backgroundFill: shapeProps.button.backgroundFill,
                                        textFill: shapeProps.button.textFill,
                                        fontFamily: shapeProps.button.fontFamily,
                                        text: "Дальше",
                                        cornerRadius: shapeProps.button.cornerRadius,
                                    },
                                    meaning: {
                                        align: shapeProps.meaning.align,
                                        verticalAlign: shapeProps.meaning.verticalAlign,
                                        text: shapeProps.pairs[countIter].meaning,
                                        x: shapeProps.meaning.x,
                                        y: shapeProps.meaning.y,
                                        fontSize: shapeProps.meaning.fontSize,
                                        fontFamily: shapeProps.meaning.fontFamily,
                                        fill: shapeProps.meaning.fill,
                                    },
                                    result: {
                                        x: shapeProps.result.x,
                                        y: shapeProps.result.y,
                                        text: "wrong",
                                        fontSize: shapeProps.result.fontSize,
                                        fontFamily: shapeProps.result.fontFamily,
                                        fill: "red",
                                        answer: shapeProps.result.answer,
                                        visible: true,
                                    }
                                })
                            }
                            setCountIter(countIter + 1);

                        } else {
                            setFlashState("Start");
                            onChange({
                                ...shapeProps,
                                button: {
                                    align: shapeProps.button.align,
                                    verticalAlign: shapeProps.button.verticalAlign,
                                    x: shapeProps.button.x,
                                    y: shapeProps.button.y,
                                    width: shapeProps.button.width,
                                    height: shapeProps.button.height,
                                    fontSize: shapeProps.button.fontSize,
                                    fontFamily: shapeProps.button.fontFamily,
                                    backgroundFill: shapeProps.button.backgroundFill,
                                    textFill: shapeProps.button.textFill,
                                    text: "Старт",
                                    cornerRadius: shapeProps.button.cornerRadius,
                                },
                                word: {
                                    align: shapeProps.word.align,
                                    verticalAlign: shapeProps.word.verticalAlign,
                                    text: "Word",
                                    x: shapeProps.word.x,
                                    y: shapeProps.word.y,
                                    fontSize: shapeProps.word.fontSize,
                                    fontFamily: shapeProps.word.fontFamily,
                                    fill: shapeProps.word.fill,
                                },
                                meaning: {
                                    align: shapeProps.meaning.align,
                                    verticalAlign: shapeProps.meaning.verticalAlign,
                                    text: "Meaning",
                                    x: shapeProps.meaning.x,
                                    y: shapeProps.meaning.y,
                                    fontSize: shapeProps.meaning.fontSize,
                                    fontFamily: shapeProps.meaning.fontFamily,
                                    fill: shapeProps.meaning.fill,
                                },
                                result: {
                                    x: shapeProps.result.x,
                                    y: shapeProps.result.y,
                                    text: "Result",
                                    fontSize: shapeProps.result.fontSize,
                                    fontFamily: shapeProps.result.fontFamily,
                                    fill: "green",
                                    answer: shapeProps.result.answer,
                                    visible: false,
                                }
                            })
                            setCountIter(0);
                        }
                    }}
                >
                    <Rect
                        name={"Answer"}
                        x={0}
                        y={0}
                        width={shapeProps.button.width}
                        height={shapeProps.button.height}
                        fill={shapeProps.button.backgroundFill}
                        cornerRadius={shapeProps.button.cornerRadius}
                    />
                    <Text
                        align={shapeProps.button.align}
                        verticalAlign={shapeProps.button.verticalAlign}
                        name={"Answer"}
                        x={0}
                        y={0}
                        text={shapeProps.button.text}
                        height={shapeProps.button.height}
                        width={shapeProps.button.width}
                        fontSize={shapeProps.button.fontSize}
                        fill={shapeProps.button.textFill}
                        fontFamily={shapeProps.button.fontFamily}
                    />
                </Group>
            </Group>
        </React.Fragment>
    );
}

export default FlashcardsElementUser;