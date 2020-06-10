<template >
	<q-page class="q-ml-xl q-mr-xl">

		<h6>{{ $t('notice.edit') }}</h6>
		<q-form @submit="onModify">

			<div class="qna_write_div">
				<p class="q-mr-lg inline-block">{{ $t('form.title') }}</p>
				<q-input
					style="width:80%"
					class="inline-block"
					outlined
					v-model="title"
				/>

			</div>

			<!-- 내용 div -->
			<div>
				<p class="q-mr-lg inline-block q-mt-xl">
					{{ $t('form.content')}}
				</p>
				<q-input
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
									<q-card-section>
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
			</div>
		</q-form>

		<q-dialog v-model="register">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{$t('confirm.edit')}}</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					{{$t('confirm.edit_text')}}
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
			edit_mode: false,
			nav: {
				to: '/notice_list'
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
		onModify() {
			axios({
				method: 'put',
				url:
					'http://localhost:8000/api/v1/admin/article/' + this.$route.query.id,
				data: {
					title: this.title,
					contents: this.contents,
					type: 'notice',
					user_id: '1'
				}
			})
				.then(response => {
					console.log(this.title)
					console.log(response)
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

<style>
textarea {
	height: 400px;
}
</style>