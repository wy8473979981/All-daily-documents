<template>
    <div class="common-top" 
        :style="style">
        <span> {{title}} </span>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        width: String
    },
    computed: {
        style () {
            let style = {}
            if (this.width) {
                style.width = this.width
            }
            return style
        }
    },
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .common-top {
        line-height: 32px;
        background: #E5E2DE;
        border-radius: 16px;
        font-size: $font-base-size;
        padding-left: 16px;
    }
</style>