<template>
    <b-dropdown
        right
        :text="perPage"
        variant="outline-dark"
        class="d-inline-block"
        size="xs"
    >
        <b-dropdown-item
        v-for="(size,index) in pageSizes"
        :key="index"
        @click="changePageSize(size)"
        >{{ size }}</b-dropdown-item>
    </b-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'bz-pagesize-dropdown',
    data () {
        return {

        }
    },
    methods: {
        ...mapActions(['setPageSize']),
        changePageSize (size) {
            this.setPageSize(size)
        }
    },
    computed: {
        ...mapGetters(['perPage', 'pageSizes'])
    },
    mounted () {
        console.log('STORE', this.$store)
    }
}
</script>
