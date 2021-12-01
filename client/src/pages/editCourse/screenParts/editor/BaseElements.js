import React, {useContext} from "react";
import {Ellipse, Group, Rect, Text} from "react-konva";
import Icon from "../../templates/Icon";
import {CounterStoreContext} from "../../stores/counterStore";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {observer} from "mobx-react";
import {ElemStoreContext} from "../../stores/elemStore";

const BaseElements = (props) => {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const counterStore = useContext(CounterStoreContext);
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);

    return (
        <React.Fragment>
            <Group // DownLeft
                x={mainWidth * 0.1}
                y={mainHeight * 0.8075}
                width={mainWidth * 0.3}
                height={mainHeight * 0.1925}
            >
                <Rect
                    fill={"#434e99"}
                    width={mainWidth * 0.3}
                    height={mainHeight * 0.1925}
                    stroke={"#434e99"}
                />
                <Text
                    width={mainWidth * 0.3}
                    height={40}
                    fontFamily={"Montserrat"}
                    text={"Базовые элементы"}
                    fill={"white"}
                    fontSize={24}
                    align={"center"}
                    verticalAlign={"middle"}
                />
                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={20}
                    y={40}
                    onClick={() => {
                        counterStore.counterText++;
                        counterStore.counterCommon++;

                        elemStore.addText({
                            counter: counterStore.counterCommon,
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            fontSize: 24,
                            text: "Something",
                            fill: "#000002",
                            id: 'text' + counterStore.counterText.toString(),
                            field: globalStore.selectedField,
                            name: 'object',
                            fontFamily: "Arial",
                        });
                    }}
                >
                    <Icon/>
                    <Text
                        width={50}
                        height={50}
                        align={"center"}
                        verticalAlign={"middle"}
                        fontSize={24}
                        text={'Т'}
                        fill={'white'}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"текст"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={85}
                    y={40}
                    onClick={() => {
                        counterStore.counterEllipse++;
                        counterStore.counterCommon++;

                        elemStore.addEllipse({
                            counter: counterStore.counterCommon,
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            radiusX: 25,
                            radiusY: 25,
                            fill: "#000002",
                            id: 'ellipse' + counterStore.counterEllipse.toString(),
                            field: globalStore.selectedField,
                            name: 'object',
                        });
                    }}
                >
                    <Icon/>
                    <Ellipse
                        x={25}
                        y={25}
                        radius={{x: 13, y: 13}}
                        fill={"white"}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"эллипс"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={150}
                    y={40}
                    onClick={() => {
                        counterStore.counterRectangle++;
                        counterStore.counterCommon++;

                        elemStore.addRectangle({
                            counter: counterStore.counterCommon,
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            width: 25,
                            height: 25,
                            fill: "#000002",
                            id: 'rectangle' + counterStore.counterRectangle.toString(),
                            field: globalStore.selectedField,
                            name: 'object',
                        });
                    }}
                >
                    <Icon/>
                    <Rect
                        x={12.5}
                        y={12.5}
                        width={25}
                        height={25}
                        fill={"white"}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"прямоугольник"}
                        fill={"white"}
                    />
                </Group>

                <Group
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    x={215}
                    y={40}
                    onClick={() => {
                        counterStore.counterImage++;
                        counterStore.counterCommon++;

                        elemStore.addImage({
                            counter: counterStore.counterCommon,
                            x: mainWidth * 0.8 / 2,
                            y: mainHeight * 0.7575 / 2,
                            width: 25,
                            height: 25,
                            fill: "#000002",
                            id: 'image' + counterStore.counterImage.toString(),
                            field: globalStore.selectedField,
                            name: 'object',
                            src: 'enter link',
                        });
                    }}
                >
                    <Icon/>
                    <Text
                        fontSize={16}
                        text={'Image'}
                        fill={'white'}
                        x={-16}
                        padding={20}
                    />
                    <Text
                        x={0}
                        y={55}
                        width={55}
                        fontFamily={"Montserrat"}
                        height={20}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={"изображение"}
                        fill={"white"}
                    />
                </Group>
            </Group>


        </React.Fragment>
    );
}

export default observer(BaseElements);