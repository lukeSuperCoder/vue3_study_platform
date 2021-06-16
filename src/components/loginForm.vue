<template>
  <el-form
    :model="loginUser"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="loginUser.email" placeholder="inter email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginUser.password"
        type="password"
        placeholder="inter password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit-btn" @click="login('loginForm')"
        >提交</el-button
      >
    </el-form-item>
    <!--找回密码-->
    <div class="tiparea">
      <p>忘记密码？ <a>立即找回</a></p>
    </div>
  </el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    loginUser: {
      type: Object,
      required: true,
    },
    loginRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    //@ts-ignore
    const { ctx } = getCurrentInstance();
    const router = useRouter();
    const arr = [1, 2, 3, 4, 5];
    const login = (formName: string) => {
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          ctx.$axios
            .post("/api/v1/auth/login", props.loginUser)
            .then((res: any) => {
              ctx.$message({
                message: "登录成功",
                type: "success",
              });
              //存储token
              const { token } = res.data;
              localStorage.setItem("msToken", token);
              router.push("/");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    return { login };
  },
};
</script>

<style>
.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>