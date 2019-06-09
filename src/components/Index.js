import React, { Component } from 'react';
import Item from './Item';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomList: {
                items: []
            }
        };
    }
    componentDidMount = () => {
        this.fetchRandomList();
    }

    fetchRandomList = () => {
        fetch('http://localhost:3000/lists/random')
        .then(res => res.json())
        .then(data => {
            this.setState({
                randomList: data
            }, () => {
                console.log(this.state);
            })
        })
        .catch(err => console.log('Random fetch error: ', err));
    }

    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.randomList.name}</h1>
                </div>
                <div className="itemList">
                    {this.state.randomList.items.slice(0, 6).map((item, index) => {
                        return (<Item
                                    key={index}
                                    index={index}
                                    item={item}
                                />);
                    })}
                </div>
            </div>
        );
    }
}

export default Index;
