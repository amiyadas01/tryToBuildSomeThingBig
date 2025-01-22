/* eslint-disable no-useless-catch */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call a function to send email verification
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login(email, password) {
    try {
      const userAccount = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();

      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
    
    // eslint-disable-next-line no-unreachable
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}


const authService = new AuthService();

export default authService;
