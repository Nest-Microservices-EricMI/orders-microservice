import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {

  it('should be valid when no values are provided (uses defaults)', async () => {
    const dto = plainToInstance(PaginationDto, {});

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.page).toBe(1);
    expect(dto.limit).toBe(10);
  });

  it('should fail if page is not positive', async () => {
    const dto = plainToInstance(PaginationDto, { page: -1 });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail if limit is not positive', async () => {
    const dto = plainToInstance(PaginationDto, { limit: 0 });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
  });

  it('should transform page and limit to numbers', async () => {
    const dto = plainToInstance(PaginationDto, { page: '5', limit: '20' });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.page).toBe(5);
    expect(dto.limit).toBe(20);
  });

  it('should be valid when both values are positive', async () => {
    const dto = plainToInstance(PaginationDto, { page: 3, limit: 15 });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});