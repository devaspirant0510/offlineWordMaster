/**
 *
 * @param {string} value
 * @returns {number}
 */
export const extractNumberFromId = (value)=>{
    const splitValue = value.split('-')
    return parseInt(splitValue[1])
}