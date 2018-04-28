import React from 'react';
import { withRouter } from 'react-router';


class DetailPage extends React.Component {
  constructor() {
    super();

    this.state = {
        data: {},
        id: null
    }
  }

  componentWillMount() {
    this.setState({
        id: this.props.match.params.id,
        data: this.props.location.state.data
    })
  }

  render() {
    const { data } = this.state;
    return (
        <div className="container">
            <div className="row center-item">
                <h2 className="col-9 text-center">{ data.Name }</h2>
                <button className="col-1" onClick={() => this.props.history.goBack() }>return</button>
            </div>
            <table className="table table-stripe">
                <tbody>
                    <tr>
                        <td>Coin Name</td>
                        <td>{ data.CoinName }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
}


export default withRouter(DetailPage);