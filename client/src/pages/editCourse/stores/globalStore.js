import {createContext} from "react";
import {makeAutoObservable, toJS} from "mobx";

class GlobalStore {
    selectedShape = null;
    selectedSettings = "";
    selectedField = 1;
    isEditorMode = true;
    numFields = [1, 2, 3];

    constructor() {
        makeAutoObservable(this);
    }

    setShape(selectedShape) {
        this.selectedShape = selectedShape;
    }

    setSettings(selectedSettings) {
        this.selectedSettings = selectedSettings;
    }

    setField(selectedField) {
        this.selectedField = selectedField;
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