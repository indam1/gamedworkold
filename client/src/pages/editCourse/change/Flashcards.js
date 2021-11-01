export const changePosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        x: e.target.x(),
        y: e.target.y(),
    });
}

export const changeScale = (onChange, shapeProps, e) => {
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
    })
}

export const changeThemePosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        theme: {
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.theme.text,
            fontSize: shapeProps.theme.fontSize,
            fill: shapeProps.theme.fill,
            fontFamily: shapeProps.theme.fontFamily,
        },
    });
}

export const changeWordPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        word: {
            fontFamily: shapeProps.word.fontFamily,
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.word.text,
            fontSize: shapeProps.word.fontSize,
            fill: shapeProps.word.fill,
        },
    });
}

export const changeMeaningPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        meaning: {
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.meaning.text,
            fontFamily: shapeProps.meaning.fontFamily,
            fontSize: shapeProps.meaning.fontSize,
            fill: shapeProps.meaning.fill,
        },
    });
}

export const changeResultPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        result: {
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.result.text,
            fontSize: shapeProps.result.fontSize,
            fontFamily: shapeProps.result.fontFamily,
            fill: shapeProps.result.fill,
            answer: shapeProps.result.answer,
            visible: false,
        },
    });
}

export const changeInputPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        input: {
            x: e.target.x(),
            y: e.target.y(),
            fontSize: shapeProps.input.fontSize,
            width: shapeProps.input.width,
            height: shapeProps.input.height,
            fontFamily: shapeProps.input.fontFamily,
        },
    });
}

export const changeButtonPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        button: {
            x: e.target.x(),
            y: e.target.y(),
            width: shapeProps.button.width,
            height: shapeProps.button.height,
            fontSize: shapeProps.button.fontSize,
            backgroundFill: shapeProps.button.backgroundFill,
            textFill: shapeProps.button.textFill,
            text: shapeProps.button.text,
            cornerRadius: shapeProps.button.cornerRadius,
            fontFamily: shapeProps.button.fontFamily,
            align: shapeProps.button.align,
            verticalAlign: shapeProps.button.verticalAlign,
        }
    });
}
