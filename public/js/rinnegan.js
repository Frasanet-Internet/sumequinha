
// execute o código quando o usuário clicar na extensão
chrome.action.onClicked.addListener((tab) => {
  // injete o código javascript dentro da aba atual
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["public/js/sharingan.js"],
  })
})
