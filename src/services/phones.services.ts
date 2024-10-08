import { prisma } from "../database/prisma";
import { TPhone, TPhoneCreate, TPhoneUpdate } from "../schemas/phones.schema";

export class PhoneServices {
  async create(body: TPhoneCreate): Promise<TPhone> {
    const data = await prisma.product.create({ data: body });
    return data;
  }
  async findOne(id: number) {
    const data = await prisma.product.findUnique({ where: { id } });
    return data;
  }
  async findMany(category?: string, searchQuery?: string) {
    const filters: any = {};

    if (category) {
      filters.category = category;
    }

    if (searchQuery) {
      filters.name = { contains: searchQuery, mode: "insensitive" };
    }

    const data = await prisma.product.findMany({ where: filters });
    return data;
  }

  async update(id: number, body: TPhoneUpdate) {
    const data = await prisma.product.update({ where: { id }, data: body });
    return data;
  }
  async remove(id: number) {
    await prisma.product.delete({ where: { id } });
  }
}
