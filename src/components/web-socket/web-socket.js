import React from "react";
import PropTypes from "prop-types";

class WS extends React.Component {
  state = {
    ws: null,
  };

  static defaultProps = {
    reconnect: false,
  };

  static propTypes = {
    url: PropTypes.string.isRequired,
    reconnect: PropTypes.bool,
    onOpen: PropTypes.func,
    onMessage: PropTypes.func,
    onError: PropTypes.func,
    onClose: PropTypes.func,
    isActive: PropTypes.string,
  };

  send = data => this.state.ws.send(data);

  componentDidMount() {
    this.reconnect = !!this.props.reconnect;
    this._handleWebSocketSetup();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isActive !== this.props.isActive) {
      if (this.connected === false) {
        this._handleWebSocketSetup();
      }
    }
  }

  componentWillUnmount() {
    this.reconnect = false;
    this.state.ws.close();
  }

  render() {
    return null;
  }

  _handleWebSocketSetup = () => {
    const ws = new WebSocket(this.props.url);
    ws.onopen = () => {
      this.connected = true;
      this.props.onOpen && this.props.onOpen();
    };
    ws.onmessage = event => {
      this.props.onMessage && this.props.onMessage(event);
    };
    ws.onerror = error => {
      this.props.onError && this.props.onError(error);
    };
    ws.onclose = () => {
      this.connected = false;
      this.reconnect
        ? this._handleWebSocketSetup()
        : this.props.onClose && this.props.onClose();
    }
    this.setState({ ws });
  };
}

export default WS;
