import * as Yup from "yup"

const Schema = Yup.object().shape({
    fullName: Yup.string(),
    phone: Yup.string().matches(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, "Введите правильный номер").required(),
    email: Yup.string().email("Введите правильный адрес электронной почты").required()
})

export default Schema;