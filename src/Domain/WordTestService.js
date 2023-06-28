import WordEntity from "../Data/entity/WordEntity";
import Repository from "../Data/repository/Repository";

class WordTestService {
    /**
     * 
     * @param {Repository} repository 
     */
    constructor(repository){
        this.repo = repository;
    }
    /**
     * 
     * @param {WordEntity[]} wordData 
     * @param {boolean} option 
     * @returns {string[]}
     */
    createQuestion(wordData,option){
        // kor 2 eng 일때
        if(option){
            return wordData.map(v=>v.kor)
        }else{
            return wordData.map(v=>v.eng)
        }
    }
}
export default WordTestService;