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
  async findMany(filters: {
    category?: string;
    search?: string;
    sortBy?: string;
    order?: string;
  }) {
    const { category, search, sortBy, order } = filters;
    const orderBy = sortBy ? { [sortBy]: order } : undefined;

    const data = await prisma.product.findMany({
      where: {
        category: category ? { equals: category } : undefined,
        name: search ? { contains: search, mode: "insensitive" } : undefined,
      },
      orderBy: orderBy,
    });
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
