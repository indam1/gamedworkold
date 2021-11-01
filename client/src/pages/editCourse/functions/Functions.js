import React, {useLayoutEffect, useState} from "react";

export function useWindowDimensions() {
    const [mainWidth, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth);
    const [mainHeight, setHeight] = useState(window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight);
    const [sideBarWidth, setSideBarWidth] = useState(window.innerWidth * 0.1 || document.documentElement.clientWidth * 0.1 ||
        document.body.clientWidth * 0.1);
    const [sideBarHeight, setSideBarHeight] = useState(window.innerHeight * 0.475 || document.documentElement.clientHeight * 0.475 ||
        document.body.clientHeight * 0.475);

    const settingsHeight = 3000;

    const [paddingRight, setPaddingRight] = useState(window.innerWidth * 0.9 || document.documentElement.clientWidth * 0.9 ||
        document.body.clientWidth * 0.9);
    const [topPaddingSettings, setTopPaddingSettings] = useState(window.innerHeight * 0.05 || document.documentElement.clientHeight * 0.05 ||
        document.body.clientHeight * 0.05);

    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth);
        setHeight(window.innerHeight || document.documentElement.clientHeight ||
            document.body.clientHeight);

        setSideBarWidth(window.innerWidth * 0.1 || document.documentElement.clientWidth * 0.1 ||
            document.body.clientWidth * 0.1);
        setSideBarHeight(window.innerHeight * 0.475 || document.documentElement.clientHeight * 0.475 ||
            document.body.clientHeight * 0.475);

        setPaddingRight(window.innerWidth * 0.9 || document.documentElement.clientWidth * 0.9 ||
            document.body.clientWidth * 0.9);
        setTopPaddingSettings(window.innerHeight * 0.05 || document.documentElement.clientHeight * 0.05 ||
            document.body.clientHeight * 0.05);
    };

    useLayoutEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    return {
        mainWidth,
        mainHeight,
        settingsHeight,
        sideBarWidth,
        paddingRight,
        topPaddingSettings,
    }
}

