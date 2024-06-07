import axios from 'axios'
import _ from 'lodash'
import { generate } from 'random-words'

export const translate = async (to: string) => {
    try {
        const rawWords = generate(8) as string[]
        const words = rawWords.map(w => ({ Text: w }))
        const { data } = await axios.post(
            'https://microsoft-translator-text.p.rapidapi.com/translate',
            words,
            {
                params: {
                    to,
                    'api-version': '3.0',
                    profanityAction: 'NoAction',
                    textType: 'plain'
                },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
            }
        )
        const fetchedData: ApiData[] = data
        const arr: Word[] = fetchedData.map(({ translations }, i): {
            word: string,
            meaning: string,
            options: string[]
        } => {
            const correct: string = words[i].Text
            const incorrectMeanings = words.filter(w => w.Text !== correct)
            const incorrect: string[] = _.sampleSize(incorrectMeanings, 3).map(m => m.Text)
            return {
                word: translations[0].text,
                meaning: words[i].Text,
                options: _.shuffle([correct, ...incorrect])
            }
        })
        return arr
    } catch (err) {
        console.log(err)
        throw new Error('Something went Wrong')
    }
}

export const listen = async (src: string, lang: Lang) => {
    try {
        let hl: string = ''
        if (lang === 'hi') hl = 'hi-in'
        // nepali, bangla not available yet
        const { data }: { data: string } = await axios.post(
            'https://voicerss-text-to-speech.p.rapidapi.com/',
            {
                src,
                hl,
                r: '0',
                c: 'mp3',
                f: '8khz_8bit_mono'
            },
            {
                params: { key: import.meta.env.VITE_VOICE_KEY },
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
                    'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
            }
        )
        return data
    } catch (err) {
        console.log(err)
        throw new Error('Something went Wrong')
    }
}