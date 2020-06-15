<template >
	<q-page class="q-ml-xl q-mr-xl">

		<h6 v-if="type=='notice'">{{ $t('notice.edit') }}</h6>
		<h6 v-else>{{ $t('qna.edit') }}</h6>
		<form-every></form-every>

	</q-page>
</template>

<script>
export default {
	data() {
		return {
		type: this.$route.query.type
		}
	},
	components: {
		'form-every': require('components/form.vue').default
	}
}
</script>

<style>
textarea {
	height: 400px;
}
</style>