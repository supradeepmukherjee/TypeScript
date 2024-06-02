// function
type Uname = (m: number, n: number) => number
const f: Uname = (a, b) => {
    return a + b
}

// new syntax
const arr2: Array<number | string> = []

// fixed size array/tuple
const arr3: [number, number, number, number, number,] = [7, 7, 7, 7, 7]

// objects
class Player {
    private weight
    public height
    protected age
    constructor(height: number, weight: number, age: number) {
        this.height = height
        this.weight = weight
        this.age = age
    }
}
/* Above is the same as below */
class Player2 {
    readonly id: string
    constructor(public height: number, private weight: number, protected age: number) {
        this.id = String(Math.random() * 100000)
    }
}

class Desi extends Player2 {
    naya: boolean
    constructor(height: number, weight: number, age: number, naya: boolean) {
        super(height, weight, age)
        this.naya = naya
    }
    get getHeight(): number { return this.height }
    set setHight(height: number) { this.height = height }
}

const manus = new Desi(177, 2, 3, true)
// console.log(manus.getHeight)
manus.height = 769
// console.log(manus.getHeight)

// Type Assertion

const btn = document.getElementById('btn') as HTMLElement
// above same as below
const btn2 = <HTMLElement>document.getElementById('btn')

// another hack but below one is NOT Type Assertion
const btn3 = document.getElementById('btn')!

const img = document.getElementById('imgId') as HTMLImageElement
const img2 = document.querySelector('img')! // can work if not null is written 
img.src

const form = document.getElementById('form') as HTMLFormElement
const input = document.querySelector('form > input') as HTMLInputElement
form.onsubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const val = Number(input.value)
    const h2 = document.createElement('h2')
    h2.textContent = String(val + 20)
    document.querySelector('body')?.append(h2)
}

// Index Signature
interface Person {
    // name: string
    // email: string
    [key: string]: string
}

const obj: Person = {
    name: 'Manus',
    email: 'manus@mail.com'
}

const getName = (): string => obj['name']
const getEmail = (): string => obj['name']

const getData = (key: keyof Person): string => obj[key]

// Index Signature with Type Assertion
interface Person2 {
    name: string
    email: string
}

const obj2: Person = {
    name: 'Manus',
    email: 'manus@mail.com'
}

let key = 'name'

obj2[key as keyof Person2]
obj2[key as keyof typeof obj2]


/* Type Utility */

// Partial<Type>
type U = {
    a: string
    b: string
}
type U2 = {
    a?: string
    b?: string
}
type U3 = Partial<U>

// Required<Type> - Opposite of Partial (TIY)

// ReadOnly<Type> (TIY)

// Record<Keys,Type>

type User = {
    name: string
    email: string
}
// below same as above
type User5 = Record<'name' | 'email', string>
// use case of Record is shown below
interface UserDetails { age: number }

type U5 = 'Desi' | 'Bhai' | 'Bharat' | 'Jai Hindustan'

const users: Record<U5, UserDetails> = {
    Desi: {
        age: 5
    },
    Bhai: {
        age: 5
    },
    Bharat: {
        age: 5
    },
    'Jai Hindustan': {
        age: 5
    },
}


// Pick<Type,Key>
interface Info {
    readonly id: string
    user: string
    district: string
}

type Info2 = Pick<Info, 'id' | 'district'>


// Omit - opposite of Pick (TIY)


// Exclude

type myUnion = string | number | boolean
// type Random = Exclude<string | number, number>
type Random = Exclude<myUnion, number>


// Extract - opposite of Exclude
type Union = string | number | boolean
type R = Extract<Union, boolean>

// Non Nullable
type Union2 = string | number | null | boolean | undefined
type Check = NonNullable<Union2> // SAME AS: type Check = Exclude<Union2, null | undefined>


// Parameters
const fn = (a: string, b: string) => a + b

type P = Parameters<typeof fn>


// ConstructorParameters
class S {
    constructor(public q: string, public u: string) { }
}
type C = ConstructorParameters<typeof S>


// ReturnType
const func = (q: number, j: number) => q + j

type F = ReturnType<typeof func>


// InstanceType
type Rand = InstanceType<typeof S>

const u: Rand = {
    q: '',
    u: ''
}


/* GENERICS */
const f2 = <DesiType>(q: DesiType): DesiType => {
    const timePass: DesiType = q
    let t: DesiType
    return q
}

const ans = f2(20)

type P2 = {
    name: string
    age: number
}

const f3 = <DesiType>(q: DesiType): DesiType => {
    const timePass: DesiType = q
    let t: DesiType
    return q
}

const p: P2 = {
    name: 'Supradeep',
    age: 19
}

const ans2 = f2(p)
const ans3 = f2<string>('')
const ans4 = f2<P2>(p)

const f5 = <Q, J>(q: Q, j: J): { q: Q, j: J } => ({ j, q })

const ba = f5<number, string>(7, '')

type Hello = {
    name: string
    age: number
}

type Darun = {
    name: string
    age: number
    dob: number
}

const f6 = <Q, J extends Q>(q: Q, j: J): { q: Q, j: J } => ({ j, q })

const b = f6
    <Hello, Darun>
    (
        {
            name: '',
            age: 7
        },
        {
            name: '',
            age: 7,
            dob: 1
        }
    )

const users2: Hello[] = [
    {
        name: 'Mukherjee',
        age: 20
    },
    {
        name: 'Supradeep',
        age: 19
    },
]

const filterByPeoples = <Q, DesiKey extends keyof Q>(arr: Q[], prop: DesiKey, val: Q[DesiKey]): Q[] => arr.filter(i => i[prop] === val)

const filteredPeopleByName = filterByPeoples(users2, 'name', 'Supradeep')