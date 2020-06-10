<template >
	<q-page class="q-ml-xl q-mr-xl">

		<h6>{{ $t('qna.show') }}</h6>
		<div class="qna_write_div">
			<p class="q-mr-lg inline-block">{{ $t('form.title') }}</p>
			<q-input
				style="width:80%"
				class="inline-block"
				outlined
				disable
				v-bind:value="this.title"
			/>

		</div>

		<!-- 내용 div -->
		<div>
			<p class="q-mr-lg inline-block q-mt-xl"> {{ $t('form.content')}} </p>
			<q-input
				class="inline-block qna_contents"
				outlined
				type="textarea"
				style="width:80%"
				disable
				v-bind:value="this.contents"
			/>
		</div>

		<div>
			<div class="flex flex-center column">
				<div
					class="row"
					style="width: 71%; "
				>
					<div
						class="fit row wrap justify-end items-start content-start"
						style="overflow: hidden;"
					>
						<div style="overflow: auto;">
							<q-card>
								<q-card-section>
									<q-btn
										:label="$t('buttons.modify')"
										class="q-mr-sm"
										@click="goEdit"
									></q-btn>
									<q-btn
										:label="$t('buttons.delete')"
										class="q-mr-sm"
										@click="confirm = true"
									></q-btn>
									<q-btn
										class="q-ma-none"
										:label="$t('buttons.list')"
										:to="nav.to"
									></q-btn>
								</q-card-section>
							</q-card>
						</div>
					</div>
				</div>
			</div>
		</div>

		<q-dialog
			v-model="confirm"
			persistent
		>
			<q-card>
				<q-card-section class="row items-center">
					<q-avatar
						icon="delete"
						color="primary"
						text-color="white"
					/>
					<span class="q-ma-lg">{{$t('confirm.delete_ask')}}</span>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
						class=""
						flat
						:label="$t('buttons.cancel')"
						color="primary"
						v-close-popup
					/>
					<q-btn
						class="q-ml-sm"
						flat
						:label="$t('buttons.delete')"
						color="primary"
						v-close-popup
						@click="deleteData"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="register">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{$t('confirm.delete')}}</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					{{$t('confirm.delete_text')}}
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
						flat
						label="OK"
						color="primary"
						:to="nav.to"
						v-close-popup
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>

	</q-page>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			title: null,
			contents: null,
			register: false,
			confirm: false,

			nav: {
				to: '/qna_list'
			}
		}
	},
	created() {
		axios
			.get(
				'http://localhost:8000/api/v1/admin/article/' + this.$route.query.id
			)
			.then(response => {
				this.title = response.data.data.title
				this.contents = response.data.data.contents

				console.log(this.title)
				console.log(this.contents)
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	},
	methods: {
	goEdit(){
	
		this.$router.push({
			name: 'qna_edit',
			query: {id: this.$route.query.id}
			})},
		deleteData() {
			axios
				.delete(
					'http://localhost:8000/api/v1/admin/article/' + this.$route.query.id
				)
				.then(response => {
					console.log(this.$route.query.id)
	
					this.$router.push('/qna_list')
				})
		}
	}
}
</script>

<style>
textarea {
	height: 400px;
}
</style>