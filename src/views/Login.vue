<template>
  <!-- login form -->
  <div class="login-form">
    <a-row align="middle" justify="center">
      <a-col span="16">
        <section class="login-gif"></section>
      </a-col>
      <a-col span="8">
        <section>
          <div class="overlay">
            <div class="wrapper">
              <div class="logo">
                <a class="brand-logo" href="index.html">Snow login form</a>
              </div>
              <div class="form-section">
                <h3>账户登录</h3>
                <a-form :wrapper-col="wrapperCol">
                  <a-form-item>
                    <a-input
                      v-model:value="loginForm.user"
                      @pressEnter="onEnter"
                      autocomplete
                      placeholder="Username"
                    >
                      <template #prefix
                        ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                      /></template>
                    </a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-input-password
                      v-model:value="loginForm.password"
                      type="password"
                      @pressEnter="onEnter"
                      autocomplete
                      placeholder="Password"
                    >
                      <template #prefix
                        ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                      /></template>
                    </a-input-password>
                  </a-form-item>
                  <a-form-item>
                    <a-button
                      type="primary"
                      shape="round"
                      @click="onLogin"
                      :disabled="
                        loginForm.user === '' || loginForm.password === ''
                      "
                    >
                      登录
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </div>
        </section>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Form, Input, Button, Row, Col } from "ant-design-vue";
import { defineComponent } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
interface LoginForm {
  user: string;
  password: string;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    [Input.Password.name]: Input.Password,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  data() {
    return {
      loginForm: {
        user: "",
        password: ""
      } as LoginForm,
      wrapperCol: { span: 18, offset: 3 }
    };
  },
  methods: {
    onLogin: function() {
      // this.http.post("/api/login", this.loginForm).then(({data})=>{
      //     if (data == "success") {
      //         this.$emit("next");
      //     } else {
      //         message.warning("用户名或密码错误，登录失败！");
      //     }
      // });
      console.log("111");
    },
    onEnter() {
      // if (this.loginForm.user !== "" && this.loginForm.password !== "") {
      this.onLogin();
      // }
    }
  }
});
</script>
<style scoped>
.login-gif {
  position: relative;
  height: 100vh;
  background: url(../assets/gif.gif) no-repeat 0px 0px;
  background-size: cover;
}
.login-form {
  background-color: rgb(28, 104, 82);
}
</style>
