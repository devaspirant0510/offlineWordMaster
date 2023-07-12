import Dictionary from "../model/Dictionary";

/**
 *
 * @param entity {DictionaryEntity}
 * @param index {number}
 * @constructor
 */
export const EntityToModel = (entity,index)=>{
    return new Dictionary(
        entity.id,
        entity.wordName,
        entity.data,
        index
    );

}