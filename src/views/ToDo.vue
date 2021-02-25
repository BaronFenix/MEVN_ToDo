<template>
  <div class="TODO">
    <h1>TODO LIST</h1>

      <div class="createBlock">
        <form @submit.prevent="sendData()">
          <div class="form-control">
            <label for="header"><h3>Заголовок</h3></label>
            <br>
            <input type="text" class="customInput" id="header" v-model="note.header" placeholder="Здесь могла быть ваша реклама">
          </div>

          <div class="form-control">
            <label for="content"><h3>Заметка</h3></label>
            <br>
            <textarea required class="customTextArea" id="content" v-model="note.content" placeholder="Напиши сюда что нито"></textarea>
          </div>
          <input type="submit" class="send_btn" value="Create">
        </form>
      </div>


      <div class="container">
        <ol class="notesList">
            <li v-for="(note, index) in notes" :key="note.id"> 
              <div class="todoHeader">
                <h3>{{ note.header }}</h3>
              </div>
              <div class="todoContent">
                <input type="checkbox" v-bind:value="note" class="customCheckBox" :id="index" v-model="note.statu5" @click="checkStatus(index)">
                
                <label :for="index">
                  <p>{{ note.content }}</p>
                </label>

                <div class="buttonsBlock">
                    <div v-show="visible">
                      <input type="text" class="noteInput" :id="note.id" v-model.lazy="note.content" v-on:change="EditNote(index)"  placeholder="_________________________">
                    </div>
                  <button v-on:click="visible=!visible" class="edit_btn" >{{visible?'&#128394;':'&#128394;'}}</button>
                  <button class="delete_btn" @click="RemoveNote(index)">&#215;</button> <!-- &#215; &#128394; -->
                </div>
              </div>
            </li>
      </ol>
    </div>

      <!-- <div class="container">      
          <div v-for="note in selectedNotes" v-bind:key="note.id">
              <div class="userCard">
                {{note.header}} - {{note.content}}
              </div>
            </div>
      </div> -->

  </div>
</template>

<script>
import { mapState } from "vuex";
// import GetUsers from '@/components/GetUsers.vue'
export default {
  name: "Notes",
    data: () =>{
      return {
        note: {
          header: null,
          content: null,
          statu5: false,

      },
      // statu5: false,
      //   checked: false,
        visible: false,
        selectedNotes: [],
    }
    
  },
  computed:mapState({
    notes: state => state.notes
  }),
  mounted(){
      this.$store.dispatch('getPosts');
  },
  methods: {
    async sendData(){
      this.$store.dispatch('addNote',this.note);
      alert(`Пользователь ${this.note.header} успешно добавлен`);
      document.getElementById('header').value = '';
      document.getElementById('content').value = '';
      window.location.reload();
    },
    async RemoveNote(index){
        this.$store.dispatch('removeNote',index);
    },
    async EditNote(index){
        this.$store.dispatch('changeNote',index);
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
  .createBlock{
    width: 40%;
    margin: 50px auto;
    padding: 30px 0;
    border: 3px inset aqua;
  }
  .createBlock h3 {
    padding-top: 10px;
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
  .noteInput{
    margin-top: 25px;
    background: inherit;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
    color: #fff;
  }
  .noteInput:focus{
    border-bottom: 1px solid #fff;
  }

    /* buttons */

  .buttonsBlock{
    display: flex;
    flex-direction: row;
  }

  .edit_btn{
    background-color: inherit;
    font-size: 18pt;
    color: #fff;
    border: none;
  }
  .delete_btn{
    background-color: inherit;
    font-size: 32pt;
    color: #fff;
    border: none;
  }
  .edit_btn:hover{
    transform: rotate(-20deg);
    transition: ease 0.5s;
  }
  .delete_btn:hover{
    transform: rotate(90deg);
    transition: ease 0.5s;
  }
  .send_btn{
    margin-top: 15px;
    padding: 5px 15px;
    border-radius: 15px;
    border: none;
    border: 1px solid aqua;
    background-color: inherit;
    color: #fff;
  }
  .send_btn:hover{
    transform: scale(1.1);
    transition: ease 0.5s;
  }
  input, textarea, button{
    outline: none;
  }
  .customInput[type=text], textarea{
        padding: 7px 15px;
    }

  .customTextArea{
    resize: none;
    border: 1px solid aqua;
    /* background: linear-gradient(90deg, rgba(82, 34, 128, 0.842), rgba(58, 230, 192, 0.712)); */
    border-radius: 10px;
    width: 80%;
    height: 80px;
    font-family: 'comic sans MS';
    /* color: #fff; */
  }
  .customInput{
    resize: none;
    border: 1px solid aqua;
    width: 80%;
    padding: 8px 0;
    border-radius: 10px;
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
      border-color: #84bbfa;
      background-color: #208151;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }

    /* стили для чекбокса, находящегося в состоянии disabled */
    .customCheckBox:disabled+label::before {
      background-color: #e9ecef;
    }

      /* ------------ на заметочку быстрый способ кастомизации ------------------ */
      
      /* input[type=checkbox] {
    display: none;
  }

input[type=checkbox] + label:before {
    content: "\2714";
    color: transparent;
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 12px;
    font-weight: 900;
    line-height: 22px;
    margin: -5px 5px 0 0;
    height: 12px;
    width: 12px;
    text-align: center;
    vertical-align: middle;
    transition: color ease .3s;
}

input[type=checkbox]:checked + label:before {
    color: rgb(255, 251, 0);
  border-color: #fff;
} */
</style>