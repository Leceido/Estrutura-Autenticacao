'use client'

import { SyntheticEvent, useState } from "react"
import {useRouter} from 'next/navigation'
import Link from "next/link";

export default function Cadastrar() {
    const [cpf, setCpf] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter()

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()
        try {
            const response = await fetch('https://banco-api.onrender.com/users/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cpf: cpf,
                    name: nome,
                    password: password,
                })
            })
            const data = await response.json()
            if(response.status == 201) {
                
                router.replace('/login')
            } else {
                
            }
        } catch {
            
            router.replace('/login')
        }
    }

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>

                <div className="sm:mx-auto sm:w-full sm:max-w-sms">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="logo.png"
                        alt="Banco app"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Crie sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                                CPF/CNPJ
                            </label>
                            <div className='mt-2'>
                                <input
                                    type="text"
                                    id='cpf'
                                    name="cpf"
                                    placeholder="Apenas os numeros"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className='mt-2'>
                                <input
                                    type="text"
                                    id='name'
                                    name="name"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Senha
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Senha numerica"
                                    required
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Já tem uma conta?{' '}
                        <Link href='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Faça login
                        </Link>
                    </p>
                </div>
            </div>
            
        </>
        
    )
}