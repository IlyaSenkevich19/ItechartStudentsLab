export const validate = inputs => {
    const errors = {};
    if (!inputs.email) {
        errors.email = 'Введите свой email';
    }
    if (!inputs.password) {
        errors.password = 'Введите ваш пароль';
    }
    if (!inputs.date) {
        errors.date = 'Введите дату своего рождения'
    }
    if(!inputs.confirmPassword) {
        errors.confirmPassword = `Введите пароль подтверждения`;
    }
    if(inputs.confirmPassword !== inputs.password) {
        errors.confirmPassword = `Пароли не совпадают`;  
    }
    return errors;
};