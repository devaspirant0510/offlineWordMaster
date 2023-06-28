import View from "./View/View";
import TestView from "./View/WordTestView";
import ViewModel from "./ViewModel/ViewModel";
import WordTestViewModel from "./ViewModel/WordTestViewModel";
import Service from "./Domain/Service"
import WordTestService from "./Domain/WordTestService";
import Repository from "./Data/repository/Repository";
import Mediator from "./ViewModel/Mediator";

const mediator = new Mediator();
const repo = new Repository()
const service1 = new Service(repo)
const wordTestSerivce = new WordTestService(repo)
const viewModel = new ViewModel(service1,mediator)
const wordTestViewModel = new WordTestViewModel(wordTestSerivce,mediator);

new TestView(wordTestViewModel);
new View(viewModel);