globalThis.type = "";
class RecordVideoButton {
  constructor(options) {
    if (Object.keys(options).length > 0) {
      const {
        showSvg = true,
        title = "Record Video",
        buttonClass = "dd__record__button__default__class",
        buttonStyle = "",
      } = options;
      this.buttonClass = buttonClass
        ? buttonClass
        : "dd__record__button__default__class";
      this.createButtonWithOptions(
        showSvg,
        title,
        this.buttonClass,
        buttonStyle
      );
    } else {
      this.createButtonWithoutOptions();
    }
  }
  initialize = (callBack) => {
    if (detectBrowser() === "Chrome") {
      callBack({ supported: true, browserType: "chrome" });
    } else {
      callBack({ supported: false, browserType: detectBrowser() });
    }
  };
  createButtonWithOptions = (showSvg, title, buttonClass, buttonStyle) => {
    const buttonDiv = document.querySelector("#record-video-button");
    const btn = document.createElement("button");
    btn.innerHTML = showSvg ? renderSVG() + title : title;
    btn.className = buttonClass;
    btn.style = buttonStyle;
    btn.addEventListener("click", this.handleRecordVideoButtonClick);
    buttonDiv.appendChild(btn);
  };
  createButtonWithoutOptions = () => {
    const buttonDiv = document.querySelector("#record-video-button");
    const btn = document.createElement("button");
    btn.innerHTML = renderSVG() + "Record Video";
    btn.className = "dd__record__button__default__class";
    btn.style = "";
    btn.addEventListener("click", this.handleRecordVideoButtonClick);
    buttonDiv.appendChild(btn);
  };
  handleRecordVideoButtonClick = () => {
    globalThis.type = "record-video";
    this.initialize(({ supported, browserType }) => {
      if (supported) {
        if (document.body.hasAttribute("haal-recording-extension")) {
          window.postMessage(
            { command: "haal-recording-display" },
            location.href
          );
        } else {
          showInstallExtensonDialog(true);
        }
      } else {
        showBrowserNotSupportedDialog(true, browserType);
      }
    });
  };
}
//////////////////////////////////////////////
class SelectVideoButton {
  constructor(options) {
    if (Object.keys(options).length > 0) {
      const {
        showSvg = true,
        title = "Select Video",
        buttonClass = "dd__record__button__default__class",
        buttonStyle = "",
      } = options;
      this.buttonClass = buttonClass
        ? buttonClass
        : "dd__record__button__default__class";
      this.createButtonWithOptions(
        showSvg,
        title,
        this.buttonClass,
        buttonStyle
      );
    } else {
      this.createButtonWithoutOptions();
    }
  }
  initialize = (callBack) => {
    if (detectBrowser() === "Chrome") {
      callBack({ supported: true, browserType: "chrome" });
    } else {
      callBack({ supported: false, browserType: detectBrowser() });
    }
  };
  createButtonWithOptions = (showSvg, title, buttonClass, buttonStyle) => {
    const buttonDiv = document.querySelector("#select-video-button");
    const btn = document.createElement("button");
    btn.innerHTML = showSvg ? renderSVG() + title : title;
    btn.className = buttonClass;
    btn.style = buttonStyle;
    btn.addEventListener("click", this.handleSelectVideoButtonClick);
    buttonDiv.appendChild(btn);
  };
  createButtonWithoutOptions = () => {
    const buttonDiv = document.querySelector("#select-video-button");
    const btn = document.createElement("button");
    btn.innerHTML = renderSVG() + "Select Video";
    btn.className = "dd__record__button__default__class";
    btn.style = "";
    btn.addEventListener("click", this.handleSelectVideoButtonClick);
    buttonDiv.appendChild(btn);
  };
  handleSelectVideoButtonClick = () => {
    globalThis.type = "select-video";
    this.initialize(({ supported, browserType }) => {
      if (supported) {
        if (document.body.hasAttribute("haal-recording-extension")) {
          try {
            window.postMessage(
              { command: "haal-recording-display-video" },
              location.href
            );
          } catch (error) {
            console.error(error);
          }
        } else {
          showInstallExtensonDialog(true);
        }
      } else {
        showBrowserNotSupportedDialog(true, browserType);
      }
    });
  };
}
//////////////////////////////////////////////
function onStopRecording(video) {
  renderViewDialog(true, video);
}
function renderViewDialog(showDialog, video) {
  const renderPreviewDialog = document.querySelector("#render-preview-dialog");
  if (showDialog) {
    const { embedUrl, sharedUrl } = video;
    renderPreviewDialog.innerHTML = `<div class="dd-preview">
    <div class="dd-preview-box">
        <div class="dd-preview-content">
            <div class="dd-preview-body">
                <div class="iframe-wrapper">
                  <iframe width="560" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen
                  allowfullscreen src="${embedUrl}"></iframe>
                </div>
                <div class="dd-preview-header">
                    <img src="https://dadan.io/wp-content/uploads/2020/11/dadan.svg" alt="dadan video preview" />
                    <div class="dd-preview-buttons">
                        <button id="copy-to-clipboard" onclick="handleCopyToClipboard('${sharedUrl}')" class="btn btn-copy" type="button">
                            <img src="../src/assets/images/link.svg" alt='Copy Recording' />
                            Copy Recording</button>
                        <button class="btn btn-close" type="button" onclick="handleVideoDialogClose()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="dd-preview-overlay"></div>`;
  } else {
    renderPreviewDialog.innerHTML = ``;
  }
}
function handleCopyToClipboard(sharedUrl) {
  setTimeout(() => {
    navigator.clipboard
      .writeText(sharedUrl)
      .then(() => {})
      .catch((error) => {
        console.log(`Copy failed! ${error}`);
      });
  }, 1000);
  const btn = document.querySelector("#copy-to-clipboard");
  btn.innerHTML = "Copied";
  btn.classList.remove("btn-copy");
  btn.classList.add("btn-success");
}
function handleCopyToClipboardToast(sharedUrl) {
  const copiedSuccessFeedback = document.querySelector(
    "#copied-success-feedback"
  );
  setTimeout(() => {
    navigator.clipboard
      .writeText(sharedUrl)
      .then(() => {
        copiedSuccessFeedback.innerHTML = renderFeedback();
        setTimeout(() => {
          copiedSuccessFeedback.innerHTML = "";
        }, 2000);
      })
      .catch((error) => {
        console.log(`Copy failed! ${error}`);
      });
  }, 500);
}
function showBrowserNotSupportedDialog(showDialog, browserType) {
  const browserPopup = document.querySelector("#browser-popup-alert");
  if (showDialog) {
    browserPopup.innerHTML = `<div class="dd-dialog">
    <div class="dd-dialog-box">
        <div class="dd-dialog-content">
            <div class="dd-dialog-body">
                <button class="close" type="button" onclick="showBrowserNotSupportedDialog(false,'')">x</button>
                <img src="https://dadan.io/wp-content/uploads/2020/11/dadan.svg" alt="missing chrome extentsion">
                <p style="margin-bottom: 10px;">${browserType} isn't compatible with dadan recording.</p>
                <p>We recommend that you use the latest version of Google Chrome</p>
                <div class="dd-dialog-buttons">
                    <a target="_blank" href="https://www.google.com/chrome/" class="btn btn-install" onclick="showBrowserNotSupportedDialog(false,'')">
                      <img src="../src/assets/images/chrome.svg" alt="Google Chrome">
                      Download Google Chrome
                    </a>
                </div>
                <span class="powered">Powered by dadan video recorder</span>
            </div>
        </div>
    </div>
</div>
<div class="dd-dialog-overlay"></div>`;
  } else {
    browserPopup.innerHTML = ``;
  }
}
function showInstallExtensonDialog(showDialog) {
  const installExtensionDialog = document.querySelector(
    "#install-extesion-dialog"
  );
  if (showDialog) {
    installExtensionDialog.innerHTML = `<div class="dd-dialog">
    <div class="dd-dialog-box">
        <div class="dd-dialog-content">
            <div class="dd-dialog-body">
                <button class="close" type="button" onclick="showInstallExtensonDialog(false)">x</button>
                <img src="https://dadan.io/wp-content/uploads/2020/11/dadan.svg" alt="missing chrome extentsion">
                <p>dadan extentsion is not installed, would you like to install it now ?</p>
                <div class="dd-dialog-buttons">
                    <button class="btn btn-install" onclick="handleInstallClick()" type="button">
                      <img src="../src/assets/images/down-arrow.svg" alt="missing chrome extentsion">
                      Install dadan extension
                    </button>
                </div>
                <span class="powered">Powered by dadan video recorder</span>
            </div>
        </div>
    </div>
</div>
<div class="dd-dialog-overlay"></div>`;
  } else {
    installExtensionDialog.innerHTML = ``;
  }
}
function handleInstallClick() {
  showInstallExtensonDialog(false);
  window.open("https://haal.link.sa/onboarding/download", "_blank");
}
function handleVideoDialogClose() {
  renderViewDialog(false);
}
function renderFeedback() {
  return `<div class="dd-feedback">
          <div class="dd-feedback-inner">
              <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z">
                  </path>
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
                  </path>
              </svg>
              <div class="dd-feedback-message">
                  Video Recording Link Copied Successfully !
              </div>
          </div>
      </div>`;
}
function renderSVG() {
  return `<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <defs>
        <clipPath id="a">
          <rect
            width="16"
            height="16"
            transform="translate(108 203)"
            fill="#fff"
            stroke="#707070"
            stroke-width="1"
            opacity="0.28"
          />
        </clipPath>
      </defs>
      <g transform="translate(-108 -203)" clip-path="url(#a)">
        <g transform="translate(108 205.251)">
          <path
            d="M12.746,0H2.027a.79.79,0,0,0-.746.6L.976,2.05.45,4.527-.01,6.687a.476.476,0,0,0,.477.606h.691c-.018.143-.041.289-.072.436a5.1,5.1,0,0,1-.153.559,5.625,5.625,0,0,1-.289.719c-.024.05,0,.1.046.078A5.61,5.61,0,0,0,2.847,7.293H11.2a.786.786,0,0,0,.735-.606L13.223.6A.477.477,0,0,0,12.746,0ZM7.9,3.805,5.16,5.17c-.373.187-.589.034-.49-.335L5.4,2.113c.1-.373.4-.52.669-.336L8.083,3.142c.271.183.19.481-.177.664Z"
            transform="translate(0.029 0.001)"
            fill="#1e3799"
          />
          <path
            d="M27.388,13H25.1l-.932,4.4a1.118,1.118,0,0,1-1.05.863H14.934l-.3,1.421a.475.475,0,0,0,.477.606h8.347a3.036,3.036,0,0,0,1.39,1.8c.035.021.084-.028.082-.079a4.428,4.428,0,0,1,.015-.717,5.2,5.2,0,0,1,.087-.559q.05-.22.112-.436h.691a.787.787,0,0,0,.735-.606l.461-2.16.525-2.475.308-1.446A.477.477,0,0,0,27.388,13Z"
            transform="translate(-11.885 -10.576)"
            fill="#ed5925"
          />
        </g>
      </g>
    </svg>`;
}
function detectBrowser() {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") != -1 ||
    !!document.documentMode == true
  ) {
    return "IE";
  } else {
    return "Unknown";
  }
}
(function () {
  const installExtesionDialog = document.createElement("div");
  const renderPreviewDialog = document.createElement("div");
  const copiedSuccessFeedback = document.createElement("div");
  const browserPopup = document.createElement("div");
  installExtesionDialog.id = "install-extesion-dialog";
  renderPreviewDialog.id = "render-preview-dialog";
  copiedSuccessFeedback.id = "copied-success-feedback";
  browserPopup.id = "browser-popup-alert";
  document.querySelector("body").appendChild(installExtesionDialog);
  document.querySelector("body").appendChild(renderPreviewDialog);
  document.querySelector("body").appendChild(copiedSuccessFeedback);
  document.querySelector("body").appendChild(browserPopup);
})();
function handleHaalRecordStopVideoCallbackSelect(video) {
  if (globalThis.type) {
    const { sharedUrl } = video;
    if (globalThis.type === "select-video") {
      const selectVideoElement = document.querySelector(".select-video");
      if (selectVideoElement) {
        selectVideoElement.setAttribute("value", sharedUrl);
      }
      if (SelectVideoButton.showPreview) {
        onStopRecording(video);
      }
      if (SelectVideoButton.copyToClipboard) {
        handleCopyToClipboardToast(sharedUrl);
      }
    } else if (globalThis.type === "record-video") {
      const recordVideoElement = document.querySelector(".record-video");
      if (recordVideoElement) {
        recordVideoElement.setAttribute("value", sharedUrl);
      }
      if (RecordVideoButton.showPreview) {
        onStopRecording(video);
      }
      if (RecordVideoButton.copyToClipboard) {
        handleCopyToClipboardToast(sharedUrl);
      }
    } else {
      //do nothing
    }
    globalThis.type = "";
  }
}
//////////////////////////////////////////////
function handleWindowReceiveMessage(event) {
  const {
    data: { command, videos, video },
  } = event;
  switch (command) {
    case "haal-record-stop-video-callback-select":
      handleHaalRecordStopVideoCallbackSelect(video);
      break;
    case "haal-close-integration":
      SelectVideoButton.onFailure({
        success: false,
        data: null,
        message: "User Closed Extension",
      });
      break;
    case "haal-insert-videos": //
      if (videos) {
        SelectVideoButton.onSuccess({
          success: true,
          data: [...videos],
          message: "",
        });
      } else {
        SelectVideoButton.onSuccess({
          success: true,
          data: [video],
          message: "",
        });
      }
      break;
    case "haal-recording-display-video":
      break;
    case "haal-recording-display":
      break;
    default:
      break;
  }
}
window.addEventListener("message", handleWindowReceiveMessage, false);
//////////////////////////////////////////////
