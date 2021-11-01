import {createContext} from "react";
import {makeAutoObservable} from "mobx";

class StageStore {
    stageRef = null;
    layerRef = null;

    constructor() {
        makeAutoObservable(this);
    }

    setStage(stageRef) {
        this.stageRef = stageRef
    }

    setLayerRef(layerRef) {
        this.layerRef = layerRef
    }

}

export const StageStoreContext = createContext(new StageStore());