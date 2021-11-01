import React, {useContext} from "react";
import {Group, Image, Rect, RegularPolygon, Text} from "react-konva";
import useImage from "use-image";
import {useWindowDimensions} from "../functions/Functions";
import {GlobalStoreContext} from "../stores/globalStore";
import {observer} from "mobx-react-lite";
import {useHttp} from "../../../hooks/http.hook";
import {ElemStoreContext} from "../stores/elemStore";

const UpScreenEditor = (props) => {
    const {mainWidth, mainHeight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext)
    const {request} = useHttp();

    // #ToDo saving

    const [logoImage] = useImage("../logos/logo.png");
    const [persCabImage] = useImage("../siteImages/perscab.png");
    const [downloadImage] = useImage("../siteImages/download.png");
    const [shareImage] = useImage("../siteImages/share.png");

    const createHandler = async () => {
        try {
            const data = await request(`/api/course/update/${props.courseId}`, 'POST', {objects: elemStore.total}, {
                Authorization: `Bearer ${props.token}`
            })
            console.log(props.courseId)
            console.log(data)
            //window.location.href = "http://localhost:3000/course/" + elemStore.id;
        } catch (e) {
        }
    }

    return (
        <React.Fragment>
            <Group // Up
                width={mainWidth}
                height={mainHeight * 0.05}
            >
                <Rect
                    fill={"#000000"}
                    width={mainWidth}
                    height={mainHeight * 0.05}
                    stroke={"black"}
                />
                <Image
                    image={logoImage}
                    x={mainWidth * 0.04}
                    y={mainHeight * 0.005}
                    height={mainHeight * 0.04}
                    width={mainWidth * 0.016}
                />
                <Text
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    fill={"#FFFFFE"}
                    fontSize={14}
                    text={"Главная"}
                    fontFamily={"Montserrat"}
                    x={mainWidth * 0.12}
                />
                <Text
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    fill={"#FFFFFE"}
                    fontSize={14}
                    text={"Все курсы"}
                    fontFamily={"Montserrat"}
                    x={mainWidth * 0.24}
                />
                <Text
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    fill={"#FFFFFE"}
                    fontSize={14}
                    text={"Мои курсы"}
                    fontFamily={"Montserrat"}
                    x={mainWidth * 0.36}
                />

                {globalStore.isEditorMode && (
                    <RegularPolygon
                        onMouseOver={(e) => {
                            e.currentTarget.opacity(0.5);
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.opacity(1);
                        }}
                        rotation={90}
                        sides={3}
                        radius={20}
                        x={mainWidth / 2}
                        y={mainHeight * 0.05 / 2}
                        fill={'green'}
                        onClick={() => {
                            globalStore.setEditorMode(false);
                        }}
                    />
                )}

                {!globalStore.isEditorMode && (
                    <RegularPolygon
                        onMouseOver={(e) => {
                            e.currentTarget.opacity(0.5);
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.opacity(1);
                        }}
                        rotation={45}
                        sides={4}
                        radius={20}
                        x={mainWidth / 2}
                        y={mainHeight * 0.05 / 2}
                        fill={'red'}
                        onClick={() => {
                            globalStore.setEditorMode(true);
                        }}
                    />
                )}

                <Text
                    height={mainHeight * 0.05}
                    verticalAlign={"middle"}
                    align={"center"}
                    x={mainWidth * 0.6}
                    fill={'white'}
                    text={elemStore.name}
                    fontSize={14}
                    fontFamily={"Montserrat"}
                />

                <Image
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                    }}
                    image={downloadImage}
                    x={mainWidth * 0.7}
                    y={mainHeight * 0.005}
                    width={mainWidth * 0.028}
                    height={mainHeight * 0.04}
                />

                <Image
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={createHandler}
                    image={shareImage}
                    x={mainWidth * 0.8}
                    y={mainHeight * 0.005}
                    width={mainWidth * 0.058}
                    height={mainHeight * 0.04}
                />

                <Image
                    onMouseOver={(e) => {
                        e.currentTarget.opacity(0.5);
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.opacity(1);
                    }}
                    onClick={() => {
                        window.location.href = "http://localhost:3000/"
                    }}
                    image={persCabImage}
                    width={mainWidth * 0.022}
                    height={mainHeight * 0.04}
                    y={mainHeight * 0.005}
                    x={mainWidth * 0.94}
                />
            </Group>
        </React.Fragment>
    );
}

export default observer(UpScreenEditor);