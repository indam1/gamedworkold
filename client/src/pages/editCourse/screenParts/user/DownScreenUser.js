import React, {useContext} from "react";
import {Group, Rect, Text} from "react-konva";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {observer} from "mobx-react";

function DownScreenUser(props) {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);

    return (
        <React.Fragment>
            <Group // Down
                x={mainWidth * 0.1}
                y={mainHeight * 0.8075}
                width={mainWidth * 0.9}
                height={mainHeight * 0.1925}
            >
                <Rect
                    fill={"#434e99"}
                    width={mainWidth * 0.8}
                    height={mainHeight * 0.1925}
                    stroke={"#434e99"}
                />
                <Text
                    width={mainWidth * 0.8}
                    height={40}
                    align={"center"}
                    verticalAlign={"middle"}
                    text={"Нижний интерфейс пользователя"}
                    fill={"white"}
                    fontSize={30}
                    fontFamily={"Montserrat"}
                />
                <Text
                    width={mainWidth * 0.8}
                    height={150}
                    align={"center"}
                    verticalAlign={"middle"}
                    text={globalStore.selectedField.toString()}
                    fill={"white"}
                    fontSize={30}
                    fontFamily={"Montserrat"}
                />
                <Rect
                    fill={"#FFFFFE"}
                    width={50}
                    height={50}
                    x={50}
                    y={50}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        globalStore.setField(globalStore.selectedField - 1);
                    }}
                />

                <Rect
                    fill={"#FFFFFE"}
                    width={50}
                    height={50}
                    x={mainWidth * 0.8 - 100}
                    y={50}
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        globalStore.setField(globalStore.selectedField + 1);
                    }}
                />
            </Group>
        </React.Fragment>
    );
}

export default observer(DownScreenUser);