<template>
  <div class="Completed">
    <h1>Выполнено</h1>

      <div class="container">
        <ol class="notesList">
            <li v-for="(note, index) in notes" :key="note.id"> 
              <div class="todoHeader">
                <h3>{{ note.header }}</h3>
              </div>
              <div class="todoContent">
                <input type="checkbox" disabled v-bind:value="note" class="customCheckBox" :id="index" v-model="note.statu5" @click="checkStatus(index)">
                
                <label :for="index">
                  <p>{{ note.content }}</p>
                </label>

                <div class="buttonsBlock">
                  <button class="delete_btn" @click="RemoveNote(index)">&#215;</button>
                </div>
              </div>
            </li>
      </ol>
    </div>


  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Completed",
  computed:mapState({
    notes: state => state.notes
  }),
  mounted(){
      this.$store.dispatch('getCheckedUsers');
  },
  methods: {
    async RemoveNote(index){
        this.$store.dispatch('removeNote',index);
    },
    async checkStatus(index) {
        this.$store.dispatch('changeStatus',index);
    },
  }
};

</script>
<style scoped>
  .container{
    padding: 0;
    width: 80%;
    margin: 0 auto;
    border: 1px solid lightseagreen;
  }
  .todoHeader{
    padding: 10px 0;
    border-bottom: 2px solid #fff;
    border-radius: 60%;
  }
  .notesList{
    list-style: none;
    list-style-position: inside;
    margin: 0;
    padding: 0;
  }
  h3{
      padding: 0;
      margin: 0;
      background: linear-gradient(45deg, #df621a 33%, #eeea02 66%, #8AA9D6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
  .notesList li:nth-child(even){
    background: linear-gradient(90deg, rgba(82, 34, 128, 0.842), rgba(58, 230, 192, 0.712));
    color: #fff;
  }
  .notesList li:nth-child(odd){
      background: linear-gradient(90deg, rgba(82, 34, 128, 0.842), rgba(58, 230, 192, 0.712));
      color: #fff;
  }
  .todoContent:hover{
    background: linear-gradient(90deg, rgba(60, 17, 100, 0.842), rgba(18, 204, 164, 0.712));
  }
  .todoContent{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

    /* buttons */

  .buttonsBlock{
    display: flex;
    flex-direction: row;
  }
  .delete_btn{
    background-color: inherit;
    font-size: 32pt;
    color: #fff;
    border: none;
  }
  .delete_btn:hover{
    transform: rotate(90deg);
    transition: ease 0.5s;
  }

 /* для элемента input c type="checkbox" */
    .customCheckBox {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    /* для элемента label, связанного с .custom-checkbox */
    .customCheckBox+label {
      display: flex;
      justify-content:space-between;
      align-items: center;
      padding: 0 30px;
      user-select: none;
    }
    .customCheckBox:checked +label {
      text-decoration: line-through;
      color: #34f044;
    }
    /* создание в label псевдоэлемента before со следующими стилями */
    .customCheckBox+label::before {
      content: '';
      display: inline-block;
      width: 1em;
      height: 1em;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #adb5bd;
      border-radius: 0.25em;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }

    /* стили при наведении курсора на checkbox */
    .customCheckBox:not(:disabled):not(:checked)+label:hover::before {
      border-color: #b3d7ff;
    }

    /* стили для активного чекбокса (при нажатии на него) */
    .customCheckBox:not(:disabled):active+label::before {
      background-color: #b3d7ff;
      border-color: #b3d7ff;
    }

    /* стили для чекбокса, находящегося в фокусе */
    .customCheckBox:focus+label::before {
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
    .customCheckBox:focus:not(:checked)+label::before {
      border-color: #80bdff;
    }

    /* стили для чекбокса, находящегося в состоянии checked */
    .customCheckBox:checked+label::before {
      border-color: #0b76ef;
      background-color: #0b76ef;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }

    /* стили для чекбокса, находящегося в состоянии disabled */
    .customCheckBox:disabled+label::before {
      border-color: #84bbfa;
      background-color: #208151;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }

</style>