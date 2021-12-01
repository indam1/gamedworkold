import React, {useContext} from "react";
import {Group, Rect} from "react-konva";
import EllipseElementEditor from "../../elements/editor/EllipseElementEditor";
import TextElementEditor from "../../elements/editor/TextElementEditor";
import TestElementEditor from "../../elements/editor/TestElementEditor";
import FlashcardsElementEditor from "../../elements/editor/FlashcardsElementEditor";
import RectangleElementEditor from "../../elements/editor/RectangleElementEditor";
import ImageElementEditor from "../../elements/editor/ImageElementEditor";
import TextquestElementEditor from "../../elements/editor/TextquestElementEditor";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {observer} from "mobx-react-lite";
import {ElemStoreContext} from "../../stores/elemStore";

const CenterScreenEditor = (props) => {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clicked = e.target;
        if (clicked.hasName('field')) {
            globalStore.setSettings("");
            globalStore.setShape(null);
        }
    };

    return (
        <React.Fragment>
            <Group
                x={mainWidth * 0.1}
                y={mainHeight * 0.05}
                width={mainWidth * 0.8}
                height={mainHeight * 0.7575}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
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
                {elemStore.texts.map((eachText, i) => (
                    eachText.field === globalStore.selectedField && (<TextElementEditor
                        key={i}

                        shapeProps={eachText}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachText);
                            globalStore.setSettings("Text");
                        }}

                        isSelected={eachText.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const txts = elemStore.texts.slice();
                            txts[i] = newAttrs;
                            elemStore.setTexts(txts);
                            globalStore.setShape(txts[i]);
                        }}
                    />)
                ))}

                {elemStore.ellipses.map((eachEllipse, i) => (
                    eachEllipse.field === globalStore.selectedField && (<EllipseElementEditor
                        key={i}

                        shapeProps={eachEllipse}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachEllipse);
                            globalStore.setSettings("Ellipse");
                        }}

                        isSelected={eachEllipse.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const circs = elemStore.ellipses.slice();
                            circs[i] = newAttrs;
                            elemStore.setEllipses(circs);
                            globalStore.setShape(circs[i]);
                        }}
                    />)
                ))}

                {elemStore.rectangles.map((eachRectangle, i) => (
                    eachRectangle.field === globalStore.selectedField && (<RectangleElementEditor
                        key={i}

                        shapeProps={eachRectangle}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachRectangle);
                            globalStore.setSettings("Rectangle");
                        }}

                        isSelected={eachRectangle.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const rcts = elemStore.rectangles.slice();
                            rcts[i] = newAttrs;
                            elemStore.setRectangles(rcts);
                            globalStore.setShape(rcts[i]);
                        }}
                    />)
                ))}

                {elemStore.images.map((eachImage, i) => (
                    eachImage.field === globalStore.selectedField && (<ImageElementEditor
                        key={i}

                        shapeProps={eachImage}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachImage);
                            globalStore.setSettings("Image");
                        }}

                        isSelected={eachImage.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const imgs = elemStore.images.slice();
                            imgs[i] = newAttrs;
                            elemStore.setImages(imgs);
                            globalStore.setShape(imgs[i]);
                        }}
                    />)
                ))}

                {elemStore.tests.map((eachTest, i) => (
                    eachTest.field === globalStore.selectedField && (<TestElementEditor
                        key={i}

                        shapeProps={eachTest}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachTest);
                            globalStore.setSettings("Test");
                        }}

                        isSelected={eachTest.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const tsts = elemStore.tests.slice();
                            tsts[i] = newAttrs;
                            elemStore.setTests(tsts);
                            globalStore.setShape(tsts[i]);
                        }}
                    />)
                ))}

                {elemStore.flashcards.map((eachFlashcards, i) => (
                    eachFlashcards.field === globalStore.selectedField && (<FlashcardsElementEditor
                        key={i}

                        shapeProps={eachFlashcards}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachFlashcards)
                            globalStore.setSettings("Flashcards")
                        }}

                        isSelected={eachFlashcards.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const flcs = elemStore.flashcards.slice();
                            flcs[i] = newAttrs;
                            elemStore.setFlashcards(flcs);
                            globalStore.setShape(flcs[i]);
                        }}
                    />)
                ))}

                {elemStore.textquests.map((eachTextquest, i) => (
                    eachTextquest.field === globalStore.selectedField && (<TextquestElementEditor
                        key={i}

                        shapeProps={eachTextquest}

                        onSelect={() => {
                            globalStore.setSettings("");
                            globalStore.setShape(eachTextquest)
                            globalStore.setSettings("Textquest")
                        }}

                        isSelected={eachTextquest.id === globalStore.selectedShape?.id}

                        onChange={(newAttrs) => {
                            const tqts = elemStore.textquests.slice();
                            tqts[i] = newAttrs;
                            elemStore.setTextquests(tqts);
                            globalStore.setShape(tqts[i]);
                        }}
                    />)
                ))}
            </Group>
        </React.Fragment>

    );
}

export default observer(CenterScreenEditor);