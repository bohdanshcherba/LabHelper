import { Storage } from "./storage"
import { SharedStorageService } from "./sharedStorage"

export const storage = new Storage()
export const sharedStorage = new SharedStorageService()
