import WordEntity from "../../Data/entity/WordEntity";
class Dictionary{
    /**
     *
     * @param {number} id
     * @param {string} wordName
     * @param {WordEntity[]} data
     */
    constructor(id,wordName,data) {
        this.id = id
        this.wordName = wordName
        this.data = data;
    }
}
export default Dictionary;