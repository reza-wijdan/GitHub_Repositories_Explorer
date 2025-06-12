import axios from "../axios";

class ApiSystem {
  static async searchUser(query: string): Promise<any> {
    const result = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=5`);
    return result.data; // ini sudah aman, TypeScript tahu ini object
  }

  static async getUserRepo(username: string): Promise<any> {
    const result = await axios.get(`https://api.github.com/users/${username}/repos`);
    return result.data;
  }
}

export default ApiSystem;
