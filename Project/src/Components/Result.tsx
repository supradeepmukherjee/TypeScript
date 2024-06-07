import { Button, Container, List, ListItem, Stack, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearState } from "../redux/slices"

const Result = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { words, result } = useSelector(({ root }: { root: State }) => root)
  let n = 0
  for (let i = 0; i < words.length; i++) {
    if (result[i] === words[i].meaning) n++
  }
  const resetHandler = (): void => {
    dispatch(clearState())
    navigate('/')
  }
  return (
    <Container maxWidth='sm'>
      <Typography variant='h3' color='primary' m='2rem 0'>
        Result
      </Typography>
      <Typography variant='h6' m='1rem'>
        You got {n} words correct out of {words.length} words
      </Typography>
      <Stack direction='row' justifyContent='space-evenly'>
        <Stack>
          <Typography m='1rem 0' variant='h5'>
            Your Answers
          </Typography>
          <List>
            {result?.map((w, i) => (
              <ListItem key={i}>
                {i + 1} - {w}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography variant='h5' m='1rem 0'>
            Correct Answers
          </Typography>
          <List>
            {words?.map((w, i) => (
              <ListItem key={w.meaning}>
                {i + 1} - {w.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
      <Typography m='1rem' variant='h5' color={((n * 100) / words.length) >= 50 ? 'green' : 'red'}>
        {((n * 100) / words.length) >= 50 ? 'Pass' : 'Fail'}
      </Typography>
      <Button sx={{ margin: '1rem' }} variant='contained' onClick={resetHandler}>
        Reset
      </Button>
    </Container>
  )
}

export default Result