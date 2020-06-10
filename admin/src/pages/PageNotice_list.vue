<template >
	<q-page
		padding
		class="q-pt-md"
	>

		<h6 class="q-mb-none q-mt-md q-ml-md">{{ $t('notice.list') }}</h6>

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

		<div class="block">

			<q-table
				class="q-ma-md q-mb-none"
				:data="postData"
				:columns="columns"
				row-key="id"
				:pagination.sync="pagination"
				hide-pagination
				@row-click="onRowClick"
				hide-bottom
			/>
			<div class="row justify-center q-mt-md">
				<q-pagination
					:value="pagination.page"
					color="grey-8"
					:max="pagesNumber"
					size="md"
					:boundary-links="true"
					:to-fn="page=>({query:{page: page}})"
				/>
			</div>

		</div>

		<!--
  Forked from:
  https://quasar.dev/layout/grid/flex-playground#flex-example
-->
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
									<q-btn :to="nav.to">{{ $t('buttons.write')}}</q-btn>
								</q-card-section>
							</q-card>

						</div>
					</div>
				</div>
			</div>
		</div>

	</q-page>
</template>



<script>
import axios from 'axios'

export default {
	data() {
		return {
			postData: [],
			perPage: null,
			currentPage: null,
			clickPage: null,
			keyword: null,
			total: null,
			page: null,

			test: null,

			pagination: {
				// sortBy: 'id',
				// descending: false,
				// page: 1,
				// rowsNumber: 10
				//이건 내가 만든 페이지네이션 자체에서 한페이지에 표현되는 갯수를 정한것이다. 이것과 서버의 perPage를 맞추고 나서 또 각각의 페이지에 대한 자료를 따로 요청해야겠지?
			},

			columns: [
				{
					name: 'id',
					label: ''
				},
				{
					name: 'title',
					required: true,
					label: this.$t('column.name'),
					align: 'left',
					field: 'title'
				},
				{
					name: 'r_day',
					align: 'center',
					label: this.$t('column.day'),
					field: 'created_at'
				}
			],
			nav: {
				to: '/notice_form'
			}
		}
	},

	created() {
		

		this.pagination= {
				sortBy: 'id',
				descending: false,
				page: this.currentPage,
				rowsNumber: this.perPage
				//이건 내가 만든 페이지네이션 자체에서 한페이지에 표현되는 갯수를 정한것이다. 이것과 서버의 perPage를 맞추고 나서 또 각각의 페이지에 대한 자료를 따로 요청해야겠지?
			},
			this.fetchData()
	},
	watch: {
		$route: 'fetchData'
	},
	computed: {
		pagesNumber() {
			//전체 나올 페이지의 수

			return Math.ceil(this.total / this.perPage) //Math.ceil은 소수값이 존재할 때 갑을 올리는 역할을 하는 함수
		}
	},
	methods: {
		fetchData() {
			this.clickPage = this.$route.query.page
				axios
					.get('http://localhost:8000/api/v1/admin/article', {
						params: {
							type: 'notice',
							page: this.clickPage
						}
					})
					.then(response => {
						console.log(response)
						this.postData = response.data.data.data

						this.perPage = response.data.data.per_page //서버에서는 perPage를 한페이지에 담을 게시글수를 정해서 전달한다. 기본이 1페이지고 서버에서 10이라고 정해둿다면 화면에 10개만 전달된다.
						//2페이지를 요청하면 그 다음 10개가 전달되겠지? 이거는 그냥 정말 서버에서 전달되는 갯수이다.

						this.currentPage = response.data.data.current_page
						this.total = response.data.data.total
						console.log(this.clickPage + '번 페이지 클릭')
					})
					.catch(error => {
						console.log(error)
					})
		},
		onRowClick(evt, row) {
			// console.log('clicked on', row.id)

			// this.$router.push('/notice_show')
			// this.$router.push({
			// 	name: 'notice_show',
			// 	params: { id: row.id }
			// })
			this.$router.push({
				name: 'notice_show',
				query: { id: row.id }
			})
		},
		search() {
			axios
				.get('http://localhost:8000/api/v1/admin/article', {
					params: {
						type: 'notice',
						q: this.keyword
					}
				})
				.then(response => {
					this.postData = response.data.data.data
					console.log(response)
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
.my-sticky-dynamic {
	/* height or max-height is important */
	height: 490px;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
	/*  bg  color is  important for th; just  specify one */
	background-color: #027be3;
	font-weight: bold;
	font-size: 15px;
	color: white;
}

thead tr th {
	position: sticky;
	z-index: 1;
}
/* this will be the loading indicator */
thead tr:last-child th {
	/* height of all previous header rows */
	top: 48px;
}
thead tr:first-child th {
	top: 0;
}

q-page {
	position: relative;
}
.input_search {
	width: 260px;
}
</style>







