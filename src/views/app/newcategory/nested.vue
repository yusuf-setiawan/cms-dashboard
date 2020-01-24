<template>
  <!-- <draggable class="dragArea" tag="ul" :list="children" :group="{ name: 'g1' }">
    <li v-for="el in children" :key="el._pid">
      <h3>{{el.title}}</h3>
      <nested-draggable :children="el.children" />
    </li>
  </draggable>-->
<draggable v-model="children" group="people" @start="drag=true" @end="drag=false" @change="log" :move="checkMove">
   <div v-for="element in children" :key="element._pid" class="ml-5">
     <b-card>
       <b-row>
         <b-col cols="9">
            {{element.title}}
         </b-col>
         <b-col cols="3">
            <b-button @click="$emit('action', $event, 'view', element)" size="xs" class="primary"> 
              <i class="simple-icon-eye"></i>
            </b-button>
            <b-button @click="$emit('action', $event, 'edit', element)" size="xs" variant="info"> 
                <i class="simple-icon-pencil"></i>
            </b-button>
            <b-button @click="$emit('action', $event, 'add', element)" size="xs" class="primary"> 
                <i class="simple-icon-plus"></i>
            </b-button>
        </b-col>
       </b-row>
      </b-card>
      <nested-draggable :children="element.children" />
     </div>
</draggable>
 <!-- <draggable v-model="children" draggable=".item">
    <b-card v-for="element in children" :key="element._pid" class="item ml-5">
        {{element.title}}
        <nested-draggable :children="element.children" />
    </b-card>

</draggable>-->


</template>
<script>
import draggable from 'vuedraggable'
export default {
  props: {
    children: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  data() {
    return {
     // list: message.map((name, index) => {
     //   return { name, order: index + 1 };
     // }),
      drag: false
    };
  },
  methods: {
    log(evt) {
      console.log('log change', evt)
    },
    checkMove (evt) {
      console.log('change on ', evt)

      var originalIndex = evt.draggedContext.index;
      var futureIndex= evt.draggedContext.futureIndex;
          //return (evt.draggedContext.element.name!=='apple');
          var vueFrom = evt.from.__vue__
          console.log('vueFrom ', vueFrom)
          if (vueFrom.children != undefined)
          {
            var oldParent = vueFrom.children[originalIndex]._pid;
            console.log('oldIndex ', originalIndex)
            console.log('oldParent ', oldParent)
          }

          var vueTo = evt.to.__vue__
          console.log('futureIndex ', futureIndex)
          console.log('vueTo ', vueTo)
          if (vueTo.$parent != undefined)
          {
            var newParent = vueTo.$parent.children[0]._pid;
            console.log('newIndex ', futureIndex)
            console.log('newParent ', newParent)
          }
        },

  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  name: "nested-draggable"
};
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}

.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.primary {
    background-color: #203fa0;
    border-color: #203fa0;
}
</style>