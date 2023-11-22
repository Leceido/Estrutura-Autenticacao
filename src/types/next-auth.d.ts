import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        token: string
        user: {
            cpf: string
            name: string
        }
    }
}