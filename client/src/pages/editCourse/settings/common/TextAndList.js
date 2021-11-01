import {Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import React, {useContext, useRef} from "react";
import Konva from "konva";
import {StageStoreContext} from "../../stores/stageStore";

function TextAndList(props) {
    const {sideBarWidth} = useWindowDimensions();
    const fieldRef = useRef();

    const stageStore = useContext(StageStoreContext)

    const stageRef = stageStore.stageRef
    const layer = stageStore.layerRef

    return (
        <React.Fragment>
            <Text
                text={props.text}
                fontFamily={"Verdana"}
                fontSize={14}
                width={sideBarWidth / 2}
                height={60}
                y={props.y}
                fill={"white"}

                align={"center"}
                verticalAlign={"middle"}
            />
            <Text
                text={props.attr}
                fontFamily={"monospace"}
                fill={"white"}
                fontSize={14}
                width={sideBarWidth / 2}
                height={60}
                x={sideBarWidth / 2}
                y={props.y}
                ref={fieldRef}

                align={"center"}
                verticalAlign={"middle"}

                onClick={(e) => {
                    const listNode = fieldRef.current;

                    const textPosition = listNode.absolutePosition();

                    const group1 = new Konva.Group({
                        x: stageRef.current.container().offsetLeft + textPosition.x,
                        y: stageRef.current.container().offsetTop + textPosition.y,
                        width: 100,
                    })

                    for (let i = 0; i < props.options.length; i++) {
                        const group = new Konva.Group({
                            y: i * 20,
                            width: group1.width(),
                            height: 20,
                        })

                        const rect = new Konva.Rect({
                            width: group1.width(),
                            height: 20,

                            fill: "black",
                        })

                        const text = new Konva.Text({
                            width: group1.width(),
                            height: 20,

                            text: props.options[i],
                            fill: "white",

                            align: "center",
                            verticalAlign: "middle",
                        })

                        group.add(rect);
                        group.add(text);

                        function changeAttr(e) {
                            props.onChange(e)
                        }

                        group.on("click", (e) => {
                            changeAttr(e);

                            group1.visible(false);
                            group1.destroy();
                        })

                        group.on('mouseover', (e) => {
                            e.target.opacity(0.5);
                        })
                        group.on('mouseleave', (e) => {
                            e.target.opacity(1);
                        })
                        group1.add(group);
                        group1.on("mouseleave", () => {
                            group1.visible(false);
                            group1.destroy();
                        })
                    }
                    layer.current.add(group1);
                }}
            />
        </React.Fragment>
    )
}

export default TextAndList;