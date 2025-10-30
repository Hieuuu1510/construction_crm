export interface BaseEntity {
  createdAt?: number;
  updatedAt?: number;
  created_time?: string | number;
  updated_time?: string | number;
  created_uid?: string | number | null;
  updated_uid?: string | number | null;
}

export interface IntegerEntity extends BaseEntity {
  _id: string;
}
