import React, {useEffect, useRef} from "react";
import {Ellipse, Transformer} from "react-konva";

function EllipseElementEditor({shapeProps, isSelected, onSelect, onChange}) {
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
            <Ellipse
                name={"object Ellipse"}
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
                        radiusX: e.target.radiusX() * scaleX,
                        radiusY: e.target.radiusY() * scaleY,
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

export default EllipseElementEditor;