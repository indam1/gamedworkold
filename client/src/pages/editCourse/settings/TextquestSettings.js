import React, {useContext} from "react";
import {Group} from "react-konva";
import {Html} from "react-konva-utils";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";
import TextAndColor from "./common/TextAndColor";
import {ElemStoreContext} from "../stores/elemStore";
import TextAndButton from "./common/TextAndButton";
import TextAndTwoButtons from "./common/TextAndTwoButtons";
import {observer} from "mobx-react";
import TextAndTextarea from "./common/TextAndTextarea";
import TextAndList from "./common/TextAndList";
import HeaderText from "./common/HeaderText";

function TextquestSettings(props) {
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    const options = ["Cursive", "Fantasy", "Montserrat", "Arial", "Helvetica", "Gill Sans", "Lucida", "Helvetica Narrow", "Times", "Times New Roman", "Palatino", "Bookman", "New Century Schoolbook", "Andale Mono", "Courier New", "Courier", "Lucidatypewriter", "Fixed", "Comic Sans", "Comic Sans MS", "Zapf Chancery", "Coronetscript", "Florence", "Parkavenue", "Impact", "Arnoldboecklin", "Oldtown", "Blippo", "Brushstroke"].sort();

    const selectedShape = globalStore.selectedShape;
    const {mainWidth} = useWindowDimensions();
    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                <TextAndColor
                    y={10}
                    text={"Цвет фона:"}
                    attr={selectedShape.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.fill = colorPicker.value;
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 1}
                    text={"Радиус углов:"}
                    attr={selectedShape.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.cornerRadius = Number(textarea.value);
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <HeaderText
                    text={"Текст:"}
                    y={10 + 50 * 2}
                />
                <TextAndTextarea
                    y={10 + 50 * 3}
                    text={"Размер шрифта:"}
                    attr={selectedShape.text.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.text.fontSize = Number(textarea.value);
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 4}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.text.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.text.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 5}
                    text={"Цвет:"}
                    attr={selectedShape.text.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.text.fill = colorPicker.value;
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <HeaderText
                    text={"Кнопка:"}
                    y={10 + 50 * 6}
                />
                <TextAndTextarea
                    y={10 + 50 * 7}
                    text={"Ширина:"}
                    attr={selectedShape.button.width}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.width = Number(textarea.value);
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 8}
                    text={"Высота:"}
                    attr={selectedShape.button.height}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.height = Number(textarea.value);
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 9}
                    text={"Радиус углов:"}
                    attr={selectedShape.button.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.cornerRadius = Number(textarea.value);
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 10}
                    text={"Цвет фона:"}
                    attr={selectedShape.button.backgroundFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.backgroundFill = colorPicker.value;
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 11}
                    text={"Размер шрифта:"}
                    attr={selectedShape.button.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.fontSize = Number(textarea.value);
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 12}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.button.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 13}
                    text={"Цвет шрифта:"}
                    attr={selectedShape.button.textFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.textFill = colorPicker.value;
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />
                <TextAndButton
                    y={10 + 50 * 14}
                    text={"Добавить юнит:"}

                    onClick={() => {
                        const newAttrs = selectedShape;
                        newAttrs.units = [...newAttrs.units, {
                            x: 0,
                            y: 0,
                            number: 0,
                            text: "Текст",
                            buttons: [
                                {
                                    x: 30,
                                    y: 106,
                                    text: 'действие 1',
                                    jump: 1,
                                },
                                {
                                    x: 30,
                                    y: 162,
                                    text: 'действие 2',
                                    jump: 1,
                                }
                            ],
                        }];
                        const elms = elemStore.textquests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTextquests(elms);
                    }}
                />

                {selectedShape.units.map((eachUnit, i) => (
                    <React.Fragment key={i}>
                        <TextAndTwoButtons
                            text={eachUnit.text}
                            y={10 + 50 * (15 + i * 2)}

                            onClickFirst={() => {
                                const newAttrs = selectedShape;
                                newAttrs.curUnit = eachUnit.number;
                                const elms = elemStore.textquests.slice();
                                elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                elemStore.setTextquests(elms);
                            }}

                            onClickSecond={() => {
                                const newAttrs = selectedShape;
                                newAttrs.units = newAttrs.units.filter(item => item !== newAttrs.units[i]);
                                const elms = elemStore.textquests.slice();
                                elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                elemStore.setTextquests(elms);
                            }}
                        />
                        <TextAndTextarea
                            y={10 + 50 * (16 + i * 2)}
                            text={"Номер юнита: "}
                            attr={eachUnit.number}

                            onChange={(textarea) => {
                                const newAttrs = selectedShape;
                                newAttrs.units[i].number = Number(textarea.value);
                                const elms = elemStore.textquests.slice();
                                elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                elemStore.setTextquests(elms);
                            }}
                        />
                        <TextAndButton
                            text={"Добавить кнопку: "}
                            y={10 + 50 * (17 + i * 2)}

                            onClick={() => {
                                const newAttrs = selectedShape;
                                newAttrs.units[i].buttons = [...newAttrs.units[i].buttons, {
                                    x: 30,
                                    y: 106,
                                    text: 'действие 1',
                                    jump: 1,
                                }];
                                const elms = elemStore.textquests.slice();
                                elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                elemStore.setTextquests(elms);
                            }}
                        />
                        {eachUnit.buttons.map((eachButton, j) => (
                            <React.Fragment key={j}>
                                <TextAndButton
                                    text={eachButton.text}
                                    y={10 + 50 * (18 + i * 2 + j * 2)}

                                    onClick={() => {
                                        const newAttrs = selectedShape;
                                        newAttrs.units[i].buttons = newAttrs.units[i].buttons.filter(item => item !== newAttrs.units[i].buttons[j]);
                                        const elms = elemStore.textquests.slice();
                                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                        elemStore.setTextquests(elms);
                                    }}
                                />
                                <TextAndTextarea
                                    y={10 + 50 * (19 + i * 2 + j * 2)}
                                    text={"Прыжок на юнит: "}
                                    attr={eachButton.jump}

                                    onChange={(textarea) => {
                                        const newAttrs = selectedShape;
                                        newAttrs.units[i].buttons[j].jump = Number(textarea.value);
                                        const elms = elemStore.textquests.slice();
                                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                        elemStore.setTextquests(elms);
                                    }}
                                />
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </Group>
        </React.Fragment>
    );
}

export default observer(TextquestSettings);