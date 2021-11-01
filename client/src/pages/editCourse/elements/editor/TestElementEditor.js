import React, {useContext, useEffect, useRef} from "react";
import {Group, Rect, Text, Transformer} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import * as Test from "../../change/Test";
import {StageStoreContext} from "../../stores/stageStore";

function TestElementEditor({shapeProps, isSelected, onSelect, onChange}) {
    const shapeRef = useRef(null);
    const trRef = useRef(null);
    const questionRef = useRef(null);
    const themeRef = useRef(null);
    const answerRef = useRef([]);
    const resultRef = useRef(null);
    const buttonRef = useRef(null);

    const {mainWidth, mainHeight} = useWindowDimensions();
    const stageStore = useContext(StageStoreContext)

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }

    }, [isSelected]);

    return (
        <React.Fragment>
            <Group
                name={"object Test"}
                draggable
                onMouseDown={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}

                onDragEnd={(e) => {
                    if (e.target.name() === 'object Test') {
                        onChange({
                            ...shapeProps,
                            x: e.target.x(),
                            y: e.target.y(),
                        });
                    }
                }}

                onTransformEnd={(e) => {
                    const scaleX = e.target.scaleX();
                    const scaleY = e.target.scaleY();

                    e.target.scaleX(1);
                    e.target.scaleY(1);

                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                        width: e.target.width() * scaleX,
                        height: e.target.height() * scaleY,
                    })
                }}

            >
                <Rect
                    name={"object Test"}
                    width={shapeProps.width}
                    height={shapeProps.height}
                    fill={shapeProps.fill}
                    cornerRadius={shapeProps.cornerRadius}
                />
                <Text
                    x={shapeProps.theme.x}
                    y={shapeProps.theme.y}
                    draggable
                    name={"object Theme"}
                    listening
                    text={shapeProps.theme.text}
                    fill={shapeProps.theme.fill}
                    fontSize={shapeProps.theme.fontSize}
                    ref={themeRef}
                    fontFamily={shapeProps.theme.fontFamily}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Theme') {
                            onChange({
                                ...shapeProps,
                                theme: {
                                    x: e.target.x(),
                                    y: e.target.y(),
                                    text: shapeProps.theme.text,
                                    fontSize: shapeProps.theme.fontSize,
                                    fill: shapeProps.theme.fill,
                                    fontFamily: shapeProps.theme.fontFamily,
                                }
                            })
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        const ref = themeRef.current;

                        let newX, newY;
                        if (pos.x < shapeProps.x + mainWidth * 0.1)
                            newX = shapeProps.x + mainWidth * 0.1;
                        else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width())
                            newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width();
                        else
                            newX = pos.x;

                        if (pos.y < shapeProps.y + mainHeight * 0.05)
                            newY = shapeProps.y + mainHeight * 0.05;
                        else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height())
                            newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height();
                        else
                            newY = pos.y;

                        return {
                            x: newX,
                            y: newY,
                        }
                    }}

                    onDblClick={() => {
                        const textNode = themeRef.current;
                        const stageRef = stageStore.stageRef;

                        // hide text node and transformer:
                        textNode.hide();
                        trRef.current.visible(false);

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
                            Test.changeThemeText(onChange, shapeProps, textarea.value);

                            textarea.parentNode.removeChild(textarea);
                            window.removeEventListener('click', handleOutsideClick);
                            textNode.show();
                            trRef.current.show();
                            trRef.current.forceUpdate();
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

                <Text
                    x={shapeProps.question.x}
                    y={shapeProps.question.y}
                    text={shapeProps.questions[shapeProps.curQuestion].text}
                    draggable
                    name={"object Question"}
                    listening
                    fill={shapeProps.question.fill}
                    fontSize={shapeProps.question.fontSize}
                    ref={questionRef}
                    fontFamily={shapeProps.question.fontFamily}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Question') {
                            onChange({
                                ...shapeProps,
                                question: {
                                    x: e.target.x(),
                                    y: e.target.y(),
                                    text: shapeProps.questions[shapeProps.curQuestion]?.text,
                                    fontSize: shapeProps.question.fontSize,
                                    fill: shapeProps.question.fill,
                                    fontFamily: shapeProps.question.fontFamily,
                                    visible: shapeProps.question.visible,
                                },
                            });
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        const ref = questionRef.current;

                        let newX, newY;
                        if (pos.x < shapeProps.x + mainWidth * 0.1)
                            newX = shapeProps.x + mainWidth * 0.1;
                        else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width())
                            newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width();
                        else
                            newX = pos.x;

                        if (pos.y < shapeProps.y + mainHeight * 0.05)
                            newY = shapeProps.y + mainHeight * 0.05;
                        else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height())
                            newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height();
                        else
                            newY = pos.y;

                        return {
                            x: newX,
                            y: newY,
                        }
                    }}

                    onDblClick={() => {
                        const textNode = questionRef.current;
                        const stageRef = stageStore.stageRef;

                        // hide text node and transformer:
                        textNode.hide();
                        trRef.current.visible(false);

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
                            Test.changeQuestionText(onChange, shapeProps, textarea.value);

                            textarea.parentNode.removeChild(textarea);
                            window.removeEventListener('click', handleOutsideClick);
                            textNode.show();
                            trRef.current.show();
                            trRef.current.forceUpdate();
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

                {shapeProps.questions[shapeProps.curQuestion].answers.map((eachAnswer, i) => (
                    <Group
                        name={"object Answer"}
                        draggable
                        key={i}
                        x={eachAnswer.x}
                        y={eachAnswer.y}
                        width={shapeProps.answer.width}
                        height={shapeProps.answer.height}
                        ref={el => answerRef.current[i] = el}

                        onDragEnd={(e) => {
                            if (e.target.name() === 'object Answer') {
                                const tempAnswer = shapeProps.questions[shapeProps.curQuestion].answers.map((item) => {
                                    return item !== eachAnswer ? item : {
                                        x: e.target.x(),
                                        y: e.target.y(),
                                        text: eachAnswer.text,
                                    };
                                })

                                const tempQuestions = shapeProps.questions.map((item) => {
                                    return item !== shapeProps.questions[shapeProps.curQuestion] ? item : {
                                        text: shapeProps.questions[shapeProps.curQuestion].text,
                                        answers: tempAnswer,
                                        result: shapeProps.questions[shapeProps.curQuestion].result,
                                    }
                                })

                                onChange({
                                    ...shapeProps,
                                    questions: tempQuestions,
                                });
                            }
                        }}

                        dragBoundFunc={(pos) => {
                            const ref = answerRef.current[i];

                            let newX, newY;
                            if (pos.x < shapeProps.x + mainWidth * 0.1)
                                newX = shapeProps.x + mainWidth * 0.1;
                            else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width())
                                newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width();
                            else
                                newX = pos.x;

                            if (pos.y < shapeProps.y + mainHeight * 0.05)
                                newY = shapeProps.y + mainHeight * 0.05;
                            else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height())
                                newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height();
                            else
                                newY = pos.y;

                            return {
                                x: newX,
                                y: newY,
                            }
                        }}
                    >
                        <Rect
                            name={"object Answer"}
                            width={shapeProps.answer.width}
                            height={shapeProps.answer.height}
                            fill={shapeProps.answer.backgroundFill}
                            cornerRadius={shapeProps.answer.cornerRadius}
                        />
                        <Text
                            name={"object Answer"}
                            text={eachAnswer.text}
                            height={shapeProps.answer.height}
                            width={shapeProps.answer.width}
                            fontSize={shapeProps.answer.fontSize}
                            fill={shapeProps.answer.textFill}
                            fontFamily={shapeProps.answer.fontFamily}
                            align={"center"}
                            verticalAlign={"middle"}

                            onDblClick={() => {
                                const textNode = answerRef.current[i].children[1];
                                const stageRef = stageStore.stageRef;

                                // hide text node and transformer:
                                textNode.hide();
                                trRef.current.visible(false);

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
                                    Test.changeAnswerText(onChange, shapeProps, eachAnswer, textarea.value);

                                    textarea.parentNode.removeChild(textarea);
                                    window.removeEventListener('click', handleOutsideClick);
                                    textNode.show();
                                    trRef.current.show();
                                    trRef.current.forceUpdate();
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

                ))}

                <Group
                    name={"object Button"}
                    draggable
                    x={shapeProps.button.x}
                    y={shapeProps.button.y}
                    width={shapeProps.button.width}
                    height={shapeProps.button.height}
                    ref={buttonRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Button') {
                            onChange({
                                ...shapeProps,
                                button: {
                                    x: e.target.x(),
                                    y: e.target.y(),
                                    text: shapeProps.button.text,
                                    height: shapeProps.button.height,
                                    width: shapeProps.button.width,
                                    backgroundFill: shapeProps.button.backgroundFill,
                                    textFill: shapeProps.button.textFill,
                                    fontSize: shapeProps.button.fontSize,
                                    cornerRadius: shapeProps.button.cornerRadius,
                                    fontFamily: shapeProps.button.fontFamily,
                                    visible: shapeProps.button.visible,
                                }
                            });
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        const ref = buttonRef.current;

                        let newX, newY;
                        if (pos.x < shapeProps.x + mainWidth * 0.1)
                            newX = shapeProps.x + mainWidth * 0.1;
                        else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width())
                            newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width();
                        else
                            newX = pos.x;

                        if (pos.y < shapeProps.y + mainHeight * 0.05)
                            newY = shapeProps.y + mainHeight * 0.05;
                        else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height())
                            newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height();
                        else
                            newY = pos.y;

                        return {
                            x: newX,
                            y: newY,
                        }
                    }}
                >
                    <Rect
                        name={"object Button"}
                        x={0}
                        y={0}
                        width={shapeProps.button.width}
                        height={shapeProps.button.height}
                        fill={shapeProps.button.backgroundFill}
                        cornerRadius={shapeProps.button.cornerRadius}
                    />
                    <Text
                        name={"object Button"}
                        x={0}
                        y={0}
                        text={shapeProps.button.text}
                        height={shapeProps.button.height}
                        width={shapeProps.button.width}
                        fontSize={shapeProps.button.fontSize}
                        fill={shapeProps.button.textFill}
                        fontFamily={shapeProps.button.fontFamily}
                        align={"center"}
                        verticalAlign={"middle"}
                    />
                </Group>

                <Text
                    draggable
                    name={"object Result"}
                    listening
                    x={shapeProps.result.x}
                    y={shapeProps.result.y}
                    text={shapeProps.result.text}
                    fill={shapeProps.result.fill}
                    fontSize={shapeProps.result.fontSize}
                    fontFamily={shapeProps.result.fontFamily}
                    ref={resultRef}

                    onDragEnd={(e) => {
                        if (e.target.name() === 'object Result') {
                            onChange({
                                ...shapeProps,
                                result: {
                                    x: e.target.x(),
                                    y: e.target.y(),
                                    text: shapeProps.result.text,
                                    fontSize: shapeProps.result.fontSize,
                                    fill: shapeProps.result.fill,
                                    fontFamily: shapeProps.result.fontFamily,
                                    visible: false,
                                },
                            });
                        }
                    }}

                    dragBoundFunc={(pos) => {
                        const ref = resultRef.current;

                        let newX, newY;
                        if (pos.x < shapeProps.x + mainWidth * 0.1)
                            newX = shapeProps.x + mainWidth * 0.1;
                        else if (pos.x > shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width())
                            newX = shapeProps.x + mainWidth * 0.1 + shapeProps.width - ref.width();
                        else
                            newX = pos.x;

                        if (pos.y < shapeProps.y + mainHeight * 0.05)
                            newY = shapeProps.y + mainHeight * 0.05;
                        else if (pos.y > shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height())
                            newY = shapeProps.y + mainHeight * 0.05 + shapeProps.height - ref.height();
                        else
                            newY = pos.y;

                        return {
                            x: newX,
                            y: newY,
                        }
                    }}
                />
            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                />
            )}
        </React.Fragment>
    );
}

export default TestElementEditor;