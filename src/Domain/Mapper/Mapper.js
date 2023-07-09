import DictionaryEntity from "../../Data/entity/DictionaryEntity";
import WordNames from "../model/WordNames";
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