import DictionaryEntity from "../../Data/entity/DictionaryEntity";
import DictionaryNames from "../model/DictionaryNames";
import dictionary from "../../ViewModel/model/Dictionary";
/**
 *
 * @param dictionary {DictionaryEntity[]}
 * @returns {DictionaryNames[]}
 */
export const MapperWordNames = (dictionary)=>{
    /** @type {DictionaryNames[]} */
    const wordNames = []
    dictionary.map(dict=>{
        wordNames.push(new DictionaryNames(dict.id,dict.wordName))
    })
    return wordNames;
}

/**
 *
 * @param {DictionaryEntity} dictionary
 * @returns {DictionaryNames}
 */
export const MapperWordNamesOne = (dictionary) =>{
    return new DictionaryNames(dictionary.id,dictionary.wordName)
}