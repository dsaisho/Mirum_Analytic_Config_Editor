class TrackEvent {
  constructor(classSelector = "", useDocument = false) {
    this.classSelector = classSelector;
    this.useDocument = useDocument;
    this.videoData = [];
    this.tagAttrMap = {
      asset_id: "data-asset-id"
    };
    this.EventTypes = {
      FORM_START: {
        eventType: "FORM_START",
        eventProps: {
          asset_id: "data-asset-id",
          event_name: "data-event-name",
          form_type: "data-form-type"
        }
      },
      CLICK_TO_CALL: {
        eventType: "CLICK_TO_CALL",
        eventProps: {
          asset_id: "data-asset-id",
          event_name: "data-event-name",
          phone_number: "data-phone-number"
        }
      },
      CTA_ENGAGED: {
        eventType: "CTA_ENGAGED",
        eventProps: {
          asset_id: "data-asset-id",
          event_name: "data-event-name"
        }
      },
      FORM_COMPLETE: {
        eventType: "FORM_COMPLETE",
        eventProps: {
          asset_id: "",
          event_name: "",
          form_type: ""
        }
      },
      VIDEO_STARTED: {
        eventType: "VIDEO_STARTED",
        eventProps: {
          asset_id: "",
          video_id: "",
          event_name: "",
          time_stamp: ""
        }
      },
      VIDEO_PAUSED: {
        eventType: "VIDEO_PAUSED",
        eventProps: {
          asset_id: "",
          video_id: "",
          event_name: "",
          time_stamp: ""
        }
      },
      VIDEO_UNPAUSED: {
        eventType: "VIDEO_UNPAUSED",
        eventProps: {
          asset_id: "",
          video_id: "",
          event_name: "",
          time_stamp: ""
        }
      },
      VIDEO_COMPLETED: {
        eventType: "VIDEO_COMPLETED",
        eventProps: {
          asset_id: "",
          video_id: "",
          event_name: "",
          time_stamp: ""
        }
      }
    };
    this.updateListeners();

    //POLYFILL FOR new 'CustomEvent()'
    if ("function" != typeof window.CustomEvent) {
      function CustomEvent(t, e) {
        e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
      }
      (CustomEvent.prototype = window.Event.prototype),
        (window.CustomEvent = CustomEvent);
    }
    //POLYFILL FOR 'Array.find()'
    Array.prototype.find ||
      Object.defineProperty(Array.prototype, "find", {
        value: function(r) {
          if (null == this)
            throw new TypeError('"this" is null or not defined');
          var e = Object(this),
            t = e.length >>> 0;
          if ("function" != typeof r)
            throw new TypeError("predicate must be a function");
          for (var n = arguments[1], i = 0; i < t; ) {
            var o = e[i];
            if (r.call(n, o, i, e)) return o;
            i++;
          }
        },
        configurable: !0,
        writable: !0
      });
    //END POLYFILLS
    console.log("INITING TRACK EVENT");
  } //END CONSTRUCTOR

  getSecondsSinceLastVideoEvent(id) {
    const nowTime = new Date().getTime();
    const videoStartTime = this.getVideoObjectById(id).videoStartTime;
    let secondsPast = (nowTime - videoStartTime) / 1000;

    return parseInt(secondsPast) + "s";
  }

  setVideoStartTime(id) {
    //check the videoData array to see if we already have an object for the video id, if not then create one
    //add the videoStartTime property with a new Date() to begin tracking
    const videoObj = this.getVideoObjectById(id);
    const timeInMils = new Date().getTime();
    if (videoObj) {
      videoObj.videoStartTime = timeInMils;
    } else {
      const newVideoObj = { video_id: id, videoStartTime: timeInMils };
      this.videoData.push(newVideoObj);
    }
  }

  getVideoObjectById(id) {
    return this.videoData.find(videoObj => videoObj.video_id == id);
  }

  handleClickTagClicks(e) {
    const el = e.target ? e.target : e;
    const getAttr = (_e, _attr) => _e.getAttribute(_attr);






    const formatClickTagProps = e => {
      //todo refactor to not need this conditional below
      const eventType = getAttr(e, "data-event-type");
      const eventPropsMap = this.EventTypes[eventType].eventProps;
      const eventProps = {};

      Object.keys(eventPropsMap).forEach(
        key => (eventProps[key] = getAttr(e, eventPropsMap[key]))
      );
      return eventProps;
    };

    let eventPayload = {
      eventType: getAttr(el, "data-event-type"),
      eventProps: formatClickTagProps(el)
    };
    this.track(eventPayload);
  }

  documentClickedHandler(e) {
    let containsTrackInfo = e.path.find(
      item =>
        item.classList ? item.classList.contains(this.classSelector) : null
    );
    containsTrackInfo ? this.handleClickTagClicks(containsTrackInfo) : null;
  }

  updateListeners() {
    //condition to put listener for tag clicks on document vs individual items.
    const that = this;
    this.useDocument
      ? document.addEventListener("click", function(e) {
          that.documentClickedHandler(e);
        })
      : this.addListenersForEachTag();
  }

  addListenersForEachTag() {
    const trackerClassNames = document.getElementsByClassName(
      this.classSelector
    );
    //add listeners to click tags per given classname
    for (var i = 0; i < trackerClassNames.length; i++) {
      trackerClassNames[i].addEventListener(
        "click",
        this.handleClickTagClicks.bind(this)
      );
    }
  }

  track(_eventPayloadObject) {
    const eventProps = _eventPayloadObject.eventProps;

    switch (_eventPayloadObject.eventType) {
      case "VIDEO_STARTED":
        this.setVideoStartTime(eventProps.video_id);

        break;

      case "VIDEO_PAUSED":
        eventProps.secondsSinceLastEvent = this.getSecondsSinceLastVideoEvent(
          eventProps.video_id
        );

        break;

      case "VIDEO_UNPAUSED":
        this.setVideoStartTime(eventProps.video_id);

        break;

      case "VIDEO_COMPLETED":
        eventProps.secondsSinceLastEvent = this.getSecondsSinceLastVideoEvent(
          eventProps.video_id
        );

        break;
    }
    const TrackEvent = new CustomEvent("trackEvent", {
      detail: _eventPayloadObject
    });
    window.dispatchEvent(TrackEvent);
  }
}
export default TrackEvent;
