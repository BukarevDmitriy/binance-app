import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import TableForData from './components/TableForData';
import DropdownSymbol from './components/DropdownSymbol';

const routes = [
	{
		path: '',
		redirect: {name: 'table_for_data'}
	},
	{
		name: 'table_for_data',
		path: '/table',
		component: TableForData,
	},
	{
		name: 'dropdown_for_symbol',
		path: '/symbol',
		component: DropdownSymbol,
	},
];

export const router = new VueRouter({
	routes,
	mode: 'history'
});