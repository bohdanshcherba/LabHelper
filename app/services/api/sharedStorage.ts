import { NativeModules } from "react-native"


export class SharedStorageService {

  SharedStorage = NativeModules.SharedStorage

  public async save(value: any): Promise<boolean> {
    try {
      await this.SharedStorage.set(JSON.stringify(value))
      return true
    } catch {
      return false
    }
  }
  public async forceUpdateWidget() {

    await this.SharedStorage.forceUpdateWidget()

  }


}
