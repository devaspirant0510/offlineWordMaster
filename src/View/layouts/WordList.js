import {fromEvent} from "rxjs";
import {CSS_REF} from "../../utils/Constant"

export const WordContextMenu = () => {
    const ctx = document.createElement("div");
    ctx.classList.add("word-ctx-menu")
    ctx.style.display = "flex"
    const deleteOption = document.createElement("button");
    deleteOption.classList.add("btn-word-delete")
    deleteOption.textContent = "삭제";
    const updateOption = document.createElement("button");
    updateOption.classList.add("btn-word-update");
    updateOption.textContent = "수정";
    ctx.append(deleteOption);
    ctx.append(updateOption);
    return ctx;
}

/**
 * @param {string} wordName 
 */
export const WordListItem = (wordName, callback, toggle1) => {
    const li = document.createElement("li");
    const imgWrapper = document.createElement("div");
    imgWrapper.style.display = "flex"
    const contextMenu = document.createElement("img")
    contextMenu.classList.add = "word-menu-icon"
    imgWrapper.append(contextMenu)
    contextMenu.src = "/resource/dots3.png";
    contextMenu.width = 25
    contextMenu.height = 25
    li.innerHTML = `${wordName}`
    li.append(imgWrapper);
    const menu = WordContextMenu();
    imgWrapper.append(menu)
    console.log(menu);
    
    menu.style.display = "none"
    let toggle = true;
    contextMenu.addEventListener("click", (e) => {
        if (toggle) {
            menu.style.display = "block"
            toggle = !toggle
        } else {
            menu.style.display = "none"
            toggle = !toggle
        }
    });
    return [li,menu];

}

/**
 *
 * @param {string} eng
 * @param {string} kor
 * @param {number} id
 * @return {HTMLElement[]}
 */
export const WordItemLayout=(eng,kor,id)=>{
    const li = document.createElement("li");
    li.innerHTML = `
                        <span class="english">
                            ${eng}
                        </span>
                        <span class="korean" >
                            ${kor}
                        </span>
                `;
    const img = document.createElement("img");
    img.src="/resource/dots3.png";
    img.width = 25;
    img.height = 25;
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    const ctx = WordItemCtxMenu(
        CSS_REF.WORD_ITEM_CTX,
        CSS_REF.WORD_ITEM_DELETE_BUTTON,
        CSS_REF.WORD_ITEM_UPDATE_BUTTON
    );
    div.append(li,ctx,img);
    ctx.style.visibility = "hidden";
    return [div,img,ctx];
}

/**
 *
 * @param {string} menuClassName
 * @param {string} deleteClassName
 * @param {string} updateClassName
 * @constructor {HTMLElement}
 */
export const WordItemCtxMenu = (menuClassName,deleteClassName,updateClassName)=>{
    const ctx = document.createElement("div");
    ctx.classList.add(menuClassName)
    ctx.style.display = "flex"
    const deleteOption = document.createElement("button");
    deleteOption.classList.add(deleteClassName)
    deleteOption.textContent = "삭제";
    const updateOption = document.createElement("button");
    updateOption.classList.add(updateClassName);
    updateOption.textContent = "수정";
    ctx.append(deleteOption);
    ctx.append(updateOption);
    return ctx;
}