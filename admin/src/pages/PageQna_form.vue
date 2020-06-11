<template >
	<q-page class="q-ml-xl q-mr-xl">

		<h6>{{ $t('qna.write') }}</h6>
		<q-form @submit="onSubmit">

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
			<p class="q-mr-lg inline-block q-mt-xl"> {{ $t('form.content')}}
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

		<q-dialog v-model="register">
			<q-card>
				<q-card-section>
					<div class="text-h6">{{$t('confirm.register')}}</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					{{$t('confirm.register_text')}} </q-card-section>

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
		</q-form>

	</q-page>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			register: false,
			edit_mode: false,
					title: null,
			contents: null,
				type: null,
			user_id: null,
			nav: {
				to: '/qna_list'
			}
		}
	},
methods: {
		onSubmit() {

			axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/admin/article',
				data: {
					title: this.title,
					contents: this.contents,
					type: 'qna',
					user_id: '1'
				}
			})
				.then(response => {

					this.$router.push('/qna_list')
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