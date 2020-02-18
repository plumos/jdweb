<template>
    <div>
<!--        <side/>-->
        <cfood class="food"/>
    </div>
</template>

<script>
    import cfood from "@/components/content/cfood";
    import Side from "@/components/side/side";
    export default {
        name: "food",
        components:{Side, cfood}
    }
</script>

<style scoped>
    @import "../css/newview.css";
</style>
