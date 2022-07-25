import React from "react";

import { ImageModel } from "models";
import { CloseIcon } from "icons";

import "./style.sass";

type Props = {
    image: ImageModel;
    handleDeleteImage: () => void;
}

const ImageElement = ({
    image,
    handleDeleteImage
}: Props) => {
    return (
        <div className="image-element">
            <button
                type="button"
                className="image-element__delete"
                onClick={handleDeleteImage}>
                    <CloseIcon/>
            </button>
            <img src={image.thumbpath} alt={image.name} className="image-element__image"/>
            <a 
                href={image.filepath}
                target="_blank"
                className="image-element__name">
                {image.name}
            </a>
            <p className="image-element__date">11 июня 2018</p>
        </div>
    )
}

export { ImageElement };