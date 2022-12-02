'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Twemoji = _interopDefault(require('react-twemoji'));
var processString = _interopDefault(require('react-process-string'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@media all and (min-width: 0px) and (max-width: 425px) {\n    .tweet {\n        width: 90% !important;\n    }\n}\n\n.tweet {\n    font-size: 15px;\n    text-align: left;\n    padding: 15px 15px 0 15px;\n    max-width: 600px;\n    width: 60%;\n    border: 1px solid #e6ecf0;\n    color: rgb(20, 23, 26);\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n    background: #ffffff;\n    overflow: hidden;\n}\n\n.user-info-right {\n    padding-top: 2px;\n}\n\n.user-name {\n    font-weight: bold;\n}\n\n.user-name-txt {\n    display: inline;\n}\n\n.user-nickname {\n    cursor: pointer;\n    color: rgb(101, 119, 134);\n}\n\n.icon {\n    margin-left: 3px;\n    display: inline;\n    position: relative;\n    top: 4px;\n}\n\n.icon svg {\n    height: 1.25em;\n}\n\n.verified-icon-svg {\n    fill: rgba(29, 161, 242, 1.00);\n}\n\n.tweet-content {\n    padding-top: 6px;\n    font-size: 23px;\n    clear: left;\n}\n\n.tweet-content .txt {\n    padding-bottom: 15px;\n}\n\n.metadata {\n    color: rgb(101, 119, 134);\n    padding-bottom: 15px;\n    border-bottom: 1px solid #e6ecf0;\n}\n\n.rt-likes {\n    padding-top: 15px;\n    padding-bottom: 15px;\n    border-bottom: 1px solid #e6ecf0;\n    color: rgb(101, 119, 134);\n}\n\n.rt-likes strong {\n    color: rgb(20, 23, 26);\n}\n\n.rt-likes .fake-link:not(:first-child) {\n    margin-left: 20px;\n}\n\n.mention, .hashtag {\n    color: rgb(27, 149, 224);\n}\n\n.fake-link {\n    cursor: pointer;\n}\n\n.fake-link:hover {\n    text-decoration: underline;\n}\n\n.avatar-container {\n    margin-right: 10px;\n    float: left;\n}\n\n.avatar {\n    height: 49px;\n    width: 49px;\n    border-radius: 50%;\n    cursor: pointer;\n}\n\n.drop-button {\n    height: 27px;\n    width: 27px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    border-radius: 50%;\n    float: right;\n    transition: 0.2s;\n}\n\n.drop-button svg {\n    width: 1em;\n    height: 1em;\n    fill: rgb(101, 119, 134);\n}\n\n.drop-button:hover {\n    background-color: rgba(29, 161, 242, 0.1);\n}\n\n.drop-button svg:hover {\n    fill: rgb(27, 149, 224);\n}\n\n.bottom-buttons {\n    display: flex;\n    flex-direction: row;\n}\n\n.bottom-button {\n    height: 48px;\n    width: 48px;\n    display: inline-block;\n    cursor: pointer;\n    flex: 0 25%;\n    box-sizing: border-box;\n}\n\n.bottom-button > div {\n    display: flex;\n    align-items: center;\n    height: 100%;\n}\n\n.bottom-button svg {\n    padding: 7px;\n    border-radius: 50%;\n    margin: auto;\n    fill: rgb(101, 119, 134);\n    height: 1.5em;\n    width: 1.6em;\n    transition: 0.2s;\n}\n\n.bottom-button.blue svg:hover {\n    fill: rgb(27, 149, 224);\n}\n\n.bottom-button.green svg:hover {\n    fill: rgb(23, 191, 99);\n}\n\n.bottom-button.red svg:hover {\n    fill: rgb(215, 42, 94);\n}\n\n.bottom-button.blue svg:hover {\n    background-color: rgba(29, 161, 242, 0.1);\n}\n\n.bottom-button.green svg:hover {\n    background-color: rgba(23, 191, 99, 0.1);\n}\n\n.bottom-button.red svg:hover {\n    background-color: rgba(215, 42, 94, 0.1);\n}\n\n/* Images */\n.image-container {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    cursor: pointer;\n}\n\n.image-container img {\n    border-radius: 13px;\n    border: 1px solid #ccd6dd;\n    width: 100%;\n}\n\n.images-container {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    width: 100%;\n    height: 318px;\n    border-radius: 13px;\n    border: 1px solid #ccd6dd;\n}\n\n.images-container img {\n    cursor: pointer;\n}\n\n.full-height-image {\n    width: calc(50% - 1px);\n    height: 100%;\n    overflow: hidden;\n}\n\n.full-height-image img {\n    height: 100%;\n    min-width: 100%;\n}\n\n.left-image {\n    float: left;\n}\n\n.half-height-image {\n    height: 158px;\n    overflow: hidden;\n}\n\n.half-height-image img {\n    width: 100%;\n    min-height: 158px;\n}\n\n.images-container .right-col, .left-col {\n    float: left;\n    width: calc(50% - 1px);\n    height: 100%;\n}\n\n.images-container .horizontal-spacer {\n    height: 2px;\n    overflow: hidden;\n}\n\n.vertical-spacer {\n    width: 2px;\n    height: 100%;\n    float: left;\n}\n\n.tl {\n    border-top-left-radius: 13px;\n}\n\n.bl {\n    border-bottom-left-radius: 13px;\n}\n\n.tr {\n    border-top-right-radius: 13px;\n}\n\n.br {\n    border-bottom-right-radius: 13px;\n}\n\n.twemoji-sm, .twemoji-bg {\n    position: relative;\n    top: 4px;\n}\n\n.twemoji-sm {\n    height: 18px;\n    width: 18px;\n}\n\n.twemoji-bg {\n    height: 28px;\n    width: 28px;\n}\n\n.tweet svg {\n    box-sizing: content-box !important;\n    vertical-align: baseline !important;\n}\n\n/* Lights out */\n.tweet.lightsout {\n    background: #000000;\n    border-color: rgb(47, 51, 54);\n    color: rgb(217, 217, 217);\n}\n\n.lightsout .rt-likes strong {\n    color: rgb(217, 217, 217);\n}\n\n.lightsout .rt-likes, .lightsout .metadata, .lightsout .image-container img, .lightsout .images-container {\n    border-color: rgb(47, 51, 54);\n}\n\n.lightsout .verified-icon-svg, .lightsout .lock-icon-svg {\n    fill: rgba(217, 217, 217, 1.00);\n}\n\n/* Dim */\n.tweet.dim {\n    background: rgb(21, 32, 43);\n    border-color: #38444c;\n    color: rgb(255, 255, 255);\n}\n\n.dim .rt-likes strong {\n    color: rgb(255, 255, 255);\n}\n\n.dim .rt-likes, .dim .metadata, .dim .image-container img, .dim .images-container {\n    border-color: rgb(47, 51, 54);\n}\n\n.dim .verified-icon-svg, .dim .lock-icon-svg {\n    fill: rgb(255, 255, 255);\n}\n";
styleInject(css_248z);

function useDisplay(rawDisplay) {
  var _useState = React.useState([]),
      display = _useState[0],
      setDisplay = _useState[1];

  React.useEffect(function () {
    var validDisplay = ['default', 'dim', 'lightsout'].includes(rawDisplay);
    setDisplay(validDisplay ? rawDisplay : 'default');
  }, [rawDisplay]);
  return display;
}

function DropIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"
  })));
}

function VerifiedIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24",
    "aria-label": "Verified account",
    className: "verified-icon-svg"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
  })));
}

function LockIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24",
    "aria-label": "Locked account",
    className: "lock-icon-svg"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z"
  })));
}

function UserInfo(_ref) {
  var config = _ref.config;
  return React__default.createElement("div", {
    className: "user-info"
  }, React__default.createElement("div", {
    className: "avatar-container"
  }, React__default.createElement("img", {
    className: "avatar",
    src: config.user.avatar,
    alt: config.user.name + ' avatar'
  })), React__default.createElement("div", {
    className: "user-info-right"
  }, React__default.createElement("div", {
    className: "drop-button"
  }, React__default.createElement(DropIcon, null)), React__default.createElement("div", {
    className: "user-name"
  }, React__default.createElement(Twemoji, {
    options: {
      className: 'twemoji-sm'
    },
    // @ts-ignore
    className: "user-name-txt"
  }, React__default.createElement("span", {
    className: "fake-link"
  }, config.user.name)), config.user.verified && React__default.createElement("div", {
    className: "icon"
  }, React__default.createElement(VerifiedIcon, null)), config.user.locked && !config.user.verified && React__default.createElement("div", {
    className: "icon"
  }, React__default.createElement(LockIcon, null))), React__default.createElement("div", {
    className: "user-nickname"
  }, "@", config.user.nickname)));
}

