import React, {useContext, useRef} from "react";
import {Group} from "react-konva";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";
import {observer} from "mobx-react";
import {ElemStoreContext} from "../stores/elemStore";

function RectangleSettings() {
    const {mainWidth} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    const selectedShape = globalStore.selectedShape;

    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                <TextAndTextarea
                    y={10}
                    text={"Ширина:"}
                    attr={selectedShape.width}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.width = Number(textarea.value);
                        const elms = elemStore.rectangles.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setRectangles(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 60 * 1}
                    text={"Высота:"}
                    attr={selectedShape.height}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.height = Number(textarea.value);
                        const elms = elemStore.rectangles.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setRectangles(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет:"}
                    attr={selectedShape.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.fill = colorPicker.value;
                        const elms = elemStore.rectangles.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setRectangles(elms);
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default observer(RectangleSettings);