/// <reference types="vite/client" />

type Lang = 'ne' | 'hi' | 'bn'

type Word = {
    word: string
    meaning: string
    options: string[]
}

type State = {
    loading: boolean
    result: string[]
    words: Word[]
    error?: string
}

type ApiData = { translations: { text: string }[] }