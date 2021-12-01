import {createContext} from "react";
import {makeAutoObservable, toJS} from "mobx";

class GlobalStore {
    selectedShape = null;
    selectedSettings = "";
    // selectedField = 1;
    selectedField = "0" + " " + "0" + " " + "0" ;
    isEditorMode = true;
    numFields = [[[]]];

    constructor() {
        makeAutoObservable(this);
    }

    setShape(selectedShape) {
        this.selectedShape = selectedShape;
    }

    setSettings(selectedSettings) {
        this.selectedSettings = selectedSettings;
    }

    // setField(selectedField) {
    //     this.selectedField = selectedField
    // }

    setField(i, j, k) {
        this.selectedField = i + " " + j + " " + k;
    }

    setEditorMode(isEditorMode) {
        this.isEditorMode = isEditorMode;
    }

    addNumField(numFields) {
        const smth = toJS(this.numFields);
        smth.push(numFields)
        this.numFields.replace(smth);
    }

}

export const GlobalStoreContext = createContext(new GlobalStore());