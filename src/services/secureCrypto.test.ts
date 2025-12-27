import { describe, it, expect } from 'vitest'
import {
    encryptSecure,
    decryptSecure,
    hashPassword,
    verifyPasswordHash,
    generateSalt,
    deriveKey
} from './secureCrypto'

describe('secureCrypto', () => {
    describe('generateSalt', () => {
        it('deve gerar um salt de 16 bytes', () => {
            const salt = generateSalt()
            expect(salt).toBeInstanceOf(Uint8Array)
            expect(salt.length).toBe(16)
        })

        it('deve gerar salts únicos a cada chamada', () => {
            const salt1 = generateSalt()
            const salt2 = generateSalt()
            expect(salt1).not.toEqual(salt2)
        })
    })

    describe('encryptSecure / decryptSecure', () => {
        it('deve criptografar e descriptografar texto corretamente', async () => {
            const plaintext = 'minha seed phrase secreta'
            const password = 'senha_forte_123!'

            const encrypted = await encryptSecure(plaintext, password)
            expect(encrypted).toBeDefined()
            expect(encrypted).not.toBe(plaintext)

            const decrypted = await decryptSecure(encrypted, password)
            expect(decrypted).toBe(plaintext)
        })

        it('deve falhar ao descriptografar com senha errada', async () => {
            const plaintext = 'texto secreto'
            const password = 'senha_correta'
            const wrongPassword = 'senha_errada'

            const encrypted = await encryptSecure(plaintext, password)

            await expect(decryptSecure(encrypted, wrongPassword)).rejects.toThrow()
        })

        it('deve produzir criptografias diferentes para o mesmo texto', async () => {
            const plaintext = 'mesmo texto'
            const password = 'mesma senha'

            const encrypted1 = await encryptSecure(plaintext, password)
            const encrypted2 = await encryptSecure(plaintext, password)

            // Salt aleatório garante que o resultado seja diferente
            expect(encrypted1).not.toBe(encrypted2)
        })
    })

    describe('hashPassword / verifyPasswordHash', () => {
        it('deve verificar senha correta com sucesso', async () => {
            const password = 'minha_senha_secreta'
            const hash = await hashPassword(password)

            expect(hash).toBeDefined()
            expect(hash.length).toBeGreaterThan(0)

            const isValid = await verifyPasswordHash(password, hash)
            expect(isValid).toBe(true)
        })

        it('deve rejeitar senha incorreta', async () => {
            const password = 'senha_correta'
            const wrongPassword = 'senha_errada'
            const hash = await hashPassword(password)

            const isValid = await verifyPasswordHash(wrongPassword, hash)
            expect(isValid).toBe(false)
        })

        it('deve produzir hashes diferentes para a mesma senha (salt único)', async () => {
            const password = 'mesma_senha'
            const hash1 = await hashPassword(password)
            const hash2 = await hashPassword(password)

            // Salt aleatório garante hashes diferentes
            expect(hash1).not.toBe(hash2)

            // Mas ambos devem validar a mesma senha
            expect(await verifyPasswordHash(password, hash1)).toBe(true)
            expect(await verifyPasswordHash(password, hash2)).toBe(true)
        })
    })

    describe('Segurança', () => {
        it('hash de senha deve conter salt (mais de 32 bytes base64)', async () => {
            const hash = await hashPassword('qualquer_senha')
            // 16 bytes salt + 32 bytes hash = 48 bytes = ~64 chars em base64
            expect(hash.length).toBeGreaterThan(60)
        })

        it('criptografia deve conter salt + iv + ciphertext', async () => {
            const encrypted = await encryptSecure('texto', 'senha')
            // 16 salt + 12 iv + ciphertext = pelo menos 28 bytes = ~40 chars base64
            expect(encrypted.length).toBeGreaterThan(40)
        })
    })
})
