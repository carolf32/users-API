import { Prisma } from "@prisma/client";
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
  async findMany({
    category,
    sort,
  }: { category?: string; sort?: string } = {}) {
    let orderBy;

    switch (sort) {
      case "priceAsc":
        orderBy = { price: Prisma.SortOrder.asc };
        break;
      case "priceDesc":
        orderBy = { price: Prisma.SortOrder.desc };
        break;
      case "releaseDateAsc":
        orderBy = { createdAt: Prisma.SortOrder.asc };
        break;
      case "releaseDateDesc":
        orderBy = { createdAt: Prisma.SortOrder.desc };
        break;
      default:
        orderBy = { createdAt: Prisma.SortOrder.desc };
    }

    const data = await prisma.product.findMany({
      where: {
        category: category ? { equals: category } : undefined,
      },
      orderBy,
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
