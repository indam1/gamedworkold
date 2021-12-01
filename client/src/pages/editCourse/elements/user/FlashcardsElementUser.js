import React, {useContext, useRef, useState} from "react";
import {Group, Rect, Text} from "react-konva";
import {Html} from "react-konva-utils";
import {StageStoreContext} from "../../stores/stageStore";

function FlashcardsElementUser({shapeProps, onChange}) {
    const [flashState, setFlashState] = useState('Start');
    const [countIter, setCountIter] = useState(0);

    const [answer, setAnswer] = useState('');

    const stageStore = useContext(StageStoreContext);

    const inputRef = useRef();

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
                    height={shapeProps.input.height}
                >
                    <Rect
                        name={"Input"}
                        width={shapeProps.input.width}
                        height={shapeProps.input.height}
                        fill={shapeProps.input.backgroundFill}
                        cornerRadius={shapeProps.input.cornerRadius}
                        strokeWidth={shapeProps.input.strokeWidth}
                        stroke={shapeProps.input.stroke}
                    />
                    <Text
                        align={shapeProps.input.align}
                        verticalAlign={shapeProps.input.verticalAlign}
                        fontFamily={shapeProps.input.fontFamily}
                        name={"Answer"}
                        text={shapeProps.input.text}
                        height={shapeProps.input.height}
                        width={shapeProps.input.width}
                        fontSize={shapeProps.input.fontSize}
                        fill={shapeProps.input.textFill}
                        ref={inputRef}

                        onClick={() => {
                            const textNode = inputRef.current;
                            const stageRef = stageStore.stageRef;

                            // hide text node and transformer:
                            textNode.visible(false);

                            // create textarea over canvas with absolute position
                            // first we need to find position for textarea
                            // how to find it?

                            // at first lets find position of text node relative to the stage:
                            var textPosition = textNode.absolutePosition();

                            // so position of textarea will be the sum of positions above:
                            var areaPosition = {
                                x: stageRef.current.container().offsetLeft + textPosition.x,
                                y: stageRef.current.container().offsetTop + textPosition.y,
                            };

                            // create textarea and style it
                            var textarea = document.createElement('textarea');
                            document.body.appendChild(textarea);

                            // apply many styles to match text on canvas as close as possible
                            // remember that text rendering on canvas and on the textarea can be different
                            // and sometimes it is hard to make it 100% the same. But we will try...
                            textarea.value = textNode.text();
                            textarea.style.position = 'absolute';
                            textarea.style.top = areaPosition.y + 'px';
                            textarea.style.left = areaPosition.x + 'px';
                            textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
                            textarea.style.height =
                                textNode.height() - textNode.padding() * 2 + 5 + 'px';
                            textarea.style.fontSize = textNode.fontSize() + 'px';
                            textarea.style.border = 'none';
                            textarea.style.padding = '0px';
                            textarea.style.margin = '0px';
                            textarea.style.overflow = 'hidden';
                            textarea.style.background = 'none';
                            textarea.style.outline = 'none';
                            textarea.style.resize = 'none';
                            textarea.style.lineHeight = textNode.lineHeight();
                            textarea.style.fontFamily = textNode.fontFamily();
                            textarea.style.transformOrigin = 'left top';
                            textarea.style.textAlign = textNode.align();
                            textarea.style.color = textNode.fill();
                            var rotation = textNode.rotation();
                            var transform = '';
                            if (rotation) {
                                transform += 'rotateZ(' + rotation + 'deg)';
                            }

                            var px = 0;
                            // also we need to slightly move textarea on firefox
                            // because it jumps a bit
                            var isFirefox =
                                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                            if (isFirefox) {
                                px += 2 + Math.round(textNode.fontSize() / 20);
                            }
                            transform += 'translateY(-' + px + 'px)';

                            textarea.style.transform = transform;

                            // reset height
                            textarea.style.height = 'auto';
                            // after browsers resized it we can set actual value
                            textarea.style.height = textarea.scrollHeight + 3 + 'px';

                            textarea.focus();

                            function removeTextarea() {
                                onChange({
                                    ...shapeProps,
                                    input: {
                                        text: textarea.value,
                                        x: shapeProps.input.x,
                                        y: shapeProps.input.y,
                                        width: shapeProps.input.width,
                                        height: shapeProps.input.height,
                                        fontSize: shapeProps.input.fontSize,
                                        backgroundFill: shapeProps.input.backgroundFill,
                                        textFill: shapeProps.input.textFill,
                                        stroke: shapeProps.input.stroke,
                                        strokeWidth: shapeProps.input.strokeWidth,
                                        cornerRadius: shapeProps.input.cornerRadius,
                                        fontFamily: shapeProps.input.fontFamily,
                                        align: shapeProps.input.align,
                                        verticalAlign: shapeProps.input.verticalAlign
                                    },
                                })
                                textarea.parentNode.removeChild(textarea);
                                window.removeEventListener('click', handleOutsideClick);
                                textNode.show();
                            }

                            function setTextareaWidth(newWidth) {
                                if (!newWidth) {
                                    // set width for placeholder
                                    newWidth = textNode.placeholder.length * textNode.fontSize();
                                }
                                // some extra fixes on different browsers
                                var isSafari = /^((?!chrome|android).)*safari/i.test(
                                    navigator.userAgent
                                );
                                var isFirefox =
                                    navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                                if (isSafari || isFirefox) {
                                    newWidth = Math.ceil(newWidth);
                                }

                                var isEdge =
                                    document.documentMode || /Edge/.test(navigator.userAgent);
                                if (isEdge) {
                                    newWidth += 1;
                                }
                                textarea.style.width = newWidth + 'px';
                            }

                            textarea.addEventListener('keydown', function (e) {
                                // hide on enter
                                // but don't hide on shift + enter
                                if (e.keyCode === 13 && !e.shiftKey) {
                                    textNode.text(textarea.value);
                                    removeTextarea();
                                }
                                // on esc do not set value back to node
                                if (e.keyCode === 27) {
                                    removeTextarea();
                                }
                            });

                            textarea.addEventListener('keydown', function (e) {
                                var scale = textNode.getAbsoluteScale().x;
                                setTextareaWidth(textNode.width() * scale);
                                textarea.style.height = 'auto';
                                textarea.style.height =
                                    textarea.scrollHeight + textNode.fontSize() + 'px';
                            });

                            function handleOutsideClick(e) {
                                if (e.target !== textarea) {
                                    textNode.text(textarea.value);
                                    removeTextarea();
                                }
                            }

                            setTimeout(() => {
                                window.addEventListener('click', handleOutsideClick);
                            });
                        }}
                    />
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
                        setAnswer(inputRef.current.text())
                        console.log(answer)
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