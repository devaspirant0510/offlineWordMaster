
class Repository{
    constructor(){
        this.fakeDatabase = {
            "chatper1":[
                {"eng":"apple","kor":"사과"}
            ]
        }
    }
    /**
     * @returns {string[]}
     */
    getDataBaseWord(){
        return Object.keys(this.fakeDatabase);
    }
}
export default Repository;