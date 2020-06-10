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

		<div class="block">

			<q-table
				class="my-sticky-dynamic q-ma-md q-mb-none"
				:data="postData"
				:columns="columns"
				row-key="id"
				virtual-scroll
				:pagination="pagination"
				:rows-per-page-options="[0]"
				:hide-bottom="true"
				@row-click="onRowClick"
			/>
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
var postData
var perPage
var currentPage

export default {
	data() {
		return {
			postData: [],
			keyword: null,

			nav: {
				to: '/qna_form'
			},
			pagination: {
				rowsPerPage: 0
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
			]
		}
	},
	created() {
		axios
			.get('http://localhost:8000/api/v1/admin/article?type=qna')
			.then(response => {
				console.log(response)
				this.postData = response.data.data.data

				this.perPage = response.data.data.per_page

				this.currentPage = response.data.data.current_page

				console.log(this.postData)
				console.log(this.perPage)
				console.log(this.currentPage)
			})
			.catch(error => {
				console.log(error)
			})
	},

	methods: {
		onRowClick(evt, row) {
			console.log('clicked on', row.id)

			this.$router.push({
				name: 'qna_show',
				query: { id: row.id }
			})
		},
		search() {
			axios
				.get('http://localhost:8000/api/v1/admin/article', {
					params: {
						type: 'qna',
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
	/*	bg	color	is	important	for	th;	just	specify	one	*/
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


.input_search {
	width: 260px;
}
</style>




