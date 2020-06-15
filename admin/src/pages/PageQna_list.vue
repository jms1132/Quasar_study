<template >
	<q-page
		padding
		class="q-pt-md"
	>
		<h6 class="q-mb-none q-mt-md q-ml-md">{{ $t('qna.list') }}</h6>
		<div style="height:65px;">
			<div class="flex flex-center column">
				<div
					id="parent"
					class="fit row wrap justify-end items-start content-start"
					style="overflow: hidden;width: 100%;"
				>
					<div
						class=""
						style="overflow: auto;"
					>
						<q-card style="height: 72px;">
							<q-card-section>
								<q-form @submit="search">
									<q-input
										class="input_search inline-block q-mr-md"
										outlined
										bottom-slots
										v-model="keyword"
										maxlength="12"
										:placeholder="$t('search_hint')"
									/>
									<q-btn
										class="inline-block"
										icon="search"
										type="submit"
									></q-btn>
								</q-form>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</div>
		</div>
		<div id="q-app">
			<div class="flex flex-center column">
				<div
					class="row"
					style="width: 100%;"
				>
					<div
						id="parent"
						class="fit row wrap justify-end items-start content-start"
						style="overflow: hidden;"
					>
						<div style="overflow: auto;">
							<q-card>
								<q-card-section class="q-pt-none">
	<q-btn @click="register_post">{{ $t('buttons.write')}}</q-btn>								</q-card-section>
							</q-card>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="q-pa-md">
			<q-infinite-scroll
				@load="onLoad"
				:offset="250"
			>
				<q-item class="list-header text-white text-left">
					<q-item-section>
						<q-item-label header>글제목
						</q-item-label>
					</q-item-section>
					<q-item-section>
						<q-item-label header>등록일</q-item-label>
					</q-item-section>
				</q-item>
				<q-list
					v-for="(post, id) in infinitePosts"
					:key="id"
					class="caption"
					bordered
				>
					<q-item
						clickable
						:to="{name: 'board_show', query: {id: post.id, form_type: 'show', type: 'qna'}}"
					>
						<q-item-section>
							<q-item-label> {{post.title}}
							</q-item-label>
						</q-item-section>
						<q-item-section>
							<q-item-label> {{post.created_at}}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
				<template>
					<div class="row justify-center q-my-md">
						<q-spinner-dots
							color="primary"
							size="90px"
						/>
					</div>
				</template>
			</q-infinite-scroll>
		</div>
	</q-page>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			postData: [],
			infinitePosts: [],
			keyword: null,
			postId: null,
			page: 1,
		}
	},
	created() {
		this.onLoad
	},
	methods: {
		search() {
			this.page = 1
			this.infinitePosts = []
			axios
				.get('http://localhost:8000/api/v1/admin/article', {
					params: {
						type: 'qna',
						q: this.keyword,
						page: this.page
					}
				})
				.then(response => {
					this.postData = response.data.data.data
					this.infinitePosts = response.data.data.data
					this.page += 1
				})
		},
		onLoad(id, done) {
			axios
				.get('http://localhost:8000/api/v1/admin/article', {
					params: {
						type: 'qna',
						page: this.page,
						q: this.keyword
					}
				})
				.then(response => {
					this.postData = response.data.data.data
					setTimeout(() => {
						if (this.postData.length) {
							this.infinitePosts = this.infinitePosts.concat(this.postData)
							this.page += 1
							done()
						}
					}, 1000)
				})
		},register_post() {
			this.$router.push({
				name: 'board_form',
				query: { form_type: 'register', type: 'qna'}
			})
		}

	}
}
</script>
<style >
.input_search {
	width: 260px;
}
.list-header {
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background-color: #027be3;
	color: white;
	font-size: 15px;
}
</style>




