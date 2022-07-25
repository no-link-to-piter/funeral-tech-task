import * as Yup from "yup"

const Schema = Yup.object().shape({
    username: Yup.string().required("Введите имя пользователя"),
})

export default Schema;