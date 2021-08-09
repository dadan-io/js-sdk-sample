# Dadan Sdk CDN

A lightweight JavaScript library for checking, validating, and manipulating Google Dadan Extension.

## Installation

import the following scripts into your web page

```bash
<script src="https://resources-dadan-io.s3.eu-central-1.amazonaws.com/sdk/dadan-extension-core.js"></script>
<script src="https://resources-dadan-io.s3.eu-central-1.amazonaws.com/sdk/dadan-extension-cdn.js"></script>
```

## Usage

```javascript
const recordVideoButton = new RecordVideoButton(
  {
    containerId: "record-video-button", // the id for control which holds button ....ex : <div id="record-video-button"></div>
    title: "Select Video",
    type: "select",
    buttonClass: "dd__record__button__default__class",
    buttonStyle: "",
    showSvg: true,
    showPreview: true,
    copyToClipboard: true,
    returnControlId: "return-control-id",
  },
  handleResponse,
  handleResponse
);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
