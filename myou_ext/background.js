// 익스텐션의 백그라운드 서비스 워커
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'from-page') {
        console.log('Background received:', message.payload);

        // 5초 뒤에 content script로 다시 메시지 전달
        setTimeout(() => {
            if (sender.tab?.id) {
                chrome.tabs.sendMessage(sender.tab.id, {
                    type: 'to-page',
                    payload: { message: '5초 후 background에서 보내는 메시지' }
                });
            }
        }, 5000);


        sendResponse({ reply: 'pong from background!' });
    }

    if (message.type === 'launch-notepad') {
        console.log('Launching native host...');

        const port = chrome.runtime.connectNative('com.myhost.notepad');

        port.onMessage.addListener((response) => {
            console.log('Native host response:', response);
            sendResponse({ status: 'launched', message: response });
        });

        port.onDisconnect.addListener(() => {
            if (chrome.runtime.lastError) {
                sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
            }
        });

        port.postMessage({ open_notepad: true });
        return true; // async
    }
});