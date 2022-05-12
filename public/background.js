/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
    console.log("Chrome extension successfully installed!")

    chrome.tabs.create({
        url: "index.html"
        // focused: true,
        // width: 359,
        // height: 580,
        // type: "popup",
        // top: 0,
        // left: 1500
    })
})