function useText(rawText) {
  var _useState = React.useState(rawText),
      text = _useState[0],
      setText = _useState[1];

  React.useEffect(function () {
    setText(processString([{
      regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_]{1,15})(?:\b(?!@|＠)|$)/,
      fn: handleMention
    }, {
      regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:#(?!\/))([a-zA-Z0-9/_]{1,280})(?:\b(?!#)|$)/,
      fn: handleHashtag
    }, {
      regex: /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
      fn: handleEmoji
    }, {
      regex: /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:https?:\/\/)(\S+\.\S+)/,
      fn: handleUrl
    }])(rawText));
  }, [rawText]);
  return text;
}

function handleMention(key, result) {
  return React__default.createElement("span", {
    key: key
  }, ' ', React__default.createElement("span", {
    className: "fake-link mention"
  }, "@", result[1]));
}

function handleHashtag(key, result) {
  return React__default.createElement("span", {
    key: key
  }, ' ', React__default.createElement("span", {
    className: "fake-link mention"
  }, " #", result[1]));
}

function handleUrl(key, result) {
  return React__default.createElement("span", {
    key: key
  }, ' ', React__default.createElement("span", {
    className: "fake-link mention"
  }, " ", result[1]));
}

function handleEmoji(key, result) {
  return React__default.createElement(Twemoji, {
    key: key,
    options: {
      className: 'twemoji-bg'
    },
    // @ts-ignore
    style: {
      display: 'inline'
    }
  }, result[1]);
}

function useImage(rawImage) {
  var _useState = React.useState([]),
      image = _useState[0],
      setImage = _useState[1];

  React.useEffect(function () {
    var imgArray;

    if (!rawImage) {
      imgArray = [];
    } else {
      imgArray = rawImage && Array.isArray(rawImage) ? rawImage : [rawImage];
    }

    setImage(imgArray);
  }, [rawImage]);
  return image;
}

function ImagesContainer(_ref) {
  var config = _ref.config;
  var image = useImage(config.image);

  switch (image.length) {
    case 1:
      return React__default.createElement("div", {
        className: "image-container"
      }, React__default.createElement("img", {
        src: image[0],
        alt: ""
      }));

    case 2:
      return React__default.createElement("div", {
        className: "images-container two-image-container"
      }, React__default.createElement(OneImageColumn, {
        side: "left",
        image: image[0]
      }), React__default.createElement("div", {
        className: "vertical-spacer"
      }), React__default.createElement(OneImageColumn, {
        side: "right",
        image: image[1]
      }));

    case 3:
      return React__default.createElement("div", {
        className: "images-container three-image-container"
      }, React__default.createElement(OneImageColumn, {
        side: "left",
        image: image[0]
      }), React__default.createElement("div", {
        className: "vertical-spacer"
      }), React__default.createElement(TwoImagesColumn, {
        side: "right",
        image1: image[1],
        image2: image[2]
      }));

    case 4:
      return React__default.createElement("div", {
        className: "images-container four-image-container"
      }, React__default.createElement(TwoImagesColumn, {
        side: "left",
        image1: image[0],
        image2: image[2]
      }), React__default.createElement("div", {
        className: "vertical-spacer"
      }), React__default.createElement(TwoImagesColumn, {
        side: "right",
        image1: image[1],
        image2: image[3]
      }));

    default:
      return React__default.createElement(React__default.Fragment, null);
  }

  function OneImageColumn(_ref2) {
    var side = _ref2.side,
        image = _ref2.image;
    side = sanitizeSide(side);
    var borderSide = getBorderSide(side);
    return React__default.createElement("div", {
      className: "full-height-image " + side + "-image t" + borderSide + " b" + borderSide
    }, React__default.createElement("img", {
      src: image,
      alt: ""
    }));
  }

  function TwoImagesColumn(_ref3) {
    var side = _ref3.side,
        image1 = _ref3.image1,
        image2 = _ref3.image2;
    side = sanitizeSide(side);
    var borderSide = getBorderSide(side);
    return React__default.createElement("div", {
      className: side + "-col"
    }, React__default.createElement("div", {
      className: "half-height-image t" + borderSide
    }, React__default.createElement("img", {
      src: image1,
      alt: ""
    })), React__default.createElement("div", {
      className: "horizontal-spacer"
    }), React__default.createElement("div", {
      className: "half-height-image b" + borderSide
    }, React__default.createElement("img", {
      src: image2,
      alt: ""
    })));
  }

  function sanitizeSide(side) {
    return side === 'right' || side === 'left' ? side : 'left';
  }

  function getBorderSide(side) {
    return side.charAt(0);
  }
}

