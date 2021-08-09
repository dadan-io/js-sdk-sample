# Dadan Sdk CDN

A lightweight JavaScript library for checking, validating, and manipulating Google Dadan Extension.

## How It Works ?

import the following scripts into your web page

```bash
<script src="https://resources-dadan-io.s3.eu-central-1.amazonaws.com/sdk/dadan-extension-core.js"></script>
<scrip src="https://resources-dadan-io.s3.eu-central-1.amazonaws.com/sdk/dadan-extension-cdn.js"></script>
```

## Usage

In your html page include the follwing

```html
<div id="record-video-button"></div>
<!--the div container which holds the button-->
```

In script tag include the following

```javascript
const recordVideoButton = new RecordVideoButton(
  {
    containerId: "record-video-button",
    title: "Select Video",
    type: "select",
    buttonClass: "dd__record__button__default__class",
    buttonStyle: "",
    showSvg: true,
    showPreview: true,
    copyToClipboard: true,
    returnControlId: "return-control-id",
  },
  handleResponse, // handle success
  handleResponse // handle failure
);
```

the handleResponse function , is a callback function which accept object with three parameters

```javascript
function handleResponse({ success, data, message }) {
  if (success) {
    // only false when user close extension
    if (data) {
      // represnts the selected videos , or recorded video object after stop recording
      console.table(data);
    }
  } else {
    console.error(message);
  }
}
```

## Record Button Object

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
