import React, {useContext} from "react";
import {Group} from "react-konva";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";
import {observer} from "mobx-react";
import {ElemStoreContext} from "../stores/elemStore";
import TextAndTextarea from "./common/TextAndTextarea";

function ImageSettings() {
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
                    text={"Ссылка:"}
                    attr={selectedShape.src}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.src = textarea.value;
                        const elms = elemStore.images.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setImages(elms);
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default observer(ImageSettings);