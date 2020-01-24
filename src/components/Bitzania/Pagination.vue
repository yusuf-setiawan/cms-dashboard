<template>
    <b-pagination-nav v-if="data.lastPage > 0"
        :number-of-pages="data.lastPage"
        :link-gen="linkGen"
        v-model="data.page"
        :per-page="perPage"
        align="center"
    >
        <template v-slot:next-text>
            <i class="simple-icon-arrow-right"/>
        </template>
        <template v-slot:prev-text>
            <i class="simple-icon-arrow-left"/>
        </template>
        <template v-slot:first-text>
            <i class="simple-icon-control-start"/>
        </template>
        <template v-slot:last-text>
            <i class="simple-icon-control-end"/>
        </template>
    </b-pagination-nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'bz-pagination',
    props: ['data'],
    methods: {
        linkGen (pageNum) {
            return '#page-' + pageNum
        }
    },
    computed: {
        ...mapGetters(['perPage']),
        page () {
            return this.data.page
        }
    },
    watch: {
        page () {
            this.$emit('update:data', this.data)
        }
    }
}
</script>
