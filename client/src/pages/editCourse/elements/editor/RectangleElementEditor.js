import React, {useEffect, useRef} from "react";
import {Rect, Transformer} from "react-konva";

function RectangleElementEditor({shapeProps, isSelected, onSelect, onChange}) {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Rect
                name={"Rectangle"}
                onMouseDown={onSelect}
                onTap={onSelect}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                ref={shapeRef}
                {...shapeProps}
                draggable


                onTransformEnd={(e) => {
                    const scaleX = e.target.scaleX();
                    const scaleY = e.target.scaleY();

                    e.target.scaleX(1);
                    e.target.scaleY(1);

                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                        width: e.target.width() * scaleX,
                        height: e.target.height() * scaleY,
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                />
            )}
        </React.Fragment>
    );
}

export default RectangleElementEditor;