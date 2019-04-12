<template>
  <div class="display-1 cyan py-5">
    <v-img src="https://marketplace.canva.com/MADGwG4IEek/5/screen/canva-brown-animal--MADGwG4IEek.jpg"
      max-height="200px"
      contain
      class="my-5"
    ></v-img>
    Welcome to a data.world <br/> <span>table selector</span><br/> api tester sandbox.
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span{
  text-decoration: line-through;
}

div {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
