import {createContext} from "react";
import {makeAutoObservable} from "mobx";

class CounterStore {
    counterCommon = 0;
    counterEllipse = 0;
    counterText = 0;
    counterRectangle = 0;
    counterImage = 0;
    counterTest = 0;
    counterFlashcards = 0;
    counterTextquest = 0;

    constructor() {
        makeAutoObservable(this);
    }
}

export const CounterStoreContext = createContext(new CounterStore());