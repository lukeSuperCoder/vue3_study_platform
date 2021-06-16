<template>
  <el-form
    :model="registerUser"
    status-icon
    :rules="registerRules"
    ref="registerForm"
    label-width="100px"
    class="registerForm sign-up-form"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="registerUser.email"
        placeholder="inter email"
      ></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="registerUser.name" placeholder="inter name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="registerUser.password"
        type="password"
        placeholder="inter password"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="passwordAgain">
      <el-input
        v-model="registerUser.passwordAgain"
        type="password"
        placeholder="inter password again"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="register('registerForm')"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    registerUser: {
      type: Object,
      required: true,
    },
    registerRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any, context: any) {
    //@ts-ignore
    const { ctx } = getCurrentInstance();
    const router = useRouter();
    const register = (formName: string) => {
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          ctx.$axios
            .post("/api/v1/auth/register", props.registerUser)
            .then((res: any) => {
              ctx.$message({
                message: "注册成功",
                type: "success",
              });
              //页面跳转到登陆界面
              // router.push("/");
              context.emit("update:changeDisplayValue", 'toLogin')
            });
        } else {
          return false;
        }
      });
    };
    return { register };
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