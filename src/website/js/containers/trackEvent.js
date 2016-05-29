const trackEvent = (event) => {
  ga('send', {
    hitType: 'event',
    eventCategory: event.category,
    eventAction: event.action,
    eventLabel: event.label,
    transport: 'beacon'
  })
}

export default trackEvent;
