import React, { Component } from 'react';
import axios from 'axios';
import './style.css';
import NumberFormat from 'react-number-format';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loading: true,
            data: {},
        };
    }

    componentDidMount() {
        axios.all([
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
            axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
        ])
            .then(([ item, description ]) => {
                this.setState({
                    data: {
                        ...item.data,
                        description: description.data.plain_text,
                    },
                    loading: false,

                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    renderContent() {
        const { data } = this.state;
        var NumberFormat = require('react-number-format');
        return (
            <div className="container">
                <div align="center" className="main">
                    <h3>{data.title} </h3><br/>                    
                    <div>
                        <img src={data.pictures[0].url} ></img>
                    </div><br/>                    
                    <div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Comprar</button>
                    </div><br/>   
                    <NumberFormat value={data.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} decimalSeparator=',' thousandSeparator='.' prefix={'R$ '} renderText={value => <span>{value}</span>} />
                    <br/><b>Garantia:</b> {data.warranty}<br/>                    
                    <b>Detalhes do Produto</b><br/>
                    {data.description}
                </div>
            </div>
        )
    }


    render() {
        const { data } = this.state;       
        return this.state.loading ?
            <div style={{ fontSize: 40 }} style={{ fontcolor: "Blue" }}> Carregando...</div> :
            this.renderContent();

    }
}

export default Product;