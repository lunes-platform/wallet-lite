import cryptoJs from "crypto-js"

export const encryptHmacSha512 = (value: string, key: string) =>
    cryptoJs.HmacSHA512(value, key).toString()

export const encryptAes = (value: string, key: string) =>
    cryptoJs.AES.encrypt(value, key).toString()

export const decryptAes = (value: string, key: string) =>
    cryptoJs.AES.decrypt(value, key).toString(cryptoJs.enc.Utf8)

export const encryptSha512 = (value: string) =>
    cryptoJs.SHA512(value).toString()
