# Recomi SDK

A lightweight SDK for Recomiding an iframe-based application into any website with a floating action button.

## Installation

Add the following script to your website:

```html
<script>
  (function () {
    const onLoad = function () {
      console.log("onLoad");

      const script = document.createElement("script");
      script.src = "./dist/Recomi.umd.cjs";
      script.id = "d7OGBJylbRz2o01jTzm-t";
      script.domain = "www.recomi.co";
      document.body.appendChild(script);
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
  })();
</script>
```

## Features

- Floating action button in the bottom-right corner
- Modal dialog with iframe content
- Initialization state management
- Command queueing before initialization
- Responsive design
- Clean and modern UI

## API

### init(options)

Initialize the SDK with configuration options:

```javascript
recomi("init", {
  iframeUrl: "https://your-app-url.com",
});
```

### getState()

Get the current initialization state:

```javascript
const state = recomi("getState"); // Returns "initialized" or "not-initialized"
```
