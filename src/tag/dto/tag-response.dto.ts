export class TagResponseDto {
    id: number;
    name: string;
    isSystemTag: boolean;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }