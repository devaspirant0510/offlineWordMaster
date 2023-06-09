import Service from "./Service";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import WordEntity from "../Data/entity/WordEntity";
import DictionaryNames from "./model/DictionaryNames";
import {expectedError} from "@babel/core/lib/errors/rewrite-stack-trace";
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
            new DictionaryNames(1,repo.readAll()[0].wordName),
            new DictionaryNames(2,repo.readAll()[1].wordName),
        ])

    })
})

describe("addWord",()=>{
    it("addWord test1",()=>{
        const service = new Service(repo);
        const r = service.addDictionary("test3")
        r.then(res=>{
            expect(res).toEqual(repo.readAll()[repo.readAll().length-1])
        })
    })
    it("duplicate name",async ()=>{
        const service = new Service(repo);
        const addWordFunction = async () => {
            await service.addDictionary("abc");
        };
        await expect(addWordFunction).rejects.toThrow(Error);
    })
})

describe("read Dictionary",()=>{
    let service;
    beforeEach(()=>{
        service = new Service(repo);

    })
    it("read All Dictionary",async ()=>{
        const data = await service.getAllDictionary()
        console.log(data)
        expect(data).toEqual(repo.mockData)
    })
    it("read First Dictionary",async ()=>{
        const data = await service.getFirstDictionary()
        if(data){
            console.log(data)
            expect(data).toEqual(repo.mockData[0])
        }
    })
})