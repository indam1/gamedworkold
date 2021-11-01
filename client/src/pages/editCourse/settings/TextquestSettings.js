import React, {useContext} from "react";
import {Group} from "react-konva";
import {Html} from "react-konva-utils";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";

function TextquestSettings(props) {
    const globalStore = useContext(GlobalStoreContext);

    const selectedShape = globalStore.selectedShape;
    const textquests = props.getElem.get('textquest');
    const setTextquests = props.setElem.get('textquest');
    const {mainWidth} = useWindowDimensions();
    return (
        <React.Fragment>
            <Group
                x={0}
                y={60}
                width={mainWidth * 0.1 - 16}
            >
                <Html>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            width: mainWidth * 0.05 - 8,
                            textAlign: 'center',
                        }}>
                            <p style={{
                                fontFamily: "Montserrat",
                                fontSize: 14,
                                color: "white",
                            }}>Цвет фона:</p>
                        </div>
                        <div style={{
                            width: mainWidth * 0.05 - 8,
                            textAlign: 'center',
                        }}>
                            <input style={{
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                verticalAlign: "middle",
                                backgroundColor: "#313c45",
                                resize: "none",
                                fontSize: 14,
                                textAlign: "center",
                                border: "none",
                                outline: "none",
                            }} onChange={(e) => {
                                const newAttrs = selectedShape;
                                newAttrs.fill = e.target.value;
                                const tqts = textquests.slice();
                                tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                setTextquests(tqts);
                            }} type={"color"} value={selectedShape?.fill}/>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <div style={{
                            width: mainWidth * 0.05 - 8,
                            textAlign: 'center',
                        }}>
                            <p style={{
                                fontFamily: "Montserrat",
                                fontSize: 14,
                                color: "white",
                            }}>Добавить юнит:</p>
                        </div>
                        <div style={{
                            width: mainWidth * 0.05 - 8,
                            textAlign: 'center',
                        }}>
                            <input style={{
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                backgroundColor: "#313c45",
                                resize: "none",
                                fontSize: 20,
                                textAlign: "center",
                                color: "white"
                            }} type={"button"} onClick={() => {
                                const newAttrs = selectedShape;
                                newAttrs.units = [...newAttrs.units, {
                                    number: 1,
                                    text: "Text",
                                    buttons: [],
                                    x: 0,
                                    y: 0,
                                    backgroundFill: "blue",
                                    width: 100,
                                    height: 100,
                                    size: 30,
                                    textFill: "white",
                                }];
                                const tqts = textquests.slice();
                                tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                setTextquests(tqts);
                            }} value={'+'}/>
                        </div>
                    </div>

                    {selectedShape?.units?.map((eachText, i) => (
                        <div>
                            <div key={i} style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>

                                <div style={{
                                    width: mainWidth * 0.033 - 5,
                                    textAlign: 'center',
                                }}>
                                    <p style={{
                                        fontFamily: "Montserrat",
                                        fontSize: 14,
                                        color: "white",
                                    }}>{selectedShape?.units[i].number}:</p>
                                </div>

                                <div style={{
                                    width: mainWidth * 0.033 - 5,
                                    textAlign: 'center',
                                }}>
                                    <input style={{
                                        height: 30,
                                        borderRadius: 5,
                                        backgroundColor: "#313c45",
                                        resize: "none",
                                        fontSize: 20,
                                        textAlign: "center",
                                        color: "white"
                                    }} type={"button"} onClick={() => {
                                        const newAttrs = selectedShape;
                                        newAttrs.curText = i;
                                        const tqts = textquests.slice();
                                        tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                        setTextquests(tqts);
                                    }} value={'choose'}/>
                                </div>

                                <div style={{
                                    width: mainWidth * 0.033 - 5,
                                    textAlign: 'center',
                                }}>
                                    <input style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 5,
                                        backgroundColor: "#313c45",
                                        resize: "none",
                                        fontSize: 20,
                                        textAlign: "center",
                                        color: "white"
                                    }} type={"button"} onClick={() => {
                                        const newAttrs = selectedShape;
                                        newAttrs.units = newAttrs.units.filter(item => item !== newAttrs.units[i]);
                                        const tqts = textquests.slice();
                                        tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                        setTextquests(tqts);
                                    }} value={'-'}/>
                                </div>
                            </div>

                            {selectedShape?.curText === i && (<div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <div style={{
                                            width: mainWidth * 0.05 - 8,
                                            textAlign: 'center',
                                        }}>
                                            <p style={{
                                                fontFamily: "Montserrat",
                                                fontSize: 14,
                                                color: "white",
                                            }}>Добавить кнопку</p>
                                        </div>

                                        <div style={{
                                            width: mainWidth * 0.05 - 8,
                                            textAlign: 'center',
                                        }}>
                                            <input style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: 5,
                                                backgroundColor: "#313c45",
                                                resize: "none",
                                                fontSize: 20,
                                                textAlign: "center",
                                                color: "white"
                                            }} type={"button"} onClick={() => {
                                                const newAttrs = selectedShape;
                                                newAttrs.units[i].buttons = [...newAttrs.units[i].buttons, {
                                                    number: 1,
                                                    text: "Answer",
                                                    jump: 0,
                                                }];
                                                const tqts = textquests.slice();
                                                tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                                setTextquests(tqts);
                                            }} value={'+'}/>
                                        </div>
                                    </div>

                                    {selectedShape?.units[i].buttons.map((eachButton, j) => (
                                        <div
                                            key={j}
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <div style={{
                                                width: mainWidth * 0.033 - 5,
                                                textAlign: 'center',
                                            }}>
                                                <p style={{
                                                    fontFamily: "Montserrat",
                                                    fontSize: 14,
                                                    color: "white",
                                                }}>{selectedShape?.units[i].buttons[j].number}:</p>
                                            </div>

                                            <div style={{
                                                width: mainWidth * 0.033 - 5,
                                                textAlign: 'center',
                                            }}>
                                                <textarea style={{
                                                    overflow: "hidden",
                                                    borderRadius: 5,
                                                    verticalAlign: "middle",
                                                    width: 25,
                                                    height: 20,
                                                    backgroundColor: "#313c45",
                                                    color: "white",
                                                    resize: "none",
                                                    fontSize: 14,
                                                    textAlign: "center",
                                                    border: "none",
                                                    outline: "none",
                                                }} onChange={(e) => {
                                                    const newAttrs = selectedShape;
                                                    newAttrs.units[i].buttons[j].jump = Number(e.target.value);
                                                    const tqts = textquests.slice();
                                                    tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                                    setTextquests(tqts);
                                                }} value={selectedShape?.units[i].buttons[j].jump} maxLength={3} rows={1} cols={3}/>
                                            </div>

                                            <div style={{
                                                width: mainWidth * 0.033 - 5,
                                                textAlign: 'center',
                                            }}>
                                                <input style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 5,
                                                    backgroundColor: "#313c45",
                                                    resize: "none",
                                                    fontSize: 20,
                                                    textAlign: "center",
                                                    color: "white"
                                                }} type={"button"} onClick={() => {
                                                    const newAttrs = selectedShape;
                                                    newAttrs.units[i].buttons = newAttrs.units[i].buttons.filter(item => item !== newAttrs.units[i].buttons[j]);
                                                    const tqts = textquests.slice();
                                                    tqts[tqts.findIndex((el) => el.id === selectedShape?.id)] = newAttrs;
                                                    setTextquests(tqts);
                                                }} value={'-'}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </Html>
            </Group>
        </React.Fragment>
    );
}

export default TextquestSettings;