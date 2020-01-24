<template>
    <b-card  :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data[id])}" no-body>

        <div class="pl-2 d-flex flex-grow-1 min-width-zero">
            <div @click.prevent="clickItem($event,data[id])" class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-start min-width-zero align-items-lg-center">
                <router-link :to="`save/${data[id]}`" class="w-10 w-sm-100">
                    <img :src="data.image.url" class="list-thumbnail responsive border-0" :alt="data.title"/>
                </router-link>
                <p class="w-10 list-item-heading mb-1 truncate">{{data.title}}</p>
                <p class="mb-1 text-muted text-small w-70 w-sm-100">{{data.price}}</p>
                <p class="mb-1 text-muted text-small w-10 w-sm-100">{{data.published}}</p>
                <div class="w-15 w-sm-100">
                   <b-badge pill variant="success">{{ data.published }}</b-badge>
                </div>
            </div>
            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <b-form-checkbox @change="toggleItem($event,data[id])" :checked="selectedItems.includes(data[id])" class="itemCheck mb-0"/>
            </div>
        </div>
    </b-card>
</template>

<style lang="scss" scoped>
img {
    max-height: 32px;
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
    mounted () {
    },
    computed: {
        id () {
            return this.pk || '_id'
        }
    }
}
</script>
