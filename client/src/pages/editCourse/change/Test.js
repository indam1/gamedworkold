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

export const changeCurQuestion = (shapeProps, value) => {
    return value;
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
        }
    })
}

export const changeThemeText = (onChange, shapeProps, value) => {
    onChange({
        ...shapeProps,
        theme: {
            x: shapeProps.theme.x,
            y: shapeProps.theme.y,
            text: value,
            fontSize: shapeProps.theme.fontSize,
            fill: shapeProps.theme.fill,
            fontFamily: shapeProps.theme.fontFamily,
        }
    })
}

export const changeQuestionPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        question: {
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.questions[shapeProps.curQuestion]?.text,
            fontSize: shapeProps.question.fontSize,
            fill: shapeProps.question.fill,
            fontFamily: shapeProps.question.fontFamily,
            visible: shapeProps.question.visible,
        },
    });
}

export const changeQuestionText = (onChange, shapeProps, value) => {
    const tempQuestions = shapeProps.questions.map((item) => {
        return item !== shapeProps.questions[shapeProps.curQuestion] ? item : {
            text: value,
            answers: shapeProps.questions[shapeProps.curQuestion].answers,
            result: shapeProps.questions[shapeProps.curQuestion].result,
        };
    })

    onChange({
        ...shapeProps,
        questions: tempQuestions,
    })
}

export const changeQuestionVisible = (shapeProps, value) => {
    return {
        x: shapeProps.question.x,
        y: shapeProps.question.y,
        fontSize: shapeProps.question.fontSize,
        fill: shapeProps.question.fill,
        fontFamily: shapeProps.question.fontFamily,
        visible: value,
    }
}

export const changeAnswersPosition = (onChange, shapeProps, e, eachAnswer) => {
    const tempAnswer = shapeProps.questions[shapeProps.curQuestion].answers.map((item) => {
        return item !== eachAnswer ? item : {
            x: e.target.x(),
            y: e.target.y(),
            text: eachAnswer.text,
        };
    })

    const tempQuestions = shapeProps.questions.map((item) => {
        return item !== shapeProps.questions[shapeProps.curQuestion] ? item : {
            text: shapeProps.questions[shapeProps.curQuestion].text,
            answers: tempAnswer,
            result: shapeProps.questions[shapeProps.curQuestion].result,
        }
    })

    onChange({
        ...shapeProps,
        questions: tempQuestions,
    });
}

export const changeAnswerText = (onChange, shapeProps, eachAnswer, value) => {
    const tempAnswer = shapeProps.questions[shapeProps.curQuestion].answers.map((item) => {
        return item !== eachAnswer ? item : {
            x: eachAnswer.x,
            y: eachAnswer.y,
            text: value,
        };
    })

    const tempQuestions = shapeProps.questions.map((item) => {
        return item !== shapeProps.questions[shapeProps.curQuestion] ? item : {
            text: shapeProps.questions[shapeProps.curQuestion].text,
            answers: tempAnswer,
            result: shapeProps.questions[shapeProps.curQuestion].result,
        }
    })

    onChange({
        ...shapeProps,
        questions: tempQuestions,
    });
}

export const changeAnswerVisible = (shapeProps, value) => {
    return {
        height: shapeProps.answer.height,
        width: shapeProps.answer.width,
        backgroundFill: shapeProps.answer.backgroundFill,
        textFill: shapeProps.answer.textFill,
        fontSize: shapeProps.answer.fontSize,
        cornerRadius: shapeProps.answer.cornerRadius,
        fontFamily: shapeProps.answer.fontFamily,
        visible: value,
    }
}

export const changeButtonPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        button: {
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.button.text,
            height: shapeProps.button.height,
            width: shapeProps.button.width,
            backgroundFill: shapeProps.button.backgroundFill,
            textFill: shapeProps.button.textFill,
            fontSize: shapeProps.button.fontSize,
            cornerRadius: shapeProps.button.cornerRadius,
            fontFamily: shapeProps.button.fontFamily,
            visible: shapeProps.button.visible,
        }
    });
}

export const changeButtonText = (shapeProps, value) => {
    return {
        x: shapeProps.button.x,
        y: shapeProps.button.y,
        text: value,
        height: shapeProps.button.height,
        width: shapeProps.button.width,
        backgroundFill: shapeProps.button.backgroundFill,
        textFill: shapeProps.button.textFill,
        fontSize: shapeProps.button.fontSize,
        cornerRadius: shapeProps.button.cornerRadius,
        fontFamily: shapeProps.button.fontFamily,
        visible: shapeProps.button.visible,
    }
}

export const changeButtonVisible = (shapeProps, value) => {
    return {
        x: shapeProps.button.x,
        y: shapeProps.button.y,
        text: shapeProps.button.text,
        height: shapeProps.button.height,
        width: shapeProps.button.width,
        backgroundFill: shapeProps.button.backgroundFill,
        textFill: shapeProps.button.textFill,
        fontSize: shapeProps.button.fontSize,
        cornerRadius: shapeProps.button.cornerRadius,
        fontFamily: shapeProps.button.fontFamily,
        visible: value,
    }
}

export const changeButtonTextAndVisible = (shapeProps, text, visible) => {
    return {
        x: shapeProps.button.x,
        y: shapeProps.button.y,
        text: text,
        height: shapeProps.button.height,
        width: shapeProps.button.width,
        backgroundFill: shapeProps.button.backgroundFill,
        textFill: shapeProps.button.textFill,
        fontSize: shapeProps.button.fontSize,
        cornerRadius: shapeProps.button.cornerRadius,
        fontFamily: shapeProps.button.fontFamily,
        visible: visible,
    }
}

export const changeResultPosition = (onChange, shapeProps, e) => {
    onChange({
        ...shapeProps,
        result: {
            x: e.target.x(),
            y: e.target.y(),
            text: shapeProps.result.text,
            fontSize: shapeProps.result.fontSize,
            fill: shapeProps.result.fill,
            fontFamily: shapeProps.result.fontFamily,
            visible: false,
        },
    });
}

export const changeResultState = (shapeProps, fill, answer) => {
    return {
        x: shapeProps.result.x,
        y: shapeProps.result.y,
        fontSize: shapeProps.result.fontSize,
        fill: fill,
        text: answer,
        fontFamily: shapeProps.result.fontFamily,
        visible: true,
    }
}

export const changeResultStateAndVisible = (shapeProps, fill, answer, visible) => {
    return {
        x: shapeProps.result.x,
        y: shapeProps.result.y,
        fontSize: shapeProps.result.fontSize,
        fill: fill,
        text: answer,
        fontFamily: shapeProps.result.fontFamily,
        visible: visible,
    }
}