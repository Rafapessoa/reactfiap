import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './style.css';

class Search extends Component {
    constructor() {
        super();
        this.state = { results: [] };
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(event) {
        const value = event.currentTarget.value;

        axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
            .then((data) => {
                this.setState({
                    results: data.data.results,
                });
            })
    }

    renderItem(item) {
        return (
            <ul className="demo-list-item mdl-list">
                <li className="mdl-list__item" key={item.id} >
                    <span className="mdl-list__item-primary-content" >{item.id}</span>
                    <span className="mdl-list__item-primary-content"  >{item.title}</span>
                    <Link to={`/product/${item.id}`} >
                        Detalhes do Produto
                    </Link>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" onChange={this.onSearch} />
                <label className="mdl-textfield__label" for="sample1">Digite um produto...</label>
                <ul>
                    {this.state.results.map(this.renderItem)}
                </ul>
            </div>
        );
    }
}

export default Search;