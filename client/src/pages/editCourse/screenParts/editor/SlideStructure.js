import React, {useContext, useRef} from "react";
import {Group, Rect, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {ElemStoreContext} from "../../stores/elemStore";
import {observer} from "mobx-react";

function SlideStructure(props) {
    const {mainWidth, mainHeight} = useWindowDimensions();

    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    const common = elemStore.allObjects;

    const HEIGHT = 3000;
    const verticalBarRef = useRef();
    const groupRef = useRef();

    return (
        <React.Fragment>
            <Group
                zIndex={0}
                ref={groupRef}
                x={0}
                y={mainHeight * 0.05}
                width={mainWidth * 0.1}
                height={HEIGHT}
            >
                <Rect
                    fill={"#182430"}
                    width={mainWidth * 0.1}
                    height={HEIGHT}
                    stroke={"#182430"}
                />
                <Text
                    text={"Структура"}
                    width={mainWidth * 0.1}
                    height={76}
                    fontFamily={"Montserrat"}
                    fill={"#FFFFFE"}
                    fontSize={24}
                    align={"center"}
                    verticalAlign={"middle"}
                />
                {common.filter(obj => obj.field === globalStore.selectedField.toString()).map((eachObject, i) => (
                    <Group
                        key={i}
                        onMouseOver={(e) => {
                            e.currentTarget.opacity(0.5);
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.opacity(1);
                        }}
                        x={mainWidth * 0.01}
                        y={mainHeight * 0.075 + i * mainHeight * 0.04}
                        onClick={() => {
                            globalStore.setSettings("")
                            globalStore.setShape(eachObject);
                            const element = eachObject.id.charAt(0).toUpperCase() + eachObject.id.replace(/[0-9]/g, '').slice(1);
                            globalStore.setSettings(element);
                        }}
                    >
                        <Rect
                            fill={"#1E2933"}
                            width={mainWidth * 0.08}
                            height={mainHeight * 0.03}
                        />
                        <Text
                            width={mainWidth * 0.08}
                            height={mainHeight * 0.03}
                            align={"center"}
                            verticalAlign={"middle"}
                            text={eachObject.id}
                            fill={"#FFFFFE"}
                            fontSize={16}
                            fontFamily={"Montserrat"}
                        />
                    </Group>
                ))}
            </Group>

            <Rect
                zIndex={1}
                ref={verticalBarRef}
                width={10}
                height={100}
                fill={'grey'}
                opacity={0.8}
                x={mainWidth * 0.1 - 15}
                y={65 + mainHeight * 0.05}
                draggable
                dragBoundFunc={function (pos) {
                    pos.x = mainWidth * 0.1 - 15;
                    pos.y = Math.max(
                        Math.min(pos.y, mainHeight * 0.475 - this.height() - 5),
                        65 + mainHeight * 0.05
                    );
                    return pos;
                }}
                onDragMove={function () {
                    // delta in %
                    const availableHeight =
                        mainHeight * 0.475 - 5 * 2 - verticalBarRef.current.height();
                    console.log(availableHeight);
                    var delta = (verticalBarRef.current.y() - 65 - mainHeight * 0.05) * 1.44 / availableHeight;
                    groupRef.current.y(mainHeight * 0.05 - (HEIGHT - mainHeight * 0.475) * delta);
                }}
            />
        </React.Fragment>
    );
}

export default observer(SlideStructure);