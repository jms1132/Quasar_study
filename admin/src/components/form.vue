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
		<!-- =========================================공통적으로 쓰이는 제목, 글내용 input field==================================== -->
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
										@click="goList"
									></q-btn>
								</q-card-section>
								<!-- ===========================페이지가 글내용보기 일때만 나타나는 버튼들(수정, 삭제)================================= -->
								<q-card-section v-else>
									<q-btn
										:label="$t('buttons.register')"
										class="q-mr-sm"
										type="submit"
									></q-btn>
									<q-btn
										class="q-ml-sm"
										:label="$t('buttons.list')"
										@click="goList"
									></q-btn>
								</q-card-section>
								<!-- =================================페이지가 나머지일때(글수정, 글등록) 나오는 버튼==================================== -->
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
		<!-- =======================================글보기 페이지 - 글삭제 기능에서 사용되는 다이얼로그========================================================== -->
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
			form_type: this.$route.query.form_type,
			postNumber: this.$route.query.id,
			// 페이지타입에 따라 나타나는 버튼이나 api요청할 때 쓰이는 쿼리파라미터가 달라진다.(postNumber가 사용될때도 있고 아닐때도 있다.)
			type: this.$route.query.type
			//하나의 vue를 공지사항, 1:1문의 2가지에서 사용하기 위해 던져주는 flag 기능
		}
	},
	created() {
		//글보기, 글수정 페이지에서 사용하는 동작!! 글내용보기와 수정할 때는 처음부터 인풋에 해당게시글 내용이 불러와있어야 한다.
		if (this.form_type == 'edit' || this.form_type == 'show') {
			axios
				.get('http://localhost:8000/api/v1/admin/article/' + this.postNumber)
				.then(response => {
					this.title = response.data.data.title
					this.contents = response.data.data.contents
				})
		}
	},

	methods: {
		goList() {
			this.type == 'notice'
				? this.$router.push('/notice_list')
				: this.$router.push('/qna_list')
		},
		goEdit() {
			this.$router.push({
				name: 'board_edit',
				query: { id: this.postNumber, form_type: 'edit', type: this.type }
			})
		},
		deleteData() {
			//삭제 confirm을 눌렀을 때만 돌아가는 함수
			axios
				.delete('http://localhost:8000/api/v1/admin/article/' + this.postNumber)
				.then(response => {
					this.type == 'notice'
						? this.$router.push('/notice_list')
						: this.$router.push('/qna_list')
				})
		},
		onSubmit() {
			//글등록, 글수정에서 사용하는 함수
			axios({
				method: this.form_type == 'register' ? 'post' : 'put',
				url:
					this.form_type == 'register'
						? 'http://localhost:8000/api/v1/admin/article'
						: 'http://localhost:8000/api/v1/admin/article/' + this.postNumber,
				data: {
					title: this.title,
					contents: this.contents,
					type: this.type,
					user_id: '1'
				}
			}).then(response => {
				this.type == 'notice'
					? this.$router.push('/notice_list')
					: this.$router.push('/qna_list')
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