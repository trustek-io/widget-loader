;(() => {
  window.TrustekWidget = {}
  TrustekWidget.create = ({ elementId, userId }) => {
    window.addEventListener
      ? window.addEventListener('load', () => start(elementId, userId), false)
      : window.attachEvent &&
        window.attachEvent('onload', () => start(elementId, userId))
  }

  const start = (elementId, userId) => {
    if (document.readyState === 'complete') {
      console.log('loading widget...')
      loadWidget(elementId, userId)
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          console.log('loading widget...')
          loadWidget(elementId, userId)
        }
      })
    }
  }

  const loadWidget = (elementId, userId) => {
    const widgetContainer = document.getElementById(elementId)
    const widget = document.createElement('div')

    const widgetStyle = widget.style
    widgetStyle.display = 'none'
    widgetStyle.boxSizing = 'border-box'
    widgetStyle.overflow = 'hidden'
    widgetStyle.borderRadius = '22px'
    widgetStyle.width = '300px'
    widgetStyle.height = '565px'
    widgetStyle.position = 'absolute'

    const iframe = document.createElement('iframe')

    const iframeStyle = iframe.style
    // iframeStyle.boxSizing = "borderBox";
    widgetStyle.borderRadius = '22px'
    iframeStyle.position = 'absolute'
    iframeStyle.overflow = 'hidden'
    iframeStyle.right = 0
    iframeStyle.top = 0
    iframeStyle.width = '100%'
    iframeStyle.height = '100%'
    iframeStyle.border = 0
    iframeStyle.margin = 0
    iframeStyle.padding = 0
    // iframeStyle.width = "300px";

    widget.appendChild(iframe)

    iframe.addEventListener('load', () => (widgetStyle.display = 'block'))

    const widgetUrl = `http://localhost:8085/dashboard?userId=${userId}`

    iframe.src = widgetUrl
    widgetContainer.appendChild(widget)
  }

  return TrustekWidget
})()
