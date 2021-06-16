import { ref, getCurrentInstance } from 'vue';
interface User {
  email: string;
  password: string;
  passwordAgain: string;
}
export const registerUser = ref<User>({
  email: '',
  password: '',
  passwordAgain: ''
});
interface Rules {
  email: ({
    required: boolean;
    message: string;
    trigger: string;
    type?: undefined;
  } | {
    type: string;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
  name: {

  }
  password: {
    required?: boolean;
    message: string;
    trigger: string;
    min?: number;
    max?: number;
  }[];
  passwordAgain: {
    required?: boolean;
    message?: string;
    trigger: string;
    min?: number;
    max?: number;
    validator?: (rule: any, value: string, callback: any) => void;
  }[];
}
const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== registerUser.value.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
export const registerRules = ref<Rules>({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: 'email is incorrect', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
  ],
  passwordAgain: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ]
})