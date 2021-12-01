import React, {useContext, useRef} from "react";
import {Group, Rect, Text} from "react-konva";
import TextSettings from "../../settings/TextSettings";
import EllipseSettings from "../../settings/EllipseSettings";
import TestSettings from "../../settings/TestSettings";
import FlashcardsSettings from "../../settings/FlashcardsSettings";
import RectangleSettings from "../../settings/RectangleSettings";
import ImageSettings from "../../settings/ImageSettings";
import TextquestSettings from "../../settings/TextquestSettings";
import {useWindowDimensions} from "../../functions/Functions";
import {GlobalStoreContext} from "../../stores/globalStore";
import {observer} from "mobx-react";

function ElementSettings(props) {
    const {mainWidth, mainHeight, topPaddingSettings, settingsHeight, sideBarWidth, paddingRight} = useWindowDimensions();
    const globalStore = useContext(GlobalStoreContext);

    const verticalBarRef = useRef();
    const groupRef = useRef();

    return (
        <React.Fragment>
            <Group // RightUp
                zIndex={0}
                ref={groupRef}
                x={paddingRight}
                y={topPaddingSettings}
                width={sideBarWidth}
                height={settingsHeight}
            >
                <Rect
                    fill={"#182430"}
                    x={0}
                    y={0}
                    width={sideBarWidth}
                    height={settingsHeight}
                    stroke={"#182430"}
                />

                <Text
                    width={sideBarWidth}
                    height={76}
                    fontFamily={"Montserrat"}
                    align={"center"}
                    verticalAlign={"middle"}
                    x={0}
                    y={0}
                    text={"Настройки"}
                    fill={"white"}
                    fontSize={24}
                />

                {globalStore.selectedSettings === 'Text' && (<TextSettings/>)}

                {globalStore.selectedSettings === 'Ellipse' && (<EllipseSettings/>)}

                {globalStore.selectedSettings === 'Rectangle' && (<RectangleSettings/>)}

                {globalStore.selectedSettings === 'Image' && (<ImageSettings/>)}

                {globalStore.selectedSettings === 'Test' && (<TestSettings/>)}

                {globalStore.selectedSettings === 'Flashcards' && (<FlashcardsSettings/>)}

                {globalStore.selectedSettings === 'Textquest' && (<TextquestSettings/>)}
            </Group>

            <Rect
                zIndex={1}
                ref={verticalBarRef}
                width={10}
                height={100}
                fill={'grey'}
                opacity={0.8}
                x={mainWidth * 1 - 5 - 10}
                y={65 + topPaddingSettings}
                draggable
                dragBoundFunc={function (pos) {
                    pos.x = mainWidth * 1 - 5 - 10;
                    pos.y = Math.max(
                        Math.min(pos.y, mainHeight * 0.475 - this.height() - 65 + topPaddingSettings),
                        65 + topPaddingSettings
                    );
                    return pos;
                }}
                onDragMove={function () {
                    // delta in %
                    const availableHeight =
                        mainHeight * 0.475 - 5 * 2 - verticalBarRef.current.height();
                    console.log(availableHeight);
                    var delta = (verticalBarRef.current.y() - 65 - topPaddingSettings) * 1.44/ availableHeight;
                    groupRef.current.y(topPaddingSettings -(settingsHeight - mainHeight * 0.475) * delta);
                }}
            />
        </React.Fragment>
    );
}

export default observer(ElementSettings);