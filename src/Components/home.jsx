import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const Messari = require('messari-api');
const MessariClient = new Messari();


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            btcCoingecko: "",
            ethCoingecko: "",
            btcMessari: "",
            ethMessari: ""
        }
    }

    componentDidMount() {
        this.getPricesFromCoinGecko();
        this.getPricesFromMessari();
    }

    getPricesFromCoinGecko = async () => {
        let response = await CoinGeckoClient.simple.price({
            ids: ['bitcoin', 'ethereum'],
            vs_currencies: 'usd',
        })
        this.setState({
            btcCoingecko: parseFloat(response.data.bitcoin.usd).toFixed(2),
            ethCoingecko: parseFloat(response.data.ethereum.usd).toFixed(2)
        })
    }

    getPricesFromMessari = async () => {
        let response1 = await MessariClient.assets.fetchMetrics("btc")
        let response2 = await MessariClient.assets.fetchMetrics("eth")
        this.setState({
            btcMessari: parseFloat(response1.data.data.market_data.price_usd).toFixed(2),
            ethMessari: parseFloat(response2.data.data.market_data.price_usd).toFixed(2)
        })
    }

    render() {
        return <div>
            <div style={{ textAlign: "center", height: "20vh" }}><img resizeMode={'cover'} style={{ width: '20%' }} src="/Chainalysis.jpg" /></div>
            <div style={{ backgroundColor: "#ffe9ba", height: "70vh" }}>
                <Grid container spacing={3} columns={20}>
                    <Grid item xs={10} align="center">
                        <Card sx={{ maxWidth: "95%" }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/bitcoin.png"
                                alt="Bitcoin"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align="left" display="inline">
                                    CoinGecko : {this.state.btcCoingecko}
                                </Typography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Typography gutterBottom variant="h5" component="div" align="left" display="inline">
                                    Messari : {this.state.btcMessari}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    Recommended to buy from {this.state.btcCoingecko < this.state.btcMessari ? "CoinGecko" : "Messari"} 
                                    &nbsp;and sell on {this.state.btcCoingecko > this.state.btcMessari ? "CoinGecko" : "Messari"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={10} align="center">
                        <Card sx={{ maxWidth: "95%" }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/ethereum.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align="left" display="inline">
                                    CoinGecko : {this.state.ethCoingecko}
                                </Typography>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Typography gutterBottom variant="h5" component="div" align="right" display="inline">
                                    Messari : {this.state.ethMessari}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    Recommended to buy from {this.state.ethCoingecko < this.state.ethMessari ? "CoinGecko" : "Messari"} 
                                    &nbsp;and sell on {this.state.ethCoingecko > this.state.ethMessari ? "CoinGecko" : "Messari"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Typography textAlign="center" marginTop="40px">
                <Button variant="contained" onClick={() => {
                    this.componentDidMount();
                  }}>Get updated prices</Button>
                </Typography>
                </div>
        </div>
    }
}

export default Home;