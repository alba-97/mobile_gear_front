interface BaseBrand {
  name: string;
}

export interface BrandResponse extends BaseBrand {
  id: number;
}

export interface BrandForm extends BaseBrand {}
