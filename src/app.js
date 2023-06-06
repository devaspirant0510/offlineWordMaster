import View from "./View/View";
import ViewModel from "./ViewModel/ViewModel";
import Service from "./Domain/Service"
import Repository from "./Data/repository/Repository";

const repo = new Repository()
const service = new Service(repo)
const viewModel = new ViewModel(service)

new View(viewModel)
