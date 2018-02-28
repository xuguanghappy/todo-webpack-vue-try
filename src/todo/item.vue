<template>
  <div :class="['todo-item',todo.completed ? 'completed' :'']">
    <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destory" @click="deleteTodo"></button>
  </div>
</template>
<script>
export default {
  props:{
    todo:{
      type: Object,
      required: true,
    }
  },
  methods:{
    deleteTodo(){}
  }
}
</script>
<style>
  .todo-item{
    position: relative;
    background-color: #fff;
    font-size:  24px;
    border-bottom: 1px solid rgba(0,0,0,0.06); 
  }
  .todo-item:hover .destory:after{
    content: 'x'
  }
  label {
    white-space: pre-line;
    word-wrap: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  .todo-item:completed label{
    color: #d9d9d9;
    text-decoration: line-through;
  }
  .toggle{
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    appearance: none;
    outline: none;
  }

</style>
