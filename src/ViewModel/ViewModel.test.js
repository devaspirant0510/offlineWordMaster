import ViewModel from "./ViewModel";
import Mediator from "./Mediator";
import Service from "../Domain/Service";

describe("viewmodel",()=>{
    let viewModel;
    let service;
    let mediator
    beforeEach(()=>{
        const repo = {}
        mediator = new Mediator();
        service = new Service(repo);
        viewModel = new ViewModel(service,mediator);

    })
    it("test",()=>{
        const li = viewModel.obWordList.getValue()
        console.log(li)
        viewModel.addWord("a")
        const a = viewModel.obWordList.getValue();
        console.log(a)
    })
})