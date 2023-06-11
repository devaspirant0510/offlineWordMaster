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
 * @param eng
 * @param kor
 * @return {HTMLElement}
 */
export const WordItemLayout=(eng,kor)=>{
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
    div.style.display = "flex"
    div.style.alignItems = "center"
    div.append(li,img)
    return div;
}