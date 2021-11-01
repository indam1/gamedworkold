import React, {useContext} from "react";
import {Group} from "react-konva";
import TextAndColor from "./common/TextAndColor";
import TextAndTextarea from "./common/TextAndTextarea";
import HeaderText from "./common/HeaderText";
import TextAndList from "./common/TextAndList";
import TextAndButton from "./common/TextAndButton";
import {useWindowDimensions} from "../functions/Functions";
import TextAndTwoButtons from "./common/TextAndTwoButtons";
import {GlobalStoreContext} from "../stores/globalStore";
import {ElemStoreContext} from "../stores/elemStore";
import {observer} from "mobx-react";

function TestSettings() {
    const {mainWidth} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

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
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 1}
                    text={"Радиус углов:"}
                    attr={selectedShape.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.cornerRadius = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
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
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
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
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 5}
                    text={"Цвет:"}
                    attr={selectedShape.theme.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.theme.fill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <HeaderText
                    text={"Вопрос:"}
                    y={10 + 50 * 6}
                />
                <TextAndTextarea
                    y={10 + 50 * 7}
                    text={"Размер шрифта:"}
                    attr={selectedShape.question.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.question.fontSize = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 8}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.question.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.question.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 9}
                    text={"Цвет:"}
                    attr={selectedShape.question.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.question.fill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <HeaderText
                    text={"Ответ:"}
                    y={10 + 50 * 10}
                />
                <TextAndTextarea
                    y={10 + 50 * 11}
                    text={"Ширина:"}
                    attr={selectedShape.answer.width}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.width = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 12}
                    text={"Высота:"}
                    attr={selectedShape.answer.height}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.height = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 13}
                    text={"Радиус углов:"}
                    attr={selectedShape.answer.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.cornerRadius = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 14}
                    text={"Цвет фона:"}
                    attr={selectedShape.answer.backgroundFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.backgroundFill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 15}
                    text={"Размер шрифта:"}
                    attr={selectedShape.answer.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.fontSize = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 16}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.answer.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 17}
                    text={"Цвет шрифта:"}
                    attr={selectedShape.answer.textFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.answer.textFill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <HeaderText
                    text={"Кнопка:"}
                    y={10 + 50 * 18}
                />
                <TextAndTextarea
                    y={10 + 50 * 19}
                    text={"Ширина:"}
                    attr={selectedShape.button.width}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.width = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 20}
                    text={"Высота:"}
                    attr={selectedShape.button.height}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.height = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 21}
                    text={"Радиус углов:"}
                    attr={selectedShape.button.cornerRadius}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.cornerRadius = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 22}
                    text={"Цвет фона:"}
                    attr={selectedShape.button.backgroundFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.backgroundFill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndTextarea
                    y={10 + 50 * 23}
                    text={"Размер шрифта:"}
                    attr={selectedShape.button.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.fontSize = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 24}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.button.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 25}
                    text={"Цвет шрифта:"}
                    attr={selectedShape.button.textFill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.button.textFill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <HeaderText
                    text={"Результат:"}
                    y={10 + 50 * 26}
                />
                <TextAndTextarea
                    y={10 + 50 * 27}
                    text={"Размер шрифта:"}
                    attr={selectedShape.result.fontSize}

                    onChange={(textarea) => {
                        const newAttrs = selectedShape;
                        newAttrs.result.fontSize = Number(textarea.value);
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndList
                    y={10 + 50 * 28}
                    text={"Семейство шрифта:"}
                    attr={selectedShape.result.fontFamily}
                    options={options}

                    onChange={(e) => {
                        const newAttrs = selectedShape;
                        newAttrs.result.fontFamily = e.currentTarget.children[1].text();
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndColor
                    y={10 + 50 * 29}
                    text={"Цвет:"}
                    attr={selectedShape.result.fill}

                    onChange={(colorPicker) => {
                        const newAttrs = selectedShape;
                        newAttrs.result.fill = colorPicker.value;
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                <TextAndButton
                    y={10 + 50 * 30}
                    text={"Добавить вопрос:"}

                    onClick={() => {
                        const newAttrs = selectedShape;
                        newAttrs.questions = [...newAttrs.questions, {
                            text: "Question",
                            answers: [
                                {
                                    text: "ответ 1",
                                },
                                {
                                    text: "ответ 2",
                                },
                                {
                                    text: "ответ 3",
                                },
                                {
                                    text: "ответ 4",
                                }],
                            result: null,
                        }];
                        const elms = elemStore.tests.slice();
                        elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                        elemStore.setTests(elms);
                    }}
                />
                {selectedShape.questions.map((eachQuestion, i) => (
                    <React.Fragment key={i}>
                        <TextAndTwoButtons
                            text={eachQuestion.text}
                            y={10 + 50 * (31 + i)}

                            onClickFirst={() => {
                                const newAttrs = selectedShape;
                                newAttrs.curQuestion = i;
                                const elms = elemStore.tests.slice();
                                elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                elemStore.setTests(elms);
                            }}
                            onClickSecond={() => {
                                const newAttrs = selectedShape;
                                newAttrs.questions = newAttrs.questions.filter(item => item !== newAttrs.questions[i]);
                                const elms = elemStore.tests.slice();
                                elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                elemStore.setTests(elms);
                            }}
                        />
                        {selectedShape.questions[i].answers.map((eachAnswer, j) => (
                            <TextAndTwoButtons key={j}
                                text={eachAnswer.text}
                                y={10 + 50 * (32 + i + j)}

                                onClickFirst={() => {
                                    const newAttrs = selectedShape;
                                    newAttrs.questions[i].result = newAttrs.questions[i].answers[j];
                                    const elms = elemStore.tests.slice();
                                    elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                    elemStore.setTests(elms);
                                }}
                                onClickSecond={() => {
                                    const newAttrs = selectedShape;
                                    newAttrs.questions[i].answers = newAttrs.questions[i].answers.filter(item => item !== newAttrs.questions[i].answers[j]);
                                    const elms = elemStore.tests.slice();
                                    elms[elms.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                    elemStore.setTests(elms);
                                }}
                            />
                        ))}
                        <TextAndButton
                            y={10 + 50 * (33 + i)}
                            text={"Добавить ответ:"}

                            onClick={() => {
                                const newAttrs = selectedShape;
                                newAttrs.questions[i].answers = [...newAttrs.questions[i].answers, {
                                    text: "Answer",
                                    x: 0,
                                    y: 0,
                                }];
                                const elms = elemStore.tests.slice();
                                elms[elms.findIndex((el) => el.id === newAttrs?.id)] = newAttrs;
                                elemStore.setTests(elms);
                            }}
                        />
                    </React.Fragment>
                ))}
            </Group>
        </React.Fragment>
    );
}
// #ToDo Fix order
export default observer(TestSettings);