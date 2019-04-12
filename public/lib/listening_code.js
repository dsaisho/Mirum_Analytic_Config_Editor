window.addEventListener("trackEvent", handleTrackEvent, false);

function handleTrackEvent(e){
  const payload = e.detail;
  console.log("Payload dispatched from middleware:: ", payload)
}
