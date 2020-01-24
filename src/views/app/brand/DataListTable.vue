<template>
    <b-table
    :fields="['image', 'title', 'published', 'action']"
    responsive
    hover
    @row-clicked="onRowClicked"
    :busy="isBusy"
    :items="items" >
        <template slot="[published]" slot-scope="data">
            <b-badge v-if="data.value" pill variant="success">published</b-badge>
            <b-badge v-else pill variant="danger">draft</b-badge>
        </template>

        <template slot="[image]" slot-scope="data">
            <img :src="data.value.url" class="list-thumbnail responsive border-0"/>
        </template>

        <div slot="table-busy" class="text-center mt-5 my-2 loading" style="position:relative;"></div>

        <div slot="HEAD[action]" slot-scope="data">
            <div class="text-nowrap text-right">{{data.label}}</div>
        </div>
        <div class="text-right" slot="[action]" slot-scope="data">
            <b-button @click="$emit('action', $event, 'edit', data.item)"  size="xs" variant="info">
                <i class="simple-icon-pencil"></i>
            </b-button>
            <!-- <b-button @click="$emit('action', $event, 'delete', data.item)"  size="xs" variant="danger">
                <i class="simple-icon-trash"></i>
            </b-button> -->
        </div>
    </b-table>
</template>

<script>
export default {
    props: ['items', 'isBusy'],
    methods: {
        onRowClicked (item, index, event) {
            this.$emit('action', event, 'edit', item)
        }
    }
}
</script>
