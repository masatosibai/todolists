<template>
  <div class="container">
    <div class="main">
      <p class="title">ToDOList</p>
      <div class="todolist">
        <div class="flex">
          <input type="text" class="inputtext" v-model="inputText" />
          <button class="add" @click="addList(inputText)">追加</button>
        </div>
        <div
          class="flex"
          v-for="(data, index) in $store.state.todolistName"
          :key="index"
        >
          <input type="text" class="inpuupdate" v-model="data.name" />
          <div class="buttons ">
            <button
              class="update"
              @click="updateList(data.name, data.id, index)"
            >
              更新
            </button>
            <button
              class="delete"
              @click="deleteList(data.name, data.id, index)"
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [{ name: "開発" }, { name: "仕事" }, { name: "子育て" }],
    url: "https://radiant-reaches-47731.herokuapp.com/api/todolists",
    inputText: null,
    is_validation: false,
  }),
  async created() {
    this.$store.dispatch("Init", { url: this.url });
  },
  methods: {
    checkValidation(targetText) {
      if (!targetText) {
        alert("必須入力");
      } else if (targetText.length >= 200) {
        alert(targetText.length + "文字です。200文字以内で入力");
      } else {
        return true;
      }
    },
    addList(inputText) {
      if (this.checkValidation(inputText)) {
        this.$store.dispatch("AddTodoName", { url: this.url, name: inputText });
        this.inputText = "";
      }
    },
    updateList(updateList, Id, Index) {
      if (this.checkValidation(updateList)) {
        this.$store.dispatch("updateTodoName", {
          url: this.url,
          name: updateList,
          ID: Id,
          Index: Index,
        });
      }
    },
    deleteList(deleteList, Id, Index) {
      if (this.checkValidation(deleteList)) {
        this.$store.dispatch("deleteTodoName", {
          url: this.url,
          ID: Id,
          Index: Index,
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #2d197c;
  height: 100vh;
  width: 100vw;
  position: relative;
}
.main {
  background-color: #fff;
  width: 50vw;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.title {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
}
.todolist {
  margin-bottom: 15px;
}
.inputtext {
  width: 80%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 14px;
  outline: none;
}
.add {
  text-align: left;
  border: 2px solid #dc70fa;
  font-size: 12px;
  color: #dc70fa;
  background-color: #fff;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s;
  outline: none;
}
.inpuupdate {
  width: 30%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 14px;
  outline: none;
}
.update {
  text-align: left;
  border: 2px solid #fa9770;
  font-size: 12px;
  color: #fa9770;
  background-color: #fff;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s;
  outline: none;
  margin-left: 10px;
}
.delete {
  text-align: left;
  border: 2px solid #71fadc;
  font-size: 12px;
  color: #71fadc;
  background-color: #fff;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s;
  outline: none;
  margin-left: 10px;
}

.flex {
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
}
</style>
