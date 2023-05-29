const appDiv = document.querySelector('#app');

const routes = {
    "/":"a"
}
export const renderHTML = (pathName) => {
    appDiv.innerHTML = routes[pathName];
}

export const onNavigate = (pathName) => {
  window.history.pushState(
    {}, 
    '',
    window.location.origin + pathName
  );
  renderHTML(pathName);
}
