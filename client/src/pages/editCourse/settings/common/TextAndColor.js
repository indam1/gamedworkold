import {Circle, Group, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import React, {useContext, useRef} from "react";
import {StageStoreContext} from "../../stores/stageStore";

function TextAndColor(props) {
    const {sideBarWidth} = useWindowDimensions();
    const colorRef = useRef();

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
                x={sideBarWidth / 2}
                y={props.y}
            >
                <Circle
                    fill={props.attr}

                    ref={colorRef}

                    stroke={"white"}
                    strokeWidth={3}

                    x={sideBarWidth / 4}
                    y={25}
                    radius={15}

                    onClick={() => {
                        const colorNode = colorRef.current;

                        colorNode.hide();

                        var textPosition = colorNode.absolutePosition();

                        // so position of textarea will be the sum of positions above:
                        var areaPosition = {
                            x: stageRef.current.container().offsetLeft + textPosition.x,
                            y: stageRef.current.container().offsetTop + textPosition.y,
                        };

                        // create textarea and style it
                        var colorPicker = document.createElement('input');
                        colorPicker.setAttribute("type", "color");
                        document.body.appendChild(colorPicker);

                        colorPicker.value = colorNode.fill();
                        colorPicker.style.position = 'absolute';
                        colorPicker.style.top = areaPosition.y + 'px';
                        colorPicker.style.left = areaPosition.x + 'px';
                        colorPicker.style.width = colorNode.width() + 'px';
                        colorPicker.style.height = colorNode.height() + 'px';

                        function removeTextarea() {
                            colorPicker.parentNode.removeChild(colorPicker);
                            window.removeEventListener('mousedown', handleOutsideClick);

                            colorNode.show();
                        }

                        function changeAttr() {
                            props.onChange(colorPicker)
                        }

                        colorPicker.addEventListener('keydown', function (e) {
                            // hide on enter
                            if (e.keyCode === 13) {
                                changeAttr();

                                colorNode.fill(colorPicker.value);
                                removeTextarea();
                            }
                            // on esc do not set value back to node
                            if (e.keyCode === 27) {
                                removeTextarea();
                            }
                        });


                        function handleOutsideClick(e) {
                            if (e.target !== colorPicker) {
                                changeAttr();

                                colorNode.fill(colorPicker.value);
                                removeTextarea();
                            }
                        }

                        setTimeout(() => {

                            window.addEventListener('mousedown', handleOutsideClick);
                        });
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default TextAndColor;