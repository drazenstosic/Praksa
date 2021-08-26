import { BaseService } from "./BaseService";

export default class ProductService extends BaseService {
  async getProducts(id: number) {
    const res = await this.instance.get("localhost:3000/products");
    return res;
  }

  async postProducts() {
    const res = await this.instance.post("localhost:3000/products");
    return res;
  }

  async deleteFood() {
    const res = await this.instance.delete("localhost:3000/products/id");
    return res;
  }

  async updateFood() {
    const res = await this.instance.put("localhost:3000/products/id");
    return res;
  }

  async getProductTypes(id: string) {
    const res = await this.instance.get("food-types/" + id, {});
    return res;
  }
}
