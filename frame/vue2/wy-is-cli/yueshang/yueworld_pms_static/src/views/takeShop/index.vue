<template>
    <div class="take-shop-container">
        <BaseInfo />
        <ChangeData />
        <OriginalShop />
        <OriginalOneShop />
        <NewShop />
        <NewOneShop />
    </div>
</template>
<script>
import BaseInfo from './baseInfo'
import ChangeData from './changeData'
import OriginalShop from './originalShop'
import OriginalOneShop from './originalOneShop'
import NewShop from './newShop'
import NewOneShop from './newOneShop'
export default {
    components: { 
        BaseInfo, 
        ChangeData, 
        OriginalShop,
        OriginalOneShop,
        NewShop,
        NewOneShop 
    },
    data () {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.take-shop-container {
    height: 100%;
}
</style>