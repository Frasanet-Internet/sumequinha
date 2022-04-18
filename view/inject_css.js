
chrome.action.onClicked.addListener((tab) => {
  // injete os estilos css dentro dessa aba
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["public/css/states.css"],
  })
})
