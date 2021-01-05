<template>
    <input type="checkbox" :checked="value" @change="$emit('click')">
        
   
</template>
<script>
export default {
    props:['value']
}
</script>
