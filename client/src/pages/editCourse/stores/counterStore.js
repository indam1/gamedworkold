import {createContext} from "react";
import {makeAutoObservable, toJS} from "mobx";

class CounterStore {
    counterCommon = 0;
    counterEllipse = 0;
    counterText = 0;
    counterRectangle = 0;
    counterImage = 0;
    counterTest = 0;
    counterFlashcards = 0;
    counterTextquest = 0;

    chapters = [
        {
            id: 0,
            themes: [
                {
                    id: 0,
                    steps: [
                        {
                            id: 0,
                        },
                    ]
                },
            ]
        }
    ]


    constructor() {
        makeAutoObservable(this);
    }

    addChapter(chapter = {}) {
        const smth = toJS(this.chapters)
        this.chapters.replace([...smth, chapter])
    }

    addTheme(theme = {}, i) {
        const smth = toJS(this.chapters[i].themes)
        this.chapters[i].themes.replace([...smth, theme])
    }

    addStep(step = {}, i, j) {
        const smth = toJS(this.chapters[i].themes[j].steps)
        this.chapters[i].themes[j].steps.replace([...smth, step])
    }
}

export const CounterStoreContext = createContext(new CounterStore());