class RecordVideoButton {
  constructor(options) {
    this.initialize(({ supported, browserType }) => {
      if (supported) {
        if (Object.keys(options).length > 0) {
          const {
            showSvg = true,
            title = "Record Video",
            buttonClass = "dd__record__button__default__class",
            buttonStyle = "",
            returnControlId = "",
          } = options;
          this.returnControlId = returnControlId !== "" ? returnControlId : "";
          this.createButtonWithOptions(
            showSvg,
            title,
            buttonClass,
            buttonStyle,
            returnControlId
          );
        } else {
          this.returnControlId = "";
          this.createButtonWithoutOptions();
        }
        window.addEventListener(
          "message",
          this.recordVideoMessageListener,
          false
        );
      } else {
        alert(`${browserType} is not supported.`);
      }
    });
  }
  initialize = (callBack) => {
    if (detectBrowser() === "Chrome") {
      callBack({ supported: true, browserType: "chrome" });
    } else {
      callBack({ supported: false, browserType: detectBrowser() });
    }
  };
  createButtonWithOptions = (
    showSvg,
    title,
    buttonClass,
    buttonStyle,
    returnControlId
  ) => {
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
    if (document.body.hasAttribute("haal-recording-extension")) {
      window.postMessage({ command: "haal-recording-display" }, location.href);
    } else {
      showInstallExtensonDialog(true);
    }
  };
  recordVideoMessageListener = (event) => {
    debugger;
    const {
      data: { command, videos, video },
    } = event;
    switch (command) {
      case "haal-record-stop-video-callback-select":
        const { sharedUrl } = video;
        alert(this.returnControlId);
        if (
          this.returnControlId &&
          document.getElementById(this.returnControlId)
        ) {
          document
            .querySelector(`#${this.returnControlId}`)
            .setAttribute("value", sharedUrl);
        }
        onStopRecording(video);
        break;
      case "haal-recording-display":
        break;
      default:
        break;
    }
  };
}
//////////////////////////////////////////////
class SelectVideoButton {
  constructor(options, successCallBack, errorCallBack) {
    this.initialize(({ supported, browserType }) => {
      if (supported) {
        this.successCallBack = successCallBack;
        this.errorCallBack = errorCallBack;
        if (Object.keys(options).length > 0) {
          const {
            showSvg = true,
            title = "Select Video",
            buttonClass = "dd__record__button__default__class",
            buttonStyle = "",
            returnControlId = "",
          } = options;
          this.returnControlId = returnControlId !== "" ? returnControlId : "";
          this.createButtonWithOptions(
            showSvg,
            title,
            buttonClass,
            buttonStyle,
            returnControlId
          );
        } else {
          this.returnControlId = "";
          this.createButtonWithoutOptions();
        }
        window.addEventListener(
          "message",
          this.selectVideoMessageListener,
          false
        );
      } else {
        alert(`${browserType} is not supported.`);
      }
    });
  }
  initialize = (callBack) => {
    if (detectBrowser() === "Chrome") {
      callBack({ supported: true, browserType: "chrome" });
    } else {
      callBack({ supported: false, browserType: detectBrowser() });
    }
  };
  createButtonWithOptions = (
    showSvg,
    title,
    buttonClass,
    buttonStyle,
    returnControlId
  ) => {
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
  };
  onSuccess = (data) => {
    this.successCallBack(data);
  };
  onFailure = (data) => {
    this.errorCallBack(data);
  };
  selectVideoMessageListener = (event) => {
    debugger;
    const {
      data: { command, videos, video },
    } = event;
    if (command) {
      switch (command) {
        case "haal-record-stop-video-callback-select":
          const { sharedUrl } = video;
          alert(this.returnControlId);
          if (
            this.returnControlId &&
            document.getElementById(this.returnControlId)
          ) {
            document
              .querySelector(`#${this.returnControlId}`)
              .setAttribute("value", sharedUrl);
          }
          onStopRecording(video);
          break;
        case "haal-close-integration":
          this.onFailure({
            success: false,
            data: null,
            message: "User Closed Extension",
          });
          break;
        case "haal-insert-videos":
          if (videos) {
            this.onSuccess({
              success: true,
              data: [...videos],
              message: "",
            });
          } else {
            this.onSuccess({
              success: true,
              data: [video],
              message: "",
            });
          }
          break;
        case "haal-recording-display-video":
          break;
        default:
          break;
      }
    }
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
          <iframe width="560" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen
                      allowfullscreen src="${embedUrl}"></iframe>
                  <div class="dd-preview-header">
                      <img src="./dadan.png" alt="dadan video preview" />
                      <div class="dd-preview-buttons">
                          <button id="copy-to-clipboard" onclick="handleCopyToClipboard('${sharedUrl}')" class="btn btn-copy" type="button">
                              <img src="./link.svg" alt='Copy Recording' />
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
                  <img src="./dadan.png" alt="missing chrome extentsion">
                  <p>dadan extentsion is not installed, would you like to install it now ?</p>
                  <div class="dd-dialog-buttons">
                      <button class="btn btn-install" onclick="handleInstallClick()" type="button">Install</button>
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
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return "Edge";
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
  installExtesionDialog.id = "install-extesion-dialog";
  renderPreviewDialog.id = "render-preview-dialog";
  document.querySelector("body").appendChild(installExtesionDialog);
  document.querySelector("body").appendChild(renderPreviewDialog);
})();
//////////////////////////////////////////////
