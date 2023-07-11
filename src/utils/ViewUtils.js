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

/**
 *
 * @param {HTMLInputElement} element
 * @returns {boolean}
 */
export function getCheckedState(element){
    return element.checked
}

/**
 *
 * @param {HTMLInputElement} element
 * @param {boolean} value
 */
export function setCheckedElement(element,value){
    element.checked = value
}

/**
 *
 * @param {HTMLElement} element
 */
export function clearInnerHtml(element){
    element.innerHTML = ""
}

/**
 *
 * @param element {HTMLInputElement}
 */
export function setDisableElement(element){
    element.disabled = true
}

/**
 *
 * @param element {HTMLInputElement}
 */
export function setEnableElement(element){
    element.disabled = false
}