<template>
    <span class="status-badge" :class="status">
        <b-badge pill :variant="variant">{{status}}</b-badge>
    </span>
</template>

<script>
export default {
    props: ['status'],
    computed: {
        variant () {
            if (this.status == 'void') return 'danger'
            if (this.status == 'draft') return 'light'
            if (this.status == 'active') return 'success'
            return 'primary'
        }
    }
}
</script>
