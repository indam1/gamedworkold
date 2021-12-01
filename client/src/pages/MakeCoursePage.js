import {Layer, Stage} from "react-konva";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import SlideStructure from "./editCourse/screenParts/editor/SlideStructure";
import LessonStructure from "./editCourse/screenParts/editor/LessonStructure";
import GameElements from "./editCourse/screenParts/editor/GameElements";
import ElementSettings from "./editCourse/screenParts/editor/ElementSettings";
import DownScreenUser from "./editCourse/screenParts/user/DownScreenUser";
import LeftScreenUser from "./editCourse/screenParts/user/LeftScreenUser";
import RightScreenUser from "./editCourse/screenParts/user/RightScreenUser";
import CenterScreenUser from "./editCourse/screenParts/user/CenterScreenUser";
import Konva from "konva";
import {Templates} from "./editCourse/screenParts/editor/Templates";
import {useWindowDimensions} from "./editCourse/functions/Functions";
import {GlobalStoreContext} from "./editCourse/stores/globalStore";
import {observer} from "mobx-react-lite";
import {ElemStoreContext} from "./editCourse/stores/elemStore";
import CenterScreenEditor from "./editCourse/screenParts/editor/CenterScreenEditor";
import BaseElements from "./editCourse/screenParts/editor/BaseElements";
import UpScreenEditor from "./editCourse/screenParts/UpScreenEditor";
import {toJS} from "mobx";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {StageStoreContext} from "./editCourse/stores/stageStore";

const MakeCoursePage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const courseId = useParams().id
    const history = useHistory()

    const getCourse = useCallback(async () => {
        try {
            const fetched = await request(`/api/course/create/${courseId}`, 'POST', null, {
                Authorization: `Bearer ${token}`
            })

            elemStore.setId(fetched.course._id)
            elemStore.setCourse(fetched.course.objects)
            elemStore.setName(fetched.course.name)
        } catch (e) {
            history.push("/")
        }
    }, [token, courseId, request])

    useEffect(() => {
        getCourse()
    }, [getCourse])

    const stageRef = useRef(null);
    const layerRef = useRef(null);

    const {mainWidth, mainHeight} = useWindowDimensions();
    const auth = useContext(AuthContext)
    const globalStore = useContext(GlobalStoreContext);
    const elemStore = useContext(ElemStoreContext);
    const stageStore = useContext(StageStoreContext);

    useEffect(() => {
        stageStore.setStage(stageRef)
        stageStore.setLayerRef(layerRef)
        return () => {
            stageStore.setStage(null)
            stageStore.setLayerRef(null)
        }
    })

    const checkRemove = (e) => {
        if (globalStore.selectedShape != null && e.keyCode === 46) {
            const element = globalStore.selectedShape.id.replace(/[0-9]/g, '');

            if (element === "text") {
                const elms = toJS(elemStore.texts).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setTexts(elms);
            } else if (element === "rectangle") {
                const elms = toJS(elemStore.rectangles).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setRectangles(elms);
            } else if (element === "ellipse") {
                const elms = toJS(elemStore.ellipses).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setEllipses(elms);
            } else if (element === "image") {
                const elms = toJS(elemStore.images).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setImages(elms);
            } else if (element === "test") {
                const elms = toJS(elemStore.tests).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setTests(elms);
            } else if (element === "flashcards") {
                const elms = toJS(elemStore.flashcards).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setFlashcards(elms);
            } else if (element === "textquest") {
                const elms = toJS(elemStore.textquests).filter(item => globalStore.selectedShape.id !== item.id);
                elemStore.setTextquests(elms);
            }
            //#ToDo addRemove

            globalStore.setSettings("");
            globalStore.setShape(null);
        }
    };

    function getLineGuideStops(skipShape) {
        // we can snap to stage borders and the center of the stage
        const vertical = [mainWidth * 0.1 + 1, mainWidth * 0.5, mainWidth * 0.9 - 1];
        const horizontal = [mainHeight * 0.05 + 1, mainHeight * 0.42875, mainHeight * 0.8075 - 1];

        // and we snap over edges and center of each object on the canvas
        stageRef.current.find('.object').forEach((guideItem) => {
            if (guideItem.id() !== skipShape.id()) {
                const box = guideItem.getClientRect();
                // and we can snap to all edges of shapes
                vertical.push(box.x, box.x + box.width / 2, box.x + box.width);
                horizontal.push(box.y, box.y + box.height / 2, box.y + box.height);
            }
        });
        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    }

    // what points of the object will trigger to snapping?
    // it can be just center of the object
    // but we will enable all edges and center
    function getObjectSnappingEdges(node) {

        const box = node.getClientRect();
        const absPos = node.absolutePosition();

        return {
            vertical: [
                {
                    guide: Math.round(box.x),
                    offset: Math.round(absPos.x - box.x),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.x + box.width / 2),
                    offset: Math.round(absPos.x - box.x - box.width / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.x + box.width),
                    offset: Math.round(absPos.x - box.x - box.width),
                    snap: 'end',
                },
            ],
            horizontal: [
                {
                    guide: Math.round(box.y),
                    offset: Math.round(absPos.y - box.y),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.y + box.height / 2),
                    offset: Math.round(absPos.y - box.y - box.height / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.y + box.height),
                    offset: Math.round(absPos.y - box.y - box.height),
                    snap: 'end',
                },
            ],
        };
    }

    // find all snapping possibilities
    function getGuides(lineGuideStops, itemBounds) {
        const resultV = [];
        const resultH = [];

        lineGuideStops.vertical.forEach((lineGuide) => {
            itemBounds.vertical.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                // if the distance between guild line and object snap point is close we can consider this for snapping
                if (diff < 5) {
                    resultV.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        lineGuideStops.horizontal.forEach((lineGuide) => {
            itemBounds.horizontal.forEach((itemBound) => {
                const diff = Math.abs(lineGuide - itemBound.guide);
                if (diff < 5) {
                    resultH.push({
                        lineGuide: lineGuide,
                        diff: diff,
                        snap: itemBound.snap,
                        offset: itemBound.offset,
                    });
                }
            });
        });

        const guides = [];

        // find closest snap
        const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
        const minH = resultH.sort((a, b) => a.diff - b.diff)[0];
        if (minV) {
            guides.push({
                lineGuide: minV.lineGuide,
                offset: minV.offset,
                orientation: 'V',
                snap: minV.snap,
            });
        }
        if (minH) {
            guides.push({
                lineGuide: minH.lineGuide,
                offset: minH.offset,
                orientation: 'H',
                snap: minH.snap,
            });
        }
        return guides;
    }

    function drawGuides(guides) {
        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                const line = new Konva.Line({
                    points: [mainWidth * 0.1 + 1, 0, mainWidth * 0.9 - 1, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 2,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layerRef.current.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                const line = new Konva.Line({
                    points: [0, mainHeight * 0.05 + 1, 0, mainHeight * 0.8075 - 1],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 2,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layerRef.current.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    }

    if (loading) {
        return <span>wait, please</span>
    }

    return (
        <div tabIndex={1} onKeyDown={checkRemove}>
            <Stage
                width={mainWidth}
                height={mainHeight}
                ref={stageRef}
            >
                <Layer
                    ref={layerRef}
                    onDragMove={(e) => {
                        if (e.target.getClassName() !== "Transformer") {
                            // clear all previous lines on the screen
                            layerRef.current.find('.guid-line').forEach((l) => l.destroy());

                            // find possible snapping lines
                            const lineGuideStops = getLineGuideStops(e.target);
                            // find snapping points of current object
                            const itemBounds = getObjectSnappingEdges(e.target);

                            // now find where can we snap current object
                            const guides = getGuides(lineGuideStops, itemBounds);

                            // do nothing of no snapping
                            if (!guides.length) {
                                return;
                            }

                            drawGuides(guides);

                            const absPos = e.target.absolutePosition();
                            // now force object position
                            guides.forEach((lg) => {
                                switch (lg.snap) {
                                    case 'start': {
                                        switch (lg.orientation) {
                                            case 'V': {
                                                absPos.x = lg.lineGuide + lg.offset;
                                                break;
                                            }
                                            case 'H': {
                                                absPos.y = lg.lineGuide + lg.offset;
                                                break;
                                            }
                                            default: {
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case 'center': {
                                        switch (lg.orientation) {
                                            case 'V': {
                                                absPos.x = lg.lineGuide + lg.offset;
                                                break;
                                            }
                                            case 'H': {
                                                absPos.y = lg.lineGuide + lg.offset;
                                                break;
                                            }
                                            default: {
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case 'end': {
                                        switch (lg.orientation) {
                                            case 'V': {
                                                absPos.x = lg.lineGuide + lg.offset;
                                                break;
                                            }
                                            case 'H': {
                                                absPos.y = lg.lineGuide + lg.offset;
                                                break;
                                            }
                                            default: {
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            });
                            e.target.absolutePosition(absPos);
                        }
                    }}

                    onDragEnd={(e) => {
                        // clear all previous lines on the screen
                        layerRef.current.find('.guid-line').forEach((l) => l.destroy());
                    }}
                >
                    {globalStore.isEditorMode && (<CenterScreenEditor/>)}
                    {globalStore.isEditorMode && (<BaseElements/>)}
                    {globalStore.isEditorMode && (<GameElements/>)}
                    {globalStore.isEditorMode && (<SlideStructure/>)}
                    {globalStore.isEditorMode && (<LessonStructure/>)}
                    {globalStore.isEditorMode && (<ElementSettings/>)}
                    {globalStore.isEditorMode && (<Templates/>)}
                    {!globalStore.isEditorMode && (<CenterScreenUser/>)}
                    {!globalStore.isEditorMode && (<DownScreenUser/>)}
                    {!globalStore.isEditorMode && (<LeftScreenUser/>)}
                    {!globalStore.isEditorMode && (<RightScreenUser/>)}

                    <UpScreenEditor
                        token={auth.token}
                        courseId={courseId}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default observer(MakeCoursePage);
