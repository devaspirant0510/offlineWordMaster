import View from "./View/View";
import TestView from "./View/WordTestView";
import ViewModel from "./ViewModel/ViewModel";
import WordTestViewModel from "./ViewModel/WordTestViewModel";
import Service from "./Domain/Service"
import Repository from "./Data/repository/Repository";

const repo = new Repository()
const service = new Service(repo)
const viewModel = new ViewModel(service)
const wordTestViewModel = new WordTestViewModel(service);

new View(viewModel);
new TestView(wordTestViewModel);