function Content(_ref) {
  var config = _ref.config;
  var text = useText(config.text);
  return React__default.createElement("div", {
    className: "tweet-content"
  }, text && React__default.createElement("div", {
    className: "txt"
  }, text), React__default.createElement(ImagesContainer, {
    config: config
  }));
}

function Metadata(_ref) {
  var config = _ref.config;
  return React__default.createElement("div", {
    className: "metadata"
  }, config.date, " \xB7 ", React__default.createElement("span", {
    className: "fake-link app"
  }, config.app));
}

function Impact(_ref) {
  var config = _ref.config;

  if (config.retweets === 0 && config.quotedTweets === 0 && config.likes === 0) {
    return React__default.createElement(React__default.Fragment, null);
  }

  return React__default.createElement("div", {
    className: "rt-likes"
  }, config.retweets !== 0 && React__default.createElement("span", {
    className: "fake-link num-rts"
  }, React__default.createElement("strong", null, styleNumber(config.retweets)), ' ', getText('Retweet', config.retweets)), config.quotedTweets !== 0 && React__default.createElement("span", {
    className: "fake-link num-quotes"
  }, React__default.createElement("strong", null, styleNumber(config.quotedTweets)), ' ', getText('Quoted Tweet', config.quotedTweets)), config.likes !== 0 && React__default.createElement("span", {
    className: "fake-link num-likes"
  }, React__default.createElement("strong", null, styleNumber(config.likes)), ' ', getText('Like', config.likes)));

  function styleNumber(num) {
    var div = num / 1000000;

    if (div >= 1) {
      return div.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1') + 'M';
    }

    div = num / 1000;

    if (div >= 1) {
      return div.toFixed(1).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1') + 'K';
    }

    return num;
  }

  function getText(text, count) {
    return count === 1 ? text : text + 's';
  }
}

function CommentIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
  })));
}

function RetweetIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
  })));
}

function LikeIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
  })));
}

function ShareIcon() {
  return React__default.createElement("svg", {
    viewBox: "0 0 24 24"
  }, React__default.createElement("g", null, React__default.createElement("path", {
    d: "M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"
  }), React__default.createElement("path", {
    d: "M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"
  })));
}

function Actions() {
  var actions = [{
    color: 'blue',
    icon: React__default.createElement(CommentIcon, null)
  }, {
    color: 'green',
    icon: React__default.createElement(RetweetIcon, null)
  }, {
    color: 'red',
    icon: React__default.createElement(LikeIcon, null)
  }, {
    color: 'blue',
    icon: React__default.createElement(ShareIcon, null)
  }];
  return React__default.createElement("div", {
    className: "bottom-buttons"
  }, actions.map(function (action, key) {
    return React__default.createElement("div", {
      key: key,
      className: "bottom-button " + action.color
    }, React__default.createElement("div", null, action.icon));
  }));
}

function Tweet(_ref) {
  var config = _ref.config;
  var display = useDisplay(config.display);
  return React__default.createElement("div", {
    className: 'tweet ' + display
  }, React__default.createElement(UserInfo, {
    config: config
  }), React__default.createElement(Content, {
    config: config
  }), React__default.createElement(Metadata, {
    config: config
  }), React__default.createElement(Impact, {
    config: config
  }), React__default.createElement(Actions, null));
}

exports.default = Tweet;
//# sourceMappingURL=fake-tweet.cjs.development.js.map
