<template>
<v-flex xs12 text-xs-center >
      <v-card white>
        <h1>{{title}}</h1>
        <p >{{description}}</p>
      </v-card>
      </v-flex>
</template>


<script>
export default {
    name:"SubHeader",
    props:["title","description"],
    mounted() {}
};
</script>