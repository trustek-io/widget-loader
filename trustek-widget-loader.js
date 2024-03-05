;(() => {
  window.TrustekWidget = {}
  TrustekWidget.create = ({ elementId, token }) => {
    window.addEventListener
      ? window.addEventListener('load', () => start(elementId, token), false)
      : window.attachEvent &&
        window.attachEvent('onload', () => start(elementId, token))

    start(elementId, token)
  }

  const start = (elementId, token) => {
    if (document.readyState === 'complete') {
      console.log('loading widget...')

      loadWidget(elementId, token)
    }
  }

  const loadWidget = (elementId, token) => {
    const widgetContainer = document.getElementById(elementId)

    const shadowRoot = widgetContainer.attachShadow({ mode: 'closed' })

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

    widget.appendChild(iframe)

    iframe.addEventListener('load', () => (widgetStyle.display = 'block'))

    const widgetUrl = `https://trading-widget.trustek.io/login?token=${token}`

    iframe.src = widgetUrl
    shadowRoot.appendChild(widget)
  }

  return TrustekWidget
})()
