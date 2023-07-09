import Service from "./Service";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import WordEntity from "../Data/entity/WordEntity";
import WordNames from "./model/WordNames";
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
const tempData = [{wordName:"abc",id:1,data:tempDic.data},{wordName:"ddb",id:2,data:tempDic.data}]
const repo = {
    mockData:tempData,
    /**
     *
     * @returns {DictionaryEntity[]}
     */
    readAll:()=>repo.mockData,
    addWordHeader:(wordName)=>{
        repo.mockData.push({wordName,id:3,data:[]})
        return repo.mockData[repo.mockData.length-1].id
    },
    readOne:(index)=>repo.mockData.filter(v=>{
        return v.id===index
    })[0]
}
it("getWordList", ()=>{
    const service = new Service(repo)
    const r = service.getWordList()
    r.then(res=>{
        expect(res).toEqual([
            new WordNames(1,repo.readAll()[0].wordName),
            new WordNames(2,repo.readAll()[1].wordName),
        ])

    })
})

describe("addWord",()=>{
    it("addWord test1",()=>{
        const service = new Service(repo);
        const r = service.addWord("test3")
        r.then(res=>{
            expect(res).toEqual(repo.readAll()[repo.readAll().length-1])
        })
    })
    it("duplicate name",async ()=>{
        const service = new Service(repo);
        const addWordFunction = async () => {
            await service.addWord("abc");
        };

        await expect(addWordFunction).rejects.toThrow(Error);
    })

})