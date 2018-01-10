import React from 'react';
import Particles from 'react-particles-js';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.addIng = this.addIng.bind(this)

        this.state = {
            model: this.props.model || {greeting: ''},
            ingList: []
        }
    }

    loadModelFromServer = () => {
        let url = '/data/home';
        let header = new Headers({"Content-type": "application/json"});
        let init = {
            method: 'GET',
            header: header,
            cache: 'no-cache'
        };
        let request = new Request(url, init);
        fetch(request).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Network response was not ok: status=${response.status}`);
        }).then((result) => {
            this.setState({model: result});
        }).catch((error) => {
            console.error(`Cannot fetch data from the server: url=${url}, error=${error.message}`)
        });
    }

    componentDidMount = () => {
        this.loadModelFromServer();
    }

    addIng(e) {
        e.preventDefault();

        var ingListTmp = this.state.ingList
        var ing = this.refs.ing.value;
        ingListTmp.push(ing)
        this.setState({ingList: ingListTmp})
    }

    render() {
        var ingListHtml = []
        for (var i = 0; i < this.state.ingList.length; i++) {
            ingListHtml.push(<p style={ingStyle}>{this.state.ingList[i]}</p>)
        }

        return (
            <div>
              <Particles
                params={{
                  particles: {
                    number: {
                      value: 10
                    },
                    size: {
                      value: 10,
                      random: false
                    },
                    line_linked: {
                      enable: false
                    },
                    shape: {
                      type: 'image',
                      image: {
                        src: 'https://img15.hostingpics.net/pics/494463burger.png',
                        width: 40,
                        height: 50
                      }
                    },
                    move: {
                      out_mode: 'out',
                      speed: 10,
                      direction: 'top'
                    }
                  }
                }}
                style={{position: 'absolute'}}
              />
              <h1 style={titleStyle}>FoodLearning</h1>
              <div style={ingredientsStyle}>
                <div style={buttonStyle}>
                  <form onSubmit={this.addIng}>
                    <button>Add<input style={{visibility:'hidden', position:'absolute'}} type="submit" ref="submit" value=''/></button>
                    <a><button>Send</button></a>
                    <input className="form-control" style={inputStyle} ref="ing" placeholder="Salade" type="text"/>
                  </form>
                </div>
                <div style={{backgroundColor: '#F0F0F0'}}>
                  <h3>Ingredients :</h3>
                  {ingListHtml}
                </div>
              </div>
            </div>
        );
    }
}

var titleStyle = {
  position: 'absolute',
  top: '20%',
  left: '43%',
  color: '#E0E0E0',
  fontFamily: 'Verdana'
}

var ingredientsStyle = {
  position: 'absolute',
  top: '30%',
  left: '45%',
  width: '200px',
  color: '#303030',
  fontFamily: 'Verdana'
}

var inputStyle = {
  marginBottom: '10px',
  width:'180px'
}

var ingStyle = {
  marginBottom: '10px',
  width:'180px'
}

var buttonStyle = {
  textAlign: 'center',
  margin: '10px'
}


module.exports = Home;
