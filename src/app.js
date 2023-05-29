import View from "./View";
import ViewModel from "./ViewModel";
import Service from "./Service";
import Repository from "./Repository";
import routes, { renderHTML } from "./routes"
const repo = new Repository()
const service = new Service(repo)
const viewModel = new ViewModel(service)
const view = new View(viewModel)
