function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
}

function copyToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text).then(function() {
        console.log("Async: Copying to clipboard was successful!");
    }, function(err) {
        console.error("Async: Could not copy text: ", err);
    });
}

function copyIP() {
    copyToClipboard("mc.f3f5.ru");

    const element = document.getElementById("ip-copy");
    if (element.hasAttribute("copied")) {
        return;
    }

    const text = element.innerText;

    element.toggleAttribute("copied");
    element.style.opacity = "0";

    setTimeout(_ => {
        element.innerText = "Скопировано!"
        element.style.opacity = "1";
    }, 100);

    setTimeout(_ => {
        element.style.opacity = "0";
    }, 1500);

    setTimeout(_ => {
        element.innerText = text;
        element.style.opacity = "1";
        element.toggleAttribute("copied");
    }, 1600);
}