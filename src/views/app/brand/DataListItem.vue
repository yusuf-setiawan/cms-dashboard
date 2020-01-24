<template>
    <b-card  :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data[id])}" no-body>
        
        <div class="pl-2 d-flex flex-grow-1 min-width-zero">
            <div @click.prevent="clickItem($event,data[id])" class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-start min-width-zero align-items-lg-center">
                <router-link :to="`save/${data[id]}`" class="w-10 w-sm-100">
                    <img :src="data.image.url" class="list-thumbnail responsive border-0" :alt="data.title"/>
                </router-link>
                <p class="w-50 w-sm-100 list-item-heading mb-1 truncate">{{data.title}}</p>
                <div class="w-10 w-sm-100">
                   <b-badge v-if="data.published" pill variant="success">published</b-badge>
                   <b-badge v-else pill variant="danger">draft</b-badge>
                </div>
            </div>
            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <!-- <b-form-checkbox @change="toggleItem($event,data[id])" :checked="selectedItems.includes(data[id])" class="itemCheck mb-0"/> -->
                <!-- <b-button @click="$emit('action', $event, 'view', data)"  size="xs" variant="primary"> 
                    <i class="simple-icon-eye"></i>
                </b-button> -->
                <b-button @click="$emit('action', $event, 'edit', data)"  size="xs" variant="info"> 
                    <i class="simple-icon-pencil"></i>
                </b-button>
                <b-button @click="$emit('action', $event, 'delete', data)"  size="xs" variant="danger"> 
                    <i class="simple-icon-trash"></i>
                </b-button>
            </div>
        </div>
    </b-card>
</template>

<style lang="scss" scoped>

img {
    max-height: 32px;
}
@media only screen and (max-width: 600px) {
    img {
        max-height: 100%;
    }
}


</style>

<script>
export default {
    props: ['data', 'selectedItems', 'fields', 'pk'],
    methods: {
        toggleItem (event, itemId) {
            this.$emit('toggle-item', event, itemId)
        },
        clickItem (event, itemId) {
            this.$emit('click', event, itemId)
        }
    },
    mounted() {
    },
    computed: {
        id() {
            return this.pk || "_id"
        }
    }
}
</script>
