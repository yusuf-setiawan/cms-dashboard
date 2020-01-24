<template>
    <div class="top-right-button-container">
          <b-modal
            :static="true"
            id="modalright"
            ref="modalright"
            :no-close-on-backdrop = "true"
            title="Add New Category"
            class="modal-right"
          >
            <b-form>
                <b-row>
                    <input-field type="switch" title="Published" :model.sync="model.published" />
                    <input-field type="text" title="Title" :model.sync="model.title" />
                    <input-field type="textarea" title="Description" :model.sync="model.description" />
                    <input-field ref="imageField" type="image" title="Image" :model.sync="model.image" />
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
                    description: '',
                    image: ''
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
                var data = this.$api.save('category', this.model)
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
        }
    },
}
</script>
