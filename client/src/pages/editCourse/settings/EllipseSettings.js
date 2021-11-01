import React, {useContext} from "react";
import {Group} from "react-konva";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";
import {ElemStoreContext} from "../stores/elemStore";
import {toJS} from "mobx";
import {observer} from "mobx-react";

function EllipseSettings() {
    const {mainWidth} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    const selectedShape = toJS(globalStore.selectedShape);

    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                <TextAndTextarea
                    y={10}
                    text={"Вертикальный радиус:"}
                    selectedShape={selectedShape}
                    attr={selectedShape.radiusX}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.radiusX = Number(textarea.value);
                        const elms = elemStore.ellipses.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setEllipses(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 60 * 1}
                    text={"Горизонтальный радиус:"}
                    selectedShape={selectedShape}
                    attr={selectedShape.radiusY}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.radiusY = Number(textarea.value);
                        const elms = elemStore.ellipses.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setEllipses(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет:"}
                    attr={selectedShape.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.fill = colorPicker.value;
                        const elms = elemStore.ellipses.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setEllipses(elms);
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default observer(EllipseSettings);