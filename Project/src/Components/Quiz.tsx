import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveResult } from "../redux/slices"

const Quiz = () => {
  const [result, setResult] = useState<string[]>([])
  const [count, setCount] = useState<number>(0)
  const [ans, setAns] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { words } = useSelector(({ root }: { root: State }) => root)
  const nextHandler = (): void => {
    setResult([...result, ans])
    setCount(count + 1)
    setAns('')
  }
  useEffect(() => {
    if (count + 1 > words.length) navigate('/result') // don't use return here so that when navigating the result is also saved
    dispatch(saveResult(result))
  }, [count, dispatch, navigate, result, words.length])
  return (
    <Container sx={{ maxWidth: '1rem' }} maxWidth='sm'>
      <Typography m='2rem 0'>
        Quiz
      </Typography>
      <Typography variant='h3'>
        {count + 1}. {words[count]?.word}
      </Typography>
      <FormControl>
        <FormLabel sx={{
          mt: '2rem',
          mb: '1rem'
        }}>
          Meaning
        </FormLabel>
        <RadioGroup value={ans} onChange={e => setAns(e.target.value)}>
          {words[count]?.options?.map(o => <FormControlLabel value={o} control={<Radio />} label={o} key={o} />)}
        </RadioGroup>
      </FormControl>
      <Button sx={{ margin: '3rem 0' }} variant='contained' fullWidth onClick={nextHandler} disabled={ans === ''}>
        {count === words?.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </Container>
  )
}

export default Quiz