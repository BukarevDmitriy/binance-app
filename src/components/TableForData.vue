<template>
    <section>
        <div class="container">
            <div class="row">
                <div
                    class="col col-sm-12"
                    :class="{'content': !loading}"
                >
                    <loader v-if="loading"></loader>

                    <table
                        v-if="!loading"
                        class="table table-bordered text-center"
                    >
                        <caption>{{ symbol }}</caption>
                        <tr>
                            <td>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Amount</th>
                                            <th class="text-center">Price</th>
                                            <th class="text-center table__hide-mob">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table__col_left">
                                        <tr v-for="item in bids">
                                            <td>{{ item[1] }}</td>
                                            <td>{{ item[0] }}</td>
                                            <td class="table__hide-mob">{{ (item[0] * item[1]).toFixed(10) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Amount</th>
                                            <th class="text-center">Price</th>
                                            <th class="text-center table__hide-mob">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table__col_right">
                                        <tr v-for="item in asks">
                                            <td>{{ item[1] }}</td>
                                            <td>{{ item[0] }}</td>
                                            <td class="table__hide-mob">{{ (item[0] * item[1]).toFixed(10) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Loader from './Loader';

    export default {
        name: "TableForData",

        components: {
            Loader,
        },

        data() {
            return {
                loading: true,
                symbol: '',
                bids: [],
                asks: [],
            }
        },

        created() {
            this.$root.$dataBus(this.$root).read('pushData', this.applyData);
        },

        methods: {
            applyData(data) {
                this.bids = data.bids;
                this.asks = data.asks;
                this.symbol = data.symbol;
                this.loading = false;
            },
        },
    }
</script>

<style>
    .content {
        height: 700px;
        overflow: hidden;
    }

    .content:hover {
        overflow-y: scroll;
    }

    table {
        position: relative;
        border-top: 0!important;
    }

    th {
        position: sticky;
        top: 0;
        color: #fff;
        background-color: #333;
    }

    .table .table__col_left {
        background: #dc3545
    }

    .table .table__col_right {
        background: #8BC34A
    }

    @media screen and (max-width: 768px){
        .content .table__hide-mob {
            display: none;
        }
    }
</style>