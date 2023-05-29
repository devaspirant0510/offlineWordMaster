import {LitElement,html} from "lit";

export class aaa extends LitElement{
    render(){
        return html`<h1>LitTempleate</h1>`
    }

}
customElements.define("aaa",aaa)
