;(() => {
  window.TrustekWidget = {}
  TrustekWidget.create = ({ elementId, customerId }) => {
    window.addEventListener
      ? window.addEventListener(
          'load',
          () => start(elementId, customerId),
          false
        )
      : window.attachEvent &&
        window.attachEvent('onload', () => start(elementId, customerId))

    start(elementId, customerId)
  }

  const start = (elementId, customerId) => {
    if (document.readyState === 'complete') {
      console.log('loading widget...')

      loadWidget(elementId, customerId)
    }
  }

  const loadWidget = async (elementId, customerId) => {
    const widgetContainer = document.getElementById(elementId)
    const shadowRoot = widgetContainer.attachShadow({ mode: 'closed' })

    const widget = document.createElement('div')

    const widgetStyle = widget.style
    widgetStyle.display = 'none'
    widgetStyle.boxSizing = 'border-box'
    widgetStyle.overflow = 'hidden'
    widgetStyle.borderRadius = '22px'
    widgetStyle.width = '360px'
    widgetStyle.height = '630px'
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

    const response = await fetch(
      'https://dev-api.trustek.io/api/widget/customer_token',
      {
        method: 'POST',
        body: JSON.stringify({
          customer_id: customerId,
        }),
      }
    )
    const result = await response.json()
    const token = await result.token

    const widgetUrl = `https://trading-widget.trustek.io/login?token=${token}`

    iframe.src = widgetUrl
    iframe.allow = 'clipboard-read; clipboard-write'
    shadowRoot.appendChild(widget)
  }

  return TrustekWidget
})()
