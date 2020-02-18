<template>
    <div>
<!--        <Side/>-->
        <cfoodcontrol class="fdcontrol"/>
    </div>
</template>

<script>
    import Side from  "../components/side/side"
    import cfoodcontrol from "@/components/content/cfoodcontrol";
    export default {
        name: "foodcontrol",
        components:{cfoodcontrol,Side},
    }
</script>

<style scoped>
    @import "../css/newview.css";
</style>
