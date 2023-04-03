chrome.tabs.onCreated.addListener((tab) => {
  console.log("Nova guia criada:", tab.id);
});
