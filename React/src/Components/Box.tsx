import { Dispatch, SetStateAction } from "react"

// type PropTypes = {
//     heading: string
//     children: ReactNode
// }

// const Box = <T,>({ heading, children }: PropTypes) => {
// const Box = <T extends {}>({ heading, children }: PropTypes) => {

type InputValType = number | string

const Box =
    <T extends InputValType>
        ({ label, val, setter }
            :
            { label: string, val: T, setter: Dispatch<SetStateAction<T>> }) => {
        return (
            <form>
                <label >
                    {label}
                </label>
                <input type="text" value={val as string} onChange={e => setter(e.target.value as T)} />
                <button type="submit">
                    Submit
                </button>
            </form>
        )
    }

export default Box