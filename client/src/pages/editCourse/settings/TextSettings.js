import React, {useContext} from "react";
import {Group} from "react-konva";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import TextAndList from "./common/TextAndList";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";
import {ElemStoreContext} from "../stores/elemStore";
import {toJS} from "mobx";
import {observer} from "mobx-react";
import {StageStoreContext} from "../stores/stageStore";

function TextSettings() {
    const {mainWidth} = useWindowDimensions();
    const options = ["Cursive", "Fantasy", "Verdana", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();
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
                    text={"Размер шрифта:"}
                    attr={selectedShape.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.fontSize = Number(textarea.value);
                        const elms = elemStore.texts.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTexts(elms);
                    }}
                />
                <TextAndList
                    y={10 + 60 * 1}
                    text={"Семейство шрифта:"}
                    options={options}
                    attr={selectedShape.fontFamily}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.texts.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTexts(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 60 * 2}
                    text={"Цвет:"}
                    attr={selectedShape.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.fill = colorPicker.value;
                        const elms = elemStore.texts.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTexts(elms);
                    }}
                />

            </Group>
        </React.Fragment>
    );
}

export default observer(TextSettings);