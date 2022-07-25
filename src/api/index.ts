import wretch, { Wretcher } from "wretch";

import { STORAGE_KEY } from "consts";
import { CompanyModel, ContactModel, ImageModel, PaginationModel } from "models";

const apiHost = (process.env.REACT_APP_API_URL as string) || "";

const openApiRequest = (): Wretcher => wretch().url(apiHost);
const getAuthToken = () => localStorage.getItem(STORAGE_KEY);

export const apiRequest = (): Wretcher =>
  wretch()
    .headers({
      Authorization: `Bearer ${getAuthToken()}`,
    })
    .url(apiHost);

// Auth
export const authReq = (user: string) => 
    openApiRequest()
        .url('/auth/')
        .query({user})
        .get()
        .res();

// Company
export const fetchCompanyReq = (companyId: number) => 
    apiRequest()
        .url(`/companies/${companyId}`)
        .get()
        .json<CompanyModel>();

export const updateCompanyReq = (companyId: number, params: Partial<CompanyModel>) => 
    apiRequest()
        .url(`/companies/${companyId}`)
        .json(params)
        .patch()
        .json<CompanyModel>();
        
export const deleteCompanyReq = (companyId: number) => 
    apiRequest()
        .url(`/companies/${companyId}`)
        .delete()
        .res();

// Company Image
export const uploadImageReq = (companyId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file)
    return (
        apiRequest()
            .url(`/companies/${companyId}/image/`)
            .formData({file})
            .post()
            .json<ImageModel>()
    )
}

export const deleteImageReq = (companyId: number, imageName: string) => 
    apiRequest()
        .url(`/companies/${companyId}/image/${imageName}`)
        .delete()
        .res();

// Company Contact
export const fetchContactReq = (contactId: number) => 
    apiRequest()
        .url(`/contacts/${contactId}/`)
        .get()
        .json<ContactModel>();

export const updateContactReq = (contactId: number, params: Partial<ContactModel>) => 
    apiRequest()
        .url(`/contacts/${contactId}/`)
        .json(params)
        .patch()
        .json<ContactModel>();