<template>

  <v-flex>
    <SubHeader title="Config" description="*change project settings" />
    <v-flex white justify-center d-flex py-3 >
      <v-flex xs4  >
      <TextInput v-model="projectNameInput" title="Project Name" class="" />
      <v-btn class="ma-0" color="info" v-on:click="updateSettingsClicked">Update Settings</v-btn>
      </v-flex>
    </v-flex>
    
  </v-flex>

</template>

<script>
import SubHeader from "@/components/headers/SubHeader.vue"
import TextInput from"@/components/textInput/TextInput.vue"
import {
  isValidProject
} from "@/utils/api/data-world-api.js";
export default {
  name: "ConfigView",
  components:{
    SubHeader,
    TextInput
  },
  data(){
    return{
      projectNameInput:""
    }
  },
  computed:{
    projectName(){
      return this.$store.state.projectName;
    }
  },
   mounted(){
    this.projectNameInput = this.projectName
  },
  methods:{
    updateSettingsClicked(){
      isValidProject(this.projectNameInput).then(res=>{
        if(res){
        this.$store.dispatch("SET_PROJECT_NAME", {name:this.projectNameInput})
        this.$router.push("/")
       }
      })
    }
  }
};
</script>

<style scoped>


</style>
