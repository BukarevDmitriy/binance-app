<template>
	<div>
		<app-header></app-header>
		<router-view></router-view>
	</div>
</template>

<script>
	import AppHeader from './components/Header'
	import wsBinance from './plugins/wsBinance';
	import dataBus from './plugins/dataBus';

	export default {
		created() {
			this.$addPlugin('dataBus', dataBus);
			this.$addPlugin('wsBinance', wsBinance);
			this.$wsBinance(this).start();
		},

		beforeDestroy() {
			this.$wsBinance(this).stop();
		},

		components: {
			AppHeader,
		},
	}
</script>

<style>

</style>