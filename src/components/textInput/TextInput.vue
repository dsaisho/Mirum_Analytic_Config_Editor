<template>
  <v-flex >
    <v-flex  class="text-sm-left" >{{title}}</v-flex>
    <!--custom dispatch to make v-model work when this component is used -->
    <v-text-field  :value="value" v-on:input.native="$emit('input',$event.target.value)" />
  </v-flex>
</template>

<script>
export default {
  name: "TableInputSingle",
  props: ["value", "title"]
};
</script>
