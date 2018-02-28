<template>
  <section class="real-app">
    <input 
      type="text" 
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来去做什么？"
      @keyup.enter="addTodo"
      >
  </section>
</template>
<script>
export default {
  methods: {
    addTodo(){}
  }
}
</script>
<style>
  .real-app{
    width: 660px;
    margin: 0 auto;
    box-shadow: 0 0 5px #999
  }
  .add-input{
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    height: 60px;
    width: 660px;
    font-size: 24px;
    font-weight: 100;
    padding: 15px 60px 15px 15px;
  }
</style>


