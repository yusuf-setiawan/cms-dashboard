<template>
    <div class="top-right-button-container">
          <b-modal
            :static="true"
            id="modalright"
            ref="modalright"
            :no-close-on-backdrop = "true"
            title="Add New Product"
            class="modal-right"
          >
            <b-form>
                <b-row>
                    <input-field type="switch" title="Published" :model.sync="model.published" />
                    <input-field type="text" title="Title" :model.sync="model.title" />
                    <input-field type="select" selectLabel="title" :selectOptions="categories" title="Category" :model.sync="model.category" />
                    <input-field type="money" title="Price" :model.sync="model.price" />
                </b-row>
            </b-form>

            <template slot="modal-footer">
                <b-button
                    variant="outline-secondary"
                    @click="$refs.modalright.hide()"
                >Cancel</b-button>
                <b-button
                    variant="primary"
                    @click="onSave()"
                    class="mr-1"
                >Save</b-button>
            </template>
          </b-modal>
    </div>
</template>

<script>
export default {
    props: [],
    methods: {
        show (params = null) {
            if (!params) {
                this.model = {
                    published: false,
                    title: '',
                    category: null,
                    price: 0
                }
            } else {
                this.model = params
            }
            this.$refs.modalright.show()
        },
        hide () {
            this.$refs.modalright.hide()
        },
        async onSave () {
            try {
                var data = this.$api.save('product', this.model)
                if (!data) {
                    this.$notify('error', 'Error!', 'Failed saving, try again later', { duration: 2000, permanent: false })
                } else {
                    this.$notify('success', 'Success!', 'Data has been saved', { duration: 2000, permanent: false })
                    this.$refs.modalright.hide()
                    this.$emit('success', data)
                }
            } catch (error) {
                this.$notify('error', 'Error!', 'Failed saving, try again later', { duration: 2000, permanent: false })
                console.error(error)
            }
        }
    },
    data () {
        return {
            model: {},
            categories: []
        }
    },
    async mounted () {
        try {
            this.categories = await this.$api.listOptions('category')
        } catch (error) {
            console.error(error)
        }
    }
}
</script>
