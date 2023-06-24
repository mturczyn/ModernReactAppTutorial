import { Component } from 'react'

export class FetchDataErrorBoundary extends Component {
  state: any

  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: '' }
  }

  componentDidCatch(error: any, info: any) {
    // Display fallback UI
    this.setState({
      hasError: true,
      error: JSON.stringify(error),
      info: JSON.stringify(info),
    })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ color: 'red' }}>
          <h3>Something went wrong with fetching data.</h3>
          <p>Error: {this.state.error}</p>
          <p>Details: {this.state.info}</p>
        </div>
      )
    }
    return (this.props as any).children
  }
}
