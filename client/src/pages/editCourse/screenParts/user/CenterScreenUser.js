import React, {useContext} from "react";
import {Group, Rect} from "react-konva";
import EllipseElementUser from "../../elements/user/EllipseElementUser";
import TextElementUser from "../../elements/user/TextElementUser";
import TestElementUser from "../../elements/user/TestElementUser";
import FlashcardsElementUser from "../../elements/user/FlashcardsElementUser";
import RectangleElementUser from "../../elements/user/RectangleElementUser";
import ImageElementUser from "../../elements/user/ImageElementUser";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {ElemStoreContext} from "../../stores/elemStore";
import {observer} from "mobx-react";
import TextquestElementUser from "../../elements/user/TextquestElementUser";

function CenterScreenUser(props) {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    return (
        <React.Fragment>
            <Group
                x={mainWidth * 0.1}
                y={mainHeight * 0.05}
                width={mainWidth * 0.8}
                height={mainHeight * 0.7575}
            >
                <Rect
                    name={"field"}
                    fill={"#f2f2f2"}
                    x={0}
                    y={0}
                    width={mainWidth * 0.8}
                    height={mainHeight * 0.7575}
                    stroke={"#f2f2f2"}
                />
                {elemStore.ellipses.map((eachEllipse, i) => (
                    eachEllipse.field === globalStore.selectedField && (<EllipseElementUser
                        key={i}
                        shapeProps={eachEllipse}
                    />)
                ))}

                {elemStore.texts.map((eachText, i) => (
                    eachText.field === globalStore.selectedField && (<TextElementUser
                        key={i}
                        shapeProps={eachText}
                    />)
                ))}

                {elemStore.tests.map((eachTest, i) => (
                    eachTest.field === globalStore.selectedField && (<TestElementUser
                        key={i}
                        shapeProps={eachTest}
                        onChange={(newAttrs) => {
                            const tsts = elemStore.tests.slice();
                            tsts[i] = newAttrs;
                            elemStore.setTests(tsts);
                        }}
                    />)
                ))}

                {elemStore.flashcards.map((eachFlashcards, i) => (
                    eachFlashcards.field === globalStore.selectedField && (<FlashcardsElementUser
                        key={i}
                        shapeProps={eachFlashcards}
                        onChange={(newAttrs) => {
                            const flcs = elemStore.flashcards.slice();
                            flcs[i] = newAttrs;
                            elemStore.setFlashcards(flcs);
                        }}
                    />)
                ))}

                {elemStore.rectangles.map((eachRectangle, i) => (
                    eachRectangle.field === globalStore.selectedField && (<RectangleElementUser
                        key={i}
                        shapeProps={eachRectangle}
                    />)
                ))}

                {elemStore.images.map((eachImage, i) => (
                    eachImage.field === globalStore.selectedField && (<ImageElementUser
                        key={i}
                        shapeProps={eachImage}
                    />)
                ))}

                {elemStore.textquests.map((eachTextquest, i) => (
                    eachTextquest.field === globalStore.selectedField && (<TextquestElementUser
                        key={i}
                        shapeProps={eachTextquest}
                        onChange={(newAttrs) => {
                            const tqts = elemStore.textquests.slice();
                            tqts[i] = newAttrs;
                            elemStore.setTextquests(tqts);
                        }}
                    />)
                ))}
            </Group>
        </React.Fragment>

    );
}

export default observer(CenterScreenUser);