import DictionaryEntity from "../../Data/entity/DictionaryEntity";
import WordNames from "../model/WordNames";
import dictionary from "../../ViewModel/model/Dictionary";
/**
 *
 * @param dictionary {DictionaryEntity[]}
 * @returns {WordNames[]}
 */
export const MapperWordNames = (dictionary)=>{
    /** @type {WordNames[]} */
    const wordNames = []
    dictionary.map(dict=>{
        wordNames.push(new WordNames(dict.id,dict.wordName))
    })
    return wordNames;
}

/**
 *
 * @param {DictionaryEntity} dictionary
 * @returns {WordNames}
 */
export const MapperWordNamesOne = (dictionary) =>{
    return new WordNames(dictionary.id,dictionary.wordName)
}