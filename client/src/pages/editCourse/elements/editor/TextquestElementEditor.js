import React, {useContext, useEffect, useRef} from "react";
import {Group, Rect, Text, Transformer} from "react-konva";
import {StageStoreContext} from "../../stores/stageStore";
import {useWindowDimensions} from "../../functions/Functions";

// #ToDo add dragBound
function TextquestElementEditor({shapeProps, isSelected, onSelect, onChange}) {
    const shapeRef = useRef();
    const trRef = useRef();
    const textRef = useRef();

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
                name={"Textquest"}
                onMouseDown={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                opacity={1}

                onDragEnd={(e) => {
                    if (e.target.name() === 'Textquest') {
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
                    });
                }}
            >
                {shapeProps.units.map((eachUnit, i) => (
                    <React.Fragment key={i}>
                        {shapeProps?.curUnit === eachUnit.number && (
                            <Group>
                                <Rect
                                    name={"Textquest"}
                                    width={shapeProps.width}
                                    height={shapeProps.height}
                                    fill={shapeProps.fill}
                                    cornerRadius={shapeProps.cornerRadius}
                                />


                                <Text
                                    x={eachUnit.x}
                                    y={eachUnit.y}
                                    name={'Text'}
                                    draggable
                                    ref={textRef}
                                    fill={shapeProps.text.fill}
                                    fontSize={shapeProps.text.fontSize}
                                    fontFamily={shapeProps.text.fontFamily}
                                    text={eachUnit.text}

                                    onDragEnd={(e) => {
                                        if (e.target.name() === 'Text') {
                                            const temp = shapeProps?.units.map((item) => {
                                                return item !== eachUnit ? item : {
                                                    x: e.target.x(),
                                                    y: e.target.y(),
                                                    number: eachUnit.number,
                                                    text: eachUnit.text,
                                                    buttons: eachUnit.buttons,
                                                }
                                            });

                                            onChange({
                                                ...shapeProps,
                                                units: temp,
                                            });
                                        }
                                    }}

                                    onDblClick={() => {
                                        const textNode = textRef.current;
                                        const stageRef = stageStore.stageRef;

                                        // hide text node and transformer:
                                        textNode.visible(false);
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
                                            const temp = shapeProps?.units.map((item) => {
                                                return item !== shapeProps.units[i] ? item : {
                                                    x: eachUnit.x,
                                                    y: eachUnit.y,
                                                    number: eachUnit.number,
                                                    text: textarea.value,
                                                    buttons: eachUnit.buttons,
                                                }
                                            });

                                            onChange({
                                                ...shapeProps,
                                                units: temp,
                                            });
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


                                {eachUnit.buttons?.map((eachButton, i) => (
                                    <Group
                                        name={'Var'}
                                        key={i}
                                        draggable
                                        x={eachButton.x}
                                        y={eachButton.y}

                                        dragBoundFunc={(pos) => {
                                        }}

                                        onDragEnd={(e) => {
                                            if (e.target.name() === 'Var') {
                                                const btn = eachUnit.buttons.map((item) => {
                                                    return item !== eachButton ? item : {
                                                        x: e.target.x(),
                                                        y: e.target.y(),
                                                        text: eachButton.text,
                                                        jump: eachButton.jump
                                                    }
                                                });

                                                const temp = shapeProps.units.map((item) => {
                                                    return item !== eachUnit ? item : {
                                                        x: eachUnit.x,
                                                        y: eachUnit.y,
                                                        number: eachUnit.number,
                                                        text: eachUnit.text,
                                                        buttons: btn,
                                                    }
                                                });

                                                onChange({
                                                    ...shapeProps,
                                                    units: temp,
                                                });
                                            }
                                        }}
                                    >
                                        <Rect
                                            fill={shapeProps.button.backgroundFill}
                                            width={shapeProps.button.width}
                                            height={shapeProps.button.height}
                                            cornerRadius={shapeProps.button.cornerRadius}
                                        />
                                        <Text
                                            text={eachButton.text}
                                            width={shapeProps.button.width}
                                            height={shapeProps.button.height}
                                            fill={shapeProps.button.textFill}
                                            fontSize={shapeProps.button.fontSize}
                                            fontFamily={shapeProps.button.fontFamily}
                                            align={"center"}
                                            verticalAlign={"middle"}
                                        />
                                    </Group>
                                ))}
                            </Group>
                        )}
                    </React.Fragment>
                ))}
            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                />
            )}
        </React.Fragment>
    );
}

export default TextquestElementEditor;