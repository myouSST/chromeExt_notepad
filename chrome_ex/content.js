// Content Script는 웹페이지와 익스텐션 사이를 중계함

// (1) 웹페이지 → 익스텐션
window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data && event.data.type === "FROM_PAGE") {
        if(event.data.payload.command === 'launch-notepad') {
            chrome.runtime.sendMessage({ type: "launch-notepad" }, (response) => {
                // 응답을 다시 웹페이지로 전달
                window.postMessage(
                    {
                        type: "FROM_EXTENSION",
                        payload: response
                    },
                    "*"
                );
            });
            return;
        }

        // 메시지를 익스텐션으로 포워딩
        chrome.runtime.sendMessage(
            { type: "from-page", payload: event.data.payload },
            (response) => {
                // 응답을 다시 웹페이지로 전달
                window.postMessage(
                    {
                        type: "FROM_EXTENSION",
                        payload: response
                    },
                    "*"
                );
            }
        );
    }
});

// (2) background → content script → 웹페이지
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'to-page') {
        window.postMessage(
            {
                type: "FROM_EXTENSION_DELAYED",
                payload: message.payload
            },
            "*"
        );
    }
});