<template>
    <b-table
    :fields="['title', 'price',  'action']"
    responsive
    hover
    @row-clicked="onRowClicked"
    :busy="isBusy"
    :items="items" >

        <template slot="HEAD[category.title]" slot-scope="data">
            <div class="">Category</div>
        </template>

        <template slot="[price]" slot-scope="data">
            <div class="text-nowrap text-right">{{data.value | currency}}</div>
        </template>
        <template slot="HEAD[price]" slot-scope="data">
            <div class="text-nowrap text-right">{{data.label}}</div>
        </template>

        <div slot="table-busy" class="text-center mt-5 my-2 loading" style="position:relative;"></div>

        <div slot="HEAD[action]" slot-scope="data">
            <div class="text-nowrap text-right">{{data.label}}</div>
        </div>
        <div class="text-right" slot="[action]" slot-scope="data">
            <b-button @click="$emit('action', $event, 'view', data.item)"  size="xs" variant="primary">
                <i class="simple-icon-eye"></i>
            </b-button>
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
            this.$emit('action', event, 'view', item)
        }
    }
}
</script>
