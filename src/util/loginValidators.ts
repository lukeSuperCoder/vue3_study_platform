import { ref, getCurrentInstance } from 'vue';
interface User {
    email: string;
    password: string;
}
export const loginUser = ref<User>({
    email: '',
    password: ''
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
    password: {
        required?: boolean;
        message: string;
        trigger: string;
        min?: number;
        max?: number;
    }[];
}
export const loginRules = ref<Rules>({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: 'email is incorrect', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
    ]
})