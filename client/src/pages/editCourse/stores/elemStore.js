import {createContext} from "react";
import {makeAutoObservable, toJS} from "mobx";

class ElemStore {
    ellipses = [];
    texts = [];
    tests = [];
    flashcards = [];
    rectangles = [];
    images = [];
    textquests = [];
    name = "";
    id = "";

    constructor() {
        makeAutoObservable(this);
    }

    addEllipse(ellipses = {}) {
        const smth = toJS(this.ellipses)
        this.ellipses.replace([...smth, ellipses]);
    }

    addText(texts = {}) {
        const smth = toJS(this.texts);
        this.texts.replace([...smth, texts]);
    }

    addTest(tests = {}) {
        const smth = toJS(this.tests)
        this.tests.replace([...smth, tests]);
    }

    addFlashcard(flashcards = {}) {
        const smth = toJS(this.flashcards)
        this.flashcards.replace([...smth, flashcards]);
    }

    addRectangle(rectangles = {}) {
        const smth = toJS(this.rectangles)
        this.rectangles.replace([...smth, rectangles]);
    }

    addImage(images = {}) {
        const smth = toJS(this.images)
        this.images.replace([...smth, images]);
    }

    addTextquest(textquests = {}) {
        const smth = toJS(this.textquests)
        this.textquests.replace([...smth, textquests]);
    }

    setEllipses(ellipses = []) {
        this.ellipses.replace(ellipses);
    }

    setTexts(texts = []) {
        this.texts.replace(texts);
    }

    setTests(tests = []) {
        this.tests.replace(tests);
    }

    setFlashcards(flashcards = []) {
        this.flashcards.replace(flashcards);
    }

    setRectangles(rectangles = []) {
        this.rectangles.replace(rectangles);
    }

    setImages(images = []) {
        this.images.replace(images);
    }

    setTextquests(textquests = []) {
        this.textquests.replace(textquests);
    }

    get total() {
        return {
            ellipses: this.ellipses,
            texts: this.texts,
            tests: this.tests,
            flashcards: this.flashcards,
            rectangles: this.rectangles,
            images: this.images,
            textquests: this.textquests
        }
    }

    get allObjects() {
        return toJS(this.ellipses)
            .concat(toJS(this.texts))
            .concat(toJS(this.tests))
            .concat(toJS(this.flashcards))
            .concat(toJS(this.rectangles))
            .concat(toJS(this.textquests))
            .concat(toJS(this.images))
            .sort((a, b) => a.counter - b.counter)
    }

    setCourse(objects) {
        this.ellipses.replace(objects?.ellipses);
        this.texts.replace(objects?.texts);
        this.tests.replace(objects?.tests);
        this.flashcards.replace(objects?.flashcards);
        this.rectangles.replace(objects?.rectangles);
        this.images.replace(objects?.images);
        this.textquests.replace(objects?.textquests);
    }

    setName(name) {
        this.name = name
    }

    setId(id) {
        this.id = id
    }
}

export const ElemStoreContext = createContext(new ElemStore());