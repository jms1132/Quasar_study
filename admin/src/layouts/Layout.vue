<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title class="absolute-center">{{ $t('board')}}</q-toolbar-title>
				<div>
					<p class="absolute-bottom-right q-mr-lg">
						<q-select
							v-model="lang"
							:options="langOptions"
							dense
							emit-value
							map-options
							options-dense
							style="min-width: 150px"
						/>
					</p>

				</div>

			</q-toolbar>
		</q-header>

	

		<q-drawer
			v-model="leftDrawerOpen"
			:breakpoint="767"
			:width="250"
			bordered
			content-class="bg-primary"
		>
			<q-list dark>
				<q-item-label header></q-item-label>
				<q-item
					clickable
					to="/notice_list"
				>
					<q-item-section avatar>
						<q-icon name="list" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ $t("mainMenu.notice") }}</q-item-label>
					</q-item-section>
				</q-item>
				
				<q-item
					clickable
					to="/qna_list"
				>
					<q-item-section avatar>
						<q-icon name="list" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ $t("mainMenu.qna") }}</q-item-label>
					</q-item-section>
				</q-item>

			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view/>
		</q-page-container>
	</q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
	name: 'Layout',
	data() {
		return {
			lang: this.$i18n.locale,
			langOptions: [
				{ value: 'en-us', label: 'English' },
				{ value: 'ko-kr', label: 'Korean' }
			],

			leftDrawerOpen: this.$q.platform.is.desktop
		}
	},
	methods: {
		openURL
	},
	watch: {
		lang(lang) {
			this.$i18n.locale = lang
		}
	}
}
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
	.q-footer {
		display: none;
	}
}

.q-drawer {
	.q-router-link--exact-active {
		color: white !important;
	}
}
</style>
