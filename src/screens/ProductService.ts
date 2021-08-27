import { toast } from "react-toastify";
import { BaseService } from "./BaseService";

export default class ProductService extends BaseService {
  async getProducts() {
    const res = await this.instance.get("products");
    return res;
  }

  async postProduct(data: any) {
    const res = await this.instance.post("products", data);
    return res;
  }

  async deleteProduct(id: number) {
    const res = await this.instance.delete("products/" + id);
    return res;
  }

  async updateProduct(id: string, data: any) {
    const res = await this.instance.put("products/" + id, data);
    return res;
  }

  async getProductTypes() {
    const res = await this.instance.get("types");
    return res;
  }

  async successMessage(error: string) {
    toast.success(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  async failMessage(error: any) {
    toast.error(`Došlo je do greške: ${error} !`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
