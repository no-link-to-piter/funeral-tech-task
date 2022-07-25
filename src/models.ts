export enum requestStatuses {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export type RequestStatus =
  | requestStatuses.idle
  | requestStatuses.loading
  | requestStatuses.succeeded
  | requestStatuses.failed;

export interface PaginationModel<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface ImageModel {
  name: string;
  filepath: string;
  thumbpath: string;
}

export interface CompanyModel {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract:  {
    no: string;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: ImageModel[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactModel {
  id: string,
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}