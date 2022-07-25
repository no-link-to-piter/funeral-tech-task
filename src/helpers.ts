import ClipboardJS from 'clipboard';
import { format } from 'date-fns'

export const formatDate = (value: string) => {
    if (!value) return "";
    try {
        const date = new Date(value);
        return format(date, "dd.MM.yyyy")
    } catch(e) {
        return value;
    }
};

export const formatDateISOStr = (value: string) => {
    const arr = value.split(".")
    if (arr.length === 3) {
        const day = arr.splice(1, 1);
        arr.unshift(...day)
        const transformed = arr.join(".");
        return new Date(transformed).toISOString();
    }
    return ""
}

export const formatPhoneNumber = (value: string) => value.length === 11 ? `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9)}` : value;

export const copyText = (text: string) => {
    return new Promise<void>((resolve, reject) => {
        try {
            const copied = ClipboardJS.copy(text)
            if (copied) {
                resolve()
            } else {
                reject()
            }
        } catch(e) {
            reject(e)
        }
    })
}

export const getErrorText = (error: any) => {
    const errorStr = error.toString();
    try {
        const parsedError = JSON.parse(errorStr.replace("Error: ", ""));
        return parsedError.error;
    } catch(e) {
        return errorStr;
    }
} 