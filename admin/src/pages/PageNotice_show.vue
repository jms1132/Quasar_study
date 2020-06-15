<template >
	<q-page class="q-ml-xl q-mr-xl">
		<h6>{{ $t('notice.show') }}</h6>
		<form-every></form-every>
	</q-page>
</template>
<script>
export default {
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