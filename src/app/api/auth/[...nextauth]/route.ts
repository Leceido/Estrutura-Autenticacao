import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                cpf: { label: 'cpf', type: "text", },
                password: { label: 'password', type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    return await requestUser(credentials?.cpf, credentials?.password)
                } catch (error) {
                    console.log(credentials?.cpf, credentials?.password);
                    console.log("try catch do authorize ", error);
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}) {
            
            user && (token.user = user)
            
            return token
        },
        async session({session, token}) {
            
            session = token.user as any
            
            return session
        },
    },
    session: {
        maxAge: 60 * 10
    }
}
const handler = NextAuth(nextAuthOptions)

async function requestUser(cpf: any, password: any) {
    const response = await fetch('http://127.0.0.1:5000/users/signin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cpf: cpf,
            password: password,
        })
    })

    const user = await response.json()


    if (user && response.ok) {
        return user
    }
}

export { handler as GET, handler as POST, nextAuthOptions }