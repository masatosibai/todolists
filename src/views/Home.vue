<template>
  <div class="container">
    <div class="main">
      <p class="title">やることリスト</p>
      <div class="todolist">
        <div class="flex">
          <v-text-field
            label="やることを記入"
            counter="200"
            v-model="inputText"
          />
          <v-btn
            class="buttons"
            text
            x-large
            v-if="this.inputText != ''"
            @click="addList(inputText)"
          >
            <span id="texts">を追加する</span>
          </v-btn>
        </div>
        <div
          class="flex"
          v-for="(data, index) in $store.state.todolistName"
          :key="index"
        >
          <v-text-field
            type="text"
            class="inputupdate"
            :value="data.name"
            @input="nowinput(index)"
          />
          <div class="buttons ">
            <transition name="fade">
              <v-btn
                text
                v-if="nowName == index"
                @click="updateList(updateText, data.id, index)"
              >
                <span id="texts">に変更する</span>
              </v-btn>
            </transition>
            <v-btn
              text
              v-if="nowName == index ? false : true"
              @click="deleteList(updateText, data.id, index)"
            >
              <span id="texts">を削除する</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/CommonFooter";
export default {
  components: {
    Footer,
  },
  data: () => ({
    list: [{ name: "開発" }, { name: "仕事" }, { name: "子育て" }],
    url: "https://radiant-reaches-47731.herokuapp.com/api/todolists",
    inputText: "",
    updateText: "",
    nowName: -1,
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
        this.nowName = -1;
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
    nowinput(index) {
      this.nowName = index;
      this.updateText = event.target.value;
    },
  },
};
</script>

<style scoped>
.container {
  background-color: snow;
  height: 100vh;
  width: 100vw;
  position: relative;
}
.main {
  background-color: snow;
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
.buttons {
  margin-top: 30px;
}
#texts {
  font-weight: initial;
  font-size: 24px;
}
.todolist {
  margin-bottom: 15px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 0;
}
</style>
