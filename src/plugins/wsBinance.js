import config from '../config/config';

const wsBinance = (app) => {
    if (!app.$_ws_binance) {
        app.$_ws_binance = {
            socket: false,
            dataReceived: false,
            symbol: 'btcusdt',
            bids: {},
            asks: {},
            lastUpdateId: '',
            firstProcessed: true,
            lastU: '',

            start() {
                app.$dataBus(app).read('changeSymbol', (symbol) => {this.resetSocket(symbol)});

                if (!this.dataReceived) {
                    this.getData();
                }

                if (!this.socket) {
                    this.initSocket();
                }
            },

            getData() {
                app.$http.get(config.binanceUrls.restUrl, {
                    params: {
                        symbol: this.symbol.toUpperCase(),
                        limit: '500',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        this.bids = _.keyBy(data.bids, 0);
                        this.asks = _.keyBy(data.asks, 0);
                        this.lastUpdateId = data.lastUpdateId;
                        this.dataReceived = true;

                        app.$dataBus(app).write('pushEvent', {
                            text: `Получены данные для символа ${this.symbol.toUpperCase()}`,
                        });
                        this.pushData();
                    }, (e) => {
                        console.log(e);
                    });
            },

            pushData() {
                app.$dataBus(app).write('pushData', {
                    bids: this.bids,
                    asks: this.asks,
                    symbol: this.symbol.toUpperCase(),
                });
            },

            updateData(data) {
                let bids = _.keyBy(data.b, 0);
                let asks = _.keyBy(data.a, 0);
                let updateBidText = '';
                let updateAskText = '';

                _.forEach(bids, (bid, key) => {
                    if (_.has(this.bids, key) && +bid[1]) {
                        this.bids[key] = bid;
                        updateBidText += ` ${key}`;
                    }
                });
                _.forEach(asks, (ask, key) => {
                    if (_.has(this.asks, key) && +ask[1]) {
                        this.asks[key] = ask;
                        updateAskText += ` ${key}`;
                    }
                });

                if (updateBidText || updateAskText) {
                    app.$dataBus(app).write('pushEvent', {
                        text: `Обновлены цены bid: ${updateBidText} и ask: ${updateAskText}`,
                    });
                }

                this.pushData();
            },


            initSocket() {
                this.socket = new WebSocket(`${config.binanceUrls.wsUrl}${this.symbol}@depth@1000ms`);

                this.socket.onmessage = (evt) => {
                    let data = JSON.parse(evt.data);

                    if (data.e === 'depthUpdate') {
                        if (this.lastUpdateId && data.u <= this.lastUpdateId) {
                            return;
                        }

                        if (this.firstProcessed && this.lastUpdateId) {
                            let lastUpdateIdInc = this.lastUpdateId + 1;

                            if (data.U <= lastUpdateIdInc && data.u >= lastUpdateIdInc) {
                                this.firstProcessed = false;
                                this.lastU = data.u;

                                this.updateData(data);
                            } else {
                                this.resetSocket(this.symbol);
                                return;
                            }
                        }

                        if (!this.firstProcessed && this.lastU + 1 === +data.U) {
                            this.lastU = data.u;
                            this.updateData(data);
                        }
                    }
                };
            },

            resetSocket(symbol) {
                this.stop();
                this.symbol = symbol.toLowerCase();
                this.getData();
                this.initSocket();
            },

            stop() {
                if(this.dataReceived) {
                    this.bids = {};
                    this.asks = {};
                    this.lastUpdateId = '';
                    this.dataReceived = false;
                }

                if (this.socket) {
                    this.socket.close();
                    this.socket = false;
                    this.firstProcessed = true;
                }
            },
        };
    }

    return app.$_ws_binance;
};

export default wsBinance;