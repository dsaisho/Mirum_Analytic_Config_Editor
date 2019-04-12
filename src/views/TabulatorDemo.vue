<template>
<div id="tabulator-table"></div>
</template>


<script>
  import T from "tabulator-tables"


  const tabledata = [
      {"id":1, "name":"Oli Bob", "location":"United Kingdom", "gender":"male", "rating":1, "col":"red"},
      {"id":2, "name":"Mary May", "location":"Germany", "gender":"female", "rating":2, "col":"blue"},
      {"id":3, "name":"Christine Lobowski", "location":"France", "gender":"female", "rating":0, "col":"green"},
      {"id":4, "name":"Brendon Philips", "location":"USA", "gender":"male", "rating":1, "col":"orange"},
      {"id":5, "name":"Margret Marmajuke", "location":"Canada", "gender":"female", "rating":5, "col":"yellow"},
      {"id":6, "name":"Frank Harbours", "location":"Russia", "gender":"male", "rating":4, "col":"red"},
      {"id":7, "name":"Jamie Newhart", "location":"India", "gender":"male", "rating":3, "col":"green"},
      {"id":8, "name":"Gemma Jane", "location":"China", "gender":"female", "rating":0, "col":"red"},
      {"id":9, "name":"Emily Sykes", "location":"South Korea", "gender":"female", "rating":1, "col":"maroon"},
      {"id":10, "name":"James Newman", "location":"Japan", "gender":"male", "rating":5, "col":"red"}
  ]


export default {
  mounted() {
    let table = new T('#tabulator-table',{
    	data:tabledata,           //load row data from array
    	layout:"fitColumns",      //fit columns to width of table
    	responsiveLayout:"hide",  //hide columns that dont fit on the table
    	tooltips:true,            //show tool tips on cells
    	addRowPos:"top",          //when adding a new row, add it to the top of the table
    	history:true,             //allow undo and redo actions on the table
    	pagination:"local",       //paginate the data
    	paginationSize:7,         //allow 7 rows per page of data
    	movableColumns:true,      //allow column order to be changed
    	resizableRows:true,       //allow row order to be changed
    	initialSort:[             //set the initial sort order of the data
    		{column:"name", dir:"asc"},
    	],
    	columns:[                 //define the table columns
    		{title:"Name", field:"name", editor:"input"},
    		{title:"location", field:"location", align:"left", formatter:"progress", editor:true},
    		{title:"Gender", field:"gender", width:95, editor:"select", editorParams:{"Male":"male", "Female":"female"}},
    		{title:"Rating", field:"rating", formatter:"star", align:"center", width:100, editor:true},
    		{title:"Color", field:"col", width:130, editor:"input"},
    		{title:"Date Of Birth", field:"rating", width:130, sorter:"date", align:"center"},
    		{title:"Driver", field:"car", width:90,  align:"center", formatter:"tickCross", sorter:"boolean", editor:true},
    	],
    })

  },
  methods: {

  }
}
</script>
