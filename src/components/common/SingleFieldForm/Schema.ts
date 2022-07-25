import * as Yup from "yup"

const Schema = Yup.object().shape({
    name: Yup.string().required()
})

export default Schema;