<template>
<b-row>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>Category</h1>
        <div class="top-right-button-container">
          <b-button
            @click="onNewItem"
            variant="primary"
            size="lg"
            class="top-right-button"
          >New</b-button>

          <modal-form-new-item ref="formNewItem" @success="onSavedNewItem"/>
        </div>
        <piaf-breadcrumb/>

        <div class="mb-2 mt-2">

          <b-collapse id="displayOptions" class="d-md-block">
            <div class="d-block d-md-inline-block mb-2">
              <b-dropdown
                id="ddown1"
                :text="`Sort: ${sort.label}`"
                variant="outline-dark"
                class="mr-1 float-md-left btn-group"
                size="xs"
              >
                <b-dropdown-item
                  v-for="(order,index) in sortOptions"
                  :key="index"
                  @click="changeOrderBy(order)"
                >{{ order.label }}</b-dropdown-item>
              </b-dropdown>

              <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                <b-input :placeholder="$t('menu.search')" v-model="search"/>
              </div>
            </div>

            <div class="float-md-right">
                <span class="text-muted text-small mr-1 mb-2">{{pagination.from}}-{{pagination.to}} of {{ pagination.total }}</span>
                <bz-pagesize-dropdown/>
            </div>
          </b-collapse>
        </div>
        <div class="separator mb-5"/>
      </b-colxx>
    </b-row>

    <template>
      <b-row key="list">
        <b-colxx lg="12" md="12" class="mb-4">
            <b-card>
                <div>
                    <data-list-table @action="onItemAction" :isBusy="!isLoad" :items="items"/>
                </div>
            </b-card>
            <bz-pagination :data.sync="pagination"/>
        </b-colxx>

      </b-row>
    </template>

  </b-colxx>
  </b-row>
</template>

<script>

import DataListTable from './DataListTable'
import ModalFormNewItem from './ModalFormNewItem'
import { mapGetters } from 'vuex'

export default {
    components: {
        DataListTable,
        ModalFormNewItem,
    },
    data () {
        return {
            isLoad: false,
            pagination: { perPage: 4, page: 1, from: 0, to: 0, lastPage: 0, total: 0 },
            sort: { column: 'latest', label: 'Latest' },
            collection: 'category',
            sortOptions: [
                { column: 'latest', label: 'Latest' },
                { column: 'oldest', label: 'Oldest' },
                { column: 'title', label: 'Title' }
            ],
            search: '',
            items: [],
            pageSizes: [4, 8, 12]
        }
    },
    methods: {
        async loadItems () {
            this.isLoad = false

            var filter = {}
            if (this.search) filter = { _q: this.search }

            var sort = { _ucreated: -1 }
            if (this.sort) {
                if (this.sort.column == 'title') sort = { title: 1 }
                if (this.sort.column == 'latest') sort = { _ucreated: -1 }
                if (this.sort.column == 'oldest') sort = { _ucreated: 1 }
            }

            var data = await this.$api.list('category', this.pagination.page, this.perPage, { filter: filter, sort: sort })
            this.pagination = data.meta
            this.items = data.items
            this.isLoad = true
        },
        changePageSize (perPage) {
            this.pagination.perPage = perPage
        },
        changeOrderBy (sort) {
            this.sort = sort
        },
        onNewItem () {
            this.$refs.formNewItem.show()
        },
        onSavedNewItem () {
            this.pagination.page = 1
            this.loadItems()
        },
        async onItemAction (event, action, item) {
            console.log(action, ' Item', item)
            if (action == 'edit') {
                this.$refs.formNewItem.show(item)
            } else if (action == 'delete') {
                if (confirm('Are you sure want to delete this item? ')) {
                    try {
                        await this.$api.remove(this.collection, item._id)
                        this.$notify('success', 'Success!', 'Data has been deleted', { duration: 2000, permanent: false })
                        this.page = 1
                        this.loadItems()
                    } catch (error) {
                        this.$notify('danger', 'Error!', error, { duration: 2000, permanent: false })
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters(['perPage']),
        apiUrl () {
            return this.pagination.page + ' , ' + this.sort.column + this.search
        }
    },
    watch: {
        search () {
            this.pagination.page = 1
        },
        apiUrl () {
            this.loadItems()
        },
        perPage () {
            this.pagination.page = 1
            this.loadItems()
        }
    },
    async mounted () {
        this.loadItems()


        // // contoh ambil semua data category tree
        // this.$api.listAll('category')
        // .then((data)=> {
        //     console.log("ALL CATEGORIES", data);
        // })

        // var users = await this.$api.listUsers({group:'admin'});
        // console.log("USERS", users);
    }
}
</script>
