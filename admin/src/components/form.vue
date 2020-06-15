<template >
	<q-form @submit="onSubmit">

		<div class="qna_write_div">
			<p class="q-mr-lg inline-block">{{ $t('form.title') }}</p>
			<q-input
				v-if="form_type == 'show'"
				style="width:80%"
				class="inline-block"
				outlined
				disable
				v-model="title"
			/>
			<q-input
				v-else
				style="width:80%"
				class="inline-block"
				outlined
				v-model="title"
			/>
		</div>
		<!-- 내용 div -->
		<div>
			<p class="q-mr-lg inline-block q-mt-xl"> {{ $t('form.content')}}</p>
			<q-input
				v-if="form_type == 'show'"
				style="width:80%"
				class="inline-block"
				outlined
				disable
				type="textarea"
				v-model="contents"
			/>
			<q-input
				v-else
				class="inline-block qna_contents"
				outlined
				type="textarea"
				style="width:80%"
				v-model="contents"
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
								<q-card-section v-if="form_type == 'show'">
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

								<q-card-section v-else>
									<q-btn
										:label="$t('buttons.register')"
										class="q-mr-sm"
										type="submit"
									></q-btn>
									<q-btn
										class="q-ml-sm"
										:label="$t('buttons.list')"
										:to="nav.to"
									></q-btn>

								</q-card-section>
							</q-card>
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
		</div>

	</q-form>
</template>
<script>
import axios from 'axios'

export default {
	data() {
		return {
			title: null,
			contents: null,
			type: 'notice',
			user_id: '1',
			confirm: false,
			nav: {
				to: '/notice_list'
			},
			form_type: this.$route.query.form_type,
			postNumber: this.$route.query.id
		}
	},
	created() {
		if (this.form_type == 'edit' || this.form_type == 'show') {
			axios
				.get('http://localhost:8000/api/v1/admin/article/' + this.postNumber)
				.then(response => {
					this.title = response.data.data.title
					this.contents = response.data.data.contents

					console.log(this.title)
					console.log(this.contents)

					console.log(this.postNumber)
					console.log(this.form_type)
				})
				.catch(error => {
					console.log(error)
				})
		} else if (this.form_type == 'register') {
			console.log(this.form_type)
		} else if (this.form_type == 'show') {
			console.log(this.form_type)
		}
	},

	methods: {
		goEdit() {
			this.$router.push({
				name: 'notice_edit',
				query: { id: this.postNumber, form_type: 'edit' }
			})
		},
		deleteData() {
			axios
				.delete('http://localhost:8000/api/v1/admin/article/' + this.postNumber)
				.then(response => {
					console.log(this.$route.query.id)

					this.$router.push('/notice_list')
				})
		},
		onSubmit() {
			axios({
				method: this.form_type == 'register' ? 'post' : 'put',
				url:
					this.form_type == 'register'
						? 'http://localhost:8000/api/v1/admin/article'
						: 'http://localhost:8000/api/v1/admin/article/' + this.postNumber,
				data: {
					title: this.title,
					contents: this.contents,
					type: 'notice',
					user_id: '1'
				}
			})
				.then(response => {
					this.$router.push('/notice_list')
				})
				.catch(error => {
					console.log(error)
					console.log('실패')
				})
		}
	}
}
</script>
<style >
textarea {
	height: 400px;
}
</style>