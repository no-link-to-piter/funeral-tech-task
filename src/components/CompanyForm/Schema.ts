import * as Yup from "yup"

const Schema = Yup.object().shape({
    fullName: Yup.string(),
    contractNumber: Yup.string(),
    contractDate: Yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]((19)[0-9][0-9]|(20)[0-1][0-9]|(20)2[0-2])$/, "Введите правильную дату"),
    businessEntity: Yup.string(),
    type: Yup.string().required()
})

export default Schema;