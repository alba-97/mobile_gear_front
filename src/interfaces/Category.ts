interface BaseCategory {
  name: string;
}

export interface CategoryResponse extends BaseCategory {
  id: number;
}

export interface CategoryForm extends BaseCategory {}
