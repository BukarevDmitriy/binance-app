<template>
    <header>
        <div class="container">
            <div class="row">
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <ul class="nav navbar-nav">
                            <router-link
                                :to="{name: 'table_for_data'}"
                                tag="li"
                                active-class="active"
                            >
                                <a href="#">Таблица с данными</a>
                            </router-link>
                            <router-link
                                :to="{name: 'dropdown_for_symbol'}"
                                tag="li"
                                active-class="active"
                            >
                                <a href="#">Выбор символа</a>
                            </router-link>
                        </ul>
                    </div>
                </nav>
            </div>
            <hr>
        </div>
    </header>
</template>

<script>
    export default {
        name: "AppHeader"
    }
</script>

<style>

</style>