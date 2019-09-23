<template>
    <section>
        <div class="container">
            <div class="row">
                <div class="col col-sm-3">
                    <div class="form-group">
                        <label for="symbol">Выберете символ</label>
                        <select
                            id="symbol"
                            v-model="symbol"
                            class="form-control"
                        >
                            <option value="BTCUSDT">BTCUSDT</option>
                            <option value="BNBBTC">BNBBTC</option>
                            <option value="ETHBTC">ETHBTC</option>
                        </select>
                    </div>
                </div>
                <div
                    v-if="events.length"
                    class="list-element col-lg-offset-1 col-md-8"
                >
                    <ul class="list-group">
                        <li
                            v-for="event in events"
                            class="list-group-item"
                        >{{ event.text }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "DropdownSymbol",

        data() {
            return {
                symbol: 'BTCUSDT',
                events: [],
            }
        },

        watch: {
            symbol() {
                this.$root.$dataBus(this.$root).write('changeSymbol', this.symbol);
                this.events = [];
            },
        },

        created() {
            this.$root.$dataBus(this.$root).read('pushEvent', this.addEvent);
        },

        methods: {
            addEvent(data) {
                this.events.unshift(data);
            },
        },
    }
</script>

<style>
    .container .list-element {
        height: 700px;
        overflow-y: scroll;
    }
</style>