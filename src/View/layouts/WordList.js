import {fromEvent} from "rxjs";
import {CSS_REF} from "../../utils/Constant"
import {displayNone,displayShowen} from "../../utils/ViewUtils"

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
const DotsImage =()=>{
    const img = document.createElement("img")
    img.classList.add = "word-menu-icon"
    img.src = "/resource/dots3.png";
    img.width = 25
    img.height = 25
    return img
}
/**
 * @param {string} wordName 
 */
export const WordListItem = (wordName) => {
    const li = document.createElement("li");
    li.innerHTML = `${wordName}`

    const imgWrapper = document.createElement("div");
    imgWrapper.style.display = "flex"

    // dots 이미지
    const dotsImage = DotsImage()

    // 수정 삭제 메뉴
    const menu = WordContextMenu();
    displayNone(menu)

    imgWrapper.append(dotsImage)
    imgWrapper.append(menu)

    li.append(imgWrapper);

    let toggle = true;
    fromEvent(dotsImage,"click").subscribe(()=>{
        if (toggle) {
            displayShowen(menu);
            toggle = !toggle;
        } else {
            displayNone(menu);
            toggle = !toggle;
        }
    })
    return {li,menu};

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
    ctx.style.display = "none";
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
