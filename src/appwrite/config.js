
import conf from "../conf/conf";
import { Client, ID,Databases,Storage,Query } from "appwrite";


export class Service{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)  
        .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    };
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
           return await this.database.createDocument(
            conf.appwritedataBaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
           )
        } catch (error) {
            console.log("appwrite service :: createPost :: error",error); 
        }

    };
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.database.updateDocument(
                conf.appwritedataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost :: error",error); 
        }
    }
    async deletPost({slug}){
        try {
             await this.database.deleteDocument(
                conf.appwritedataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deletPost :: error",error); 
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwritedataBaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error",error); 
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status","active")] ){
        try {
            return await this.database.listDocuments(
                conf.appwritedataBaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite service :: getPosts :: error",error); 
            return false;
        }
    }
    //upload file
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                );
        } catch (error) {
            console.log("appwrite service :: uploadFile :: error",error); 
            return false;
        }
    }
    async deletFile(fileId){
        try {
           await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
                )
                return true;
        } catch (error) {
            console.log("appwrite service :: deletFile :: error",error); 
            return false;
        }
    }
    getfilePreview(fileId){
       return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
            )
    }
}

const service = new Service();
export default service;