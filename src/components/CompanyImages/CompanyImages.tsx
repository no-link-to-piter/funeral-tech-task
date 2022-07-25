import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "store";
import { PlusIcon } from "icons";
import { RootState } from "slices/rootReducer";
import { deleteImage, uploadImage } from "slices/companySlice";
import { ImageElement as Image} from "components/common/ImageElement";

import "./style.sass";

type Props = {
    companyId: string;
    setErrorMessage: (value: string) => void;
}

const CompanyImages = ({
    companyId,
    setErrorMessage
}: Props) => {

    const dispatch: AppDispatch = useDispatch();

    const ref = useRef<HTMLInputElement | null>(null);

    const { company } = useSelector((state: RootState) => state.company);

    const handleUploadFile = () => {
        if (ref && ref.current) {
            ref.current.click();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            dispatch(uploadImage(Number(companyId), file, (message: string) => setErrorMessage(message)))
        }
    }

    const handleDeleteImage = (value: string) => {
        if (companyId) {
            dispatch(deleteImage(Number(companyId), value))
        }
    }

    const children = company && company.photos.length && company.photos.map(item => {
        return <Image image={item} handleDeleteImage={() => handleDeleteImage(item.name)} key={item.name}/>
    }) || null;

    return (
        <div className="company-images">
            <h2 className="company-images__title">приложенные фото</h2>
            <input 
                type="file" 
                className="is_hidden" 
                ref={ref}
                onChange={handleChange}/>
            <div className="company-images__list">
                {children}
            </div>
            <button 
                type="button"
                className="company-images__button"
                onClick={handleUploadFile}>
                    <PlusIcon/>
                    добавить изображение
            </button>
        </div>
    )
}

export { CompanyImages };