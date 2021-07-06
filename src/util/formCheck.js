export const validateEmail = (email) => {
    if(!email){
        return {result: false, message: "이메일을 입력해주세요."}
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
        result: re.test(email.toLowerCase()),
        message: "이메일 형식이 틀립니다.",
    };
};

export const validateName = (name) => {
    if(!name){
        return {result: false, message: "이름을 입력해주세요."}
    }
    return { result: true };
}

export const validatePW = (pw) => {
    if(!pw){
        return {result: false, message: "비밀번호를 입력해주세요."}
    }
    if (pw.length < 6) {
        return { result: false, message: "비밀번호는 6자리 이상이여야합니다." };
    }
    return { result: true };
};