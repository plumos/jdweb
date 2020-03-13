<template>
    <div>
        <cfoodchange class="food"/>
    </div>
</template>

<script>
    import cfoodchange from "@/components/content/cfoodchange";
    import Side from "@/components/side/side";
    export default {
        name: "foodchange",
        components:{Side, cfoodchange}
    }
</script>

<style scoped>
    @import "../css/newview.css";
</style>
