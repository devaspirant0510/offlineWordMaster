
class BaseView{
    dataBinding(){
        console.log("err");
        
        throw new Error("not implemented");
    }
    settingDom(){
        throw new Error("not implemented");
    }
    settingEvent(){
        throw new Error("not implemented");
    }
}
export default BaseView;