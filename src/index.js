import React from "react";
import { subscribe } from "mailigen";
import PropTypes from "prop-types";

class Mailigen extends React.Component {
  static propTypes = {
    from: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string,
    apiKey: PropTypes.string,
    options: PropTypes.object
  };
  state = {
    loading: false,
    success: false,
    error: null
  };

  doSubscribe = async e => {
    e.preventDefault();
    const { email, id, apiKey: apikey, from: FROM, options } = this.props;
    this.setState({
      loading: true
    });

    const idProp = id ? { id } : {};
    const apiKeyProp = apikey ? { apikey } : {};

    try {
      const res = await subscribe(
        email,
        { FROM },
        {
          ...idProp,
          ...apiKeyProp,
          ...options
        }
      );

      if (res === true) {
        this.setState({
          success: true,
          loading: false
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message
      });
    }
  };

  render() {
    const props = {
      loading: this.state.loading,
      error: this.state.error,
      success: this.state.success,
      doSubscribe: this.doSubscribe
    };
    return this.props.children(props);
  }
}

export default Mailigen;
