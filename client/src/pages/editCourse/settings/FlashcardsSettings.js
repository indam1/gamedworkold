import React, {useContext} from "react";
import {Group} from "react-konva";
import {useWindowDimensions} from "../functions/Functions";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import HeaderText from "./common/HeaderText";
import TextAndList from "./common/TextAndList";
import TextAndButton from "./common/TextAndButton";
import TwoTextareasAndButton from "./common/TwoTextaresAndButton";
import {ElemStoreContext} from "../stores/elemStore";
import {GlobalStoreContext} from "../stores/globalStore";
import {observer} from "mobx-react";

function FlashcardsSettings() {
    const {mainWidth} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext)

    const selectedShape = globalStore.selectedShape;

    const options = ["Cursive", "Fantasy", "Montserrat", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();

    return (
        <React.Fragment>
            <Group
                x={0}
                y={50}
                width={mainWidth * 0.1 - 16}
            >
                <TextAndColor
                    y={10}
                    text={"Цвет фона:"}
                    attr={selectedShape.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.fill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 1}
                    text={"Радиус углов:"}
                    attr={selectedShape.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.cornerRadius = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <HeaderText
                    text={"Тема:"}
                    y={10 + 50 * 2}
                />
                <TextAndTextarea
                    y={10 + 50 * 3}
                    text={"Размер шрифта:"}
                    attr={selectedShape.theme.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.theme.fontSize = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 4}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.theme.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.theme.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 5}
                    text={"Цвет:"}
                    attr={selectedShape.theme.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.theme.fill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <HeaderText
                    text={"Слово:"}
                    y={10 + 50 * 6}
                />
                <TextAndTextarea
                    y={10 + 50 * 7}
                    text={"Размер шрифта:"}
                    attr={selectedShape.word.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.word.fontSize = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 8}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.word.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.word.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 9}
                    text={"Цвет:"}
                    attr={selectedShape.word.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.word.fill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <HeaderText
                    text={"Значение:"}
                    y={10 + 50 * 10}
                />
                <TextAndTextarea
                    y={10 + 50 * 11}
                    text={"Размер шрифта:"}
                    attr={selectedShape.meaning.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.meaning.fontSize = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 12}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.meaning.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.meaning.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 13}
                    text={"Цвет:"}
                    attr={selectedShape.meaning.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.meaning.fill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <HeaderText
                    text={"Кнопка:"}
                    y={10 + 50 * 14}
                />
                <TextAndTextarea
                    y={10 + 50 * 15}
                    text={"Ширина:"}
                    attr={selectedShape.button.width}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.width = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 16}
                    text={"Высота:"}
                    attr={selectedShape.button.height}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.height = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 17}
                    text={"Радиус углов:"}
                    attr={selectedShape.button.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.cornerRadius = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 18}
                    text={"Цвет фона:"}
                    attr={selectedShape.button.backgroundFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.backgroundFill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 19}
                    text={"Размер шрифта:"}
                    attr={selectedShape.button.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.fontSize = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 20}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.button.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 21}
                    text={"Цвет шрифта:"}
                    attr={selectedShape.button.textFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.textFill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <HeaderText
                    text={"Результат:"}
                    y={10 + 50 * 22}
                />
                <TextAndTextarea
                    y={10 + 50 * 23}
                    text={"Размер шрифта:"}
                    attr={selectedShape.result.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.result.fontSize = Number(textarea.value);
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 24}
                    text={"Семейство шрифта:"}
                    options={options}
                    attr={selectedShape.result.fontFamily}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.result.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 25}
                    text={"Цвет:"}
                    attr={selectedShape.result.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.result.fill = colorPicker.value;
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                <TextAndButton
                    y={10 + 50 * 26}
                    text={"Добавить пару:"}
                    onClick={() => {
                        const newAttrs = selectedShape;
                        newAttrs.pairs = [...newAttrs.pairs, {
                            word: "",
                            meaning: "",
                            size: 30,
                            textFill: "white",
                        }];
                        const elms = elemStore.flashcards.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setFlashcards(elms);
                    }}
                />
                {selectedShape.pairs.map((eachPair, i) => (
                    <TwoTextareasAndButton
                        y={10 + 50 * (27 + i)}
                        attrFirst={selectedShape.pairs[i].word}
                        attrSecond={selectedShape.pairs[i].meaning}
                        index={i}
                        onClick={() => {
                            const newAttrs = selectedShape;
                            newAttrs.pairs = newAttrs.pairs.filter(item => item !== newAttrs.pairs[i]);
                            const elms = elemStore.flashcards.slice();
                            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                            elemStore.setFlashcards(elms);
                        }}

                        onFirstChange={(textarea) => {
                            const newAttrs = selectedShape;
                            newAttrs.pairs[i].word = textarea.value;
                            const elms = elemStore.flashcards.slice();
                            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                            elemStore.setFlashcards(elms);
                        }}

                        onSecondChange={(textarea) => {
                            const newAttrs = selectedShape;
                            newAttrs.pairs[i].meaning = textarea.value;
                            const elms = elemStore.flashcards.slice();
                            elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                            elemStore.setFlashcards(elms);
                        }}
                    />
                ))}
            </Group>
        </React.Fragment>
    );
}

export default observer(FlashcardsSettings);