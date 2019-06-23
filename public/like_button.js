'use strict';


class Shortener extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: ''
    };

  this.handleChange = this.handleChange.bind(this);
}
  handleChange(e) {
    this.setState({
      url : e.target.value
    });
  }
  render() {
    return (
      <div>
       <input type="text" value={this.state.url} onChange={this.handleChange} style={{padding: '5px'}} />
       <a className="btn btn-primary" href={`/new/${this.state.url}`} style={{padding: '10px'}}>Get Url</a>
      </div>
    );
  }
}


ReactDOM.render(<Shortener />,  document.querySelector('#root'))
