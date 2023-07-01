import Service from "./Service";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import WordEntity from "../Data/entity/WordEntity";
const tempDic = new DictionaryEntity(
        "test",
    [
        new WordEntity("a","b"),
        new WordEntity("a","b"),
        new WordEntity("a","b"),
        new WordEntity("a","b"),
        new WordEntity("a","b"),
    ],
)
tempDic.wordName
const repo = {
    readAll:()=>[{wordName:tempDic.wordName,id:1},{wordName:tempDic.wordName,id:1}]
}
it("getWordList", ()=>{
    const service = new Service(repo)
    const r = service.getWordList()
    r.then(res=>{
        console.log(res)
        expect(JSON.parse(res)).toBe(JSON.parse(tempDic))

    })
})