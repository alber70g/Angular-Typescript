module app.providers {
	'use strict';

	export interface IGridConfig {
		enableColResize: boolean;
		enableSorting: boolean;
		angularCompileRows: boolean;
	}

	export interface IGridConfigProvider {
		$get(): IGridConfig;
	}

	class GridConfigProvider implements ng.IServiceProvider, IGridConfigProvider {
		private config: IGridConfig = {
			enableColResize: true,
			enableSorting: true,
			angularCompileRows: false
		};

		$get() : IGridConfig {
			return this.config;
		}
	}
	
	angular
		.module('app.providers')
		.provider('app.providers.GridConfigProvider', GridConfigProvider);
}