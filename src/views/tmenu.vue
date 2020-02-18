<template>
    <div>
<!--        <side/>-->
        <cmenu class="cview"/>
    </div>
</template>

<script>
    import side from '../components/side/side'
    import cmenu from '../components/content/cmenu'
    export default {
        name: "tmenu",
        components:{side,cmenu}
    }
</script>

<style scoped>
    @import "../css/newview.css";
</style>
