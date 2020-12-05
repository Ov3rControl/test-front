export type LoginFormType = {
  username: string;
  password: string;
};

export type User = {
  username: string;
};

export enum ItemStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export type ItemType = {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  bid?: number;
  bidHistory?: string[];
  closeDate: { $d: Date };
  createdAt?: Date;
  updatedAt?: Date;
  users?: User;
  highestBidder: string;
  status: ItemStatus;
};

export interface ItemTypeRes extends ItemType {
  closeDate: string;
}

export interface TableStateType extends ItemTypeRes {
  data: {
    closeDate: string;
  }[];
  pagination: {
    current: number;
    pageSize: number;
    total: number | undefined;
  };
  loading: boolean;
}
