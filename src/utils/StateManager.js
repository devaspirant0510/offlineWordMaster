import { BehaviorSubject, Subject } from "rxjs"
class StateManager {
    constructor() {
        /**
         * @typedef {Object} State 
         * @property {Subject|BehaviorSubject} observer
         * @property {*} initialState
         * /
        

        /** @type {Array<State>} */
        this.states = [];

    }
    stateClear() {
        console.log("clear",this.states);
        this.states.map(state=>{
            console.log(state);
            state.observer.next(state.initialState)
        })
    }
    addState(observer){
        this.states.push({
            observer,
            initialState:observer.getValue()
        })
        return observer;
    }
}
export default StateManager;