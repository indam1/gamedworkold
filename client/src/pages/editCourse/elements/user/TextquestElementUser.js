import React, {useContext, useEffect, useRef} from "react";
import {Group, Rect, Text, Transformer} from "react-konva";
import {StageStoreContext} from "../../stores/stageStore";
import {useWindowDimensions} from "../../functions/Functions";

function TextquestElementUser({shapeProps, onChange}) {

    return (
        <React.Fragment>
            <Group
                name={"Textquest"}
                {...shapeProps}
                opacity={1}
            >
                {shapeProps.units.map((eachUnit, i) => (
                    <React.Fragment key={i}>
                        {shapeProps?.curUnit === eachUnit.number && (
                            <Group>
                                <Rect
                                    name={"Textquest"}
                                    width={shapeProps.width}
                                    height={shapeProps.height}
                                    fill={shapeProps.fill}
                                    cornerRadius={shapeProps.cornerRadius}
                                />

                                <Text
                                    x={eachUnit.x}
                                    y={eachUnit.y}
                                    name={'Text'}
                                    fill={shapeProps.text.fill}
                                    fontSize={shapeProps.text.fontSize}
                                    fontFamily={shapeProps.text.fontFamily}
                                    text={eachUnit.text}
                                />


                                {eachUnit.buttons?.map((eachButton, i) => (
                                    <Group
                                        key={i}
                                        x={eachButton.x}
                                        y={eachButton.y}

                                        onClick={() => {
                                            onChange({
                                                ...shapeProps,
                                                curUnit: eachButton.jump,
                                            })
                                        }}
                                    >
                                        <Rect
                                            x={0}
                                            y={0}
                                            fill={shapeProps.button.backgroundFill}
                                            width={shapeProps.button.width}
                                            height={shapeProps.button.height}
                                            cornerRadius={shapeProps.button.cornerRadius}
                                        />
                                        <Text
                                            name={"Var"}
                                            x={0}
                                            y={0}
                                            text={eachButton.text}
                                            width={shapeProps.button.width}
                                            height={shapeProps.button.height}
                                            fill={shapeProps.button.textFill}
                                            fontSize={shapeProps.button.fontSize}
                                            fontFamily={shapeProps.button.fontFamily}
                                            align={"center"}
                                            verticalAlign={"middle"}
                                        />
                                    </Group>
                                ))}
                            </Group>
                        )}
                    </React.Fragment>
                ))}
            </Group>
        </React.Fragment>
    );
}

export default TextquestElementUser;