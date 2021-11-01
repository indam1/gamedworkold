import {Group, Rect, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import React, {useContext, useRef} from "react";
import {GlobalStoreContext} from "../../stores/globalStore";
import {StageStoreContext} from "../../stores/stageStore";

function TextAndTextarea(props) {
    const {sideBarWidth} = useWindowDimensions();
    const fieldRef = useRef();
    const globalStore = useContext(GlobalStoreContext);
    const stageStore = useContext(StageStoreContext)

    const stageRef = stageStore.stageRef

    return (
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={sideBarWidth / 2}
                y={props.y}
                height={60}
                fill={"white"}

                align={"center"}
                verticalAlign={"middle"}
            />
            <Group
                width={sideBarWidth / 2}
                height={60}
                y={props.y}
                x={sideBarWidth / 2}
            >
                <Rect
                    width={sideBarWidth / 4}
                    height={30}

                    x={sideBarWidth / 8}
                    y={15}

                    cornerRadius={5}

                    stroke={"white"}
                    strokeWidth={3}

                    fill={"grey"}
                />
                <Text
                    text={props.attr}
                    fontFamily={"monospace"}
                    fill={"white"}
                    fontSize={14}
                    width={sideBarWidth / 2}
                    height={60}
                    ref={fieldRef}

                    align={"center"}
                    verticalAlign={"middle"}

                    onClick={() => {
                        const textNode = fieldRef.current;

                        textNode.hide();

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
                        textarea.style.top = areaPosition.y + textNode.height() / 2 + 'px';
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
                        textarea.maxLength = 4;
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

                        const newAttrs = globalStore.selectedShape;

                        function changeAttr() {
                            props.onChange(textarea);
                        }

                        function removeTextarea() {
                            textarea.parentNode.removeChild(textarea);
                            window.removeEventListener('mousedown', handleOutsideClick);
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
                                changeAttr();

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
                                changeAttr();

                                textNode.text(textarea.value);
                                removeTextarea();
                            }
                        }

                        setTimeout(() => {
                            window.addEventListener('mousedown', handleOutsideClick);
                        });
                    }}
                />
            </Group>
        </React.Fragment>)
}

export default TextAndTextarea;