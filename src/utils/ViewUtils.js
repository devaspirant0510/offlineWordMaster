export const DISPLAY_STATE = {
    NONE:"none",
    SHOWEN:"block"
}
/**
 * @param {HTMLElement} element 
 */
export function displayNone(element){
    element.style.display = "none"
}

/**
 * @param {HTMLElement} element 
 */
export function displayShowen(element){
    element.style.display = "block"
}

/**
 *
 * @param element
 * @returns {string} display,blcok etc...
 */
export function getDisplayState(element){
    return element.style.display
}
