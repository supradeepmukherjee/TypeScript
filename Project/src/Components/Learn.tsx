import { ArrowBack, VolumeUp } from "@mui/icons-material"
import { Button, Container, Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { listen, translate } from "../utils/features"
import { useDispatch, useSelector } from "react-redux"
import { clearState, wordsFail, wordsRequest, wordsSuccess } from "../redux/slices"
import Loader from "./Loader"

const Learn = () => {
  const audioRef = useRef(null)
  const [count, setCount] = useState<number>(0)
  const [audioSrc, setAudioSrc] = useState<string>('')
  const to = useSearchParams()[0].get('l') as Lang
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, words, error } = useSelector(({ root }: { root: State }) => root)
  const nextHandler = ():void => {
    setCount(count + 1)
    setAudioSrc('')
  }
  const listenHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!
    if (player) player.play()
    else {
      const data = await listen(words[count].word, to)
      setAudioSrc(data)
    }
  }
  useEffect(() => {
    dispatch(wordsRequest())
    translate(to)
      .then(arr => dispatch(wordsSuccess(arr)))
      .catch(err => dispatch(wordsFail(err)))
    if (error) {
      alert(error)
      dispatch(clearState())
    }
  }, [dispatch, error, to])
  if (loading) return <Loader />
  return (
    <Container maxWidth='sm' sx={{ padding: '1rem' }}>
      {audioSrc && <audio src={audioSrc} ref={audioRef} autoPlay></audio>}
      <Button onClick={() => { count === words?.length - 1 ? navigate('/') : setCount(count - 1) }}>
        <ArrowBack />
      </Button>
      <Typography sx={{ m: '2rem 0' }}>
        Learning made Simple
      </Typography>
      <Stack direction='row' spacing='1rem'>
        <Typography variant='h4'>
          {count + 1}. {words[count]?.word}
        </Typography>
        <Typography color='blue' variant='h4'>
          : {words[count]?.meaning}
        </Typography>
        <Button sx={{ borderRadius: '50%' }} onClick={listenHandler}>
          <VolumeUp />
        </Button>
      </Stack>
      <Button variant='contained' fullWidth sx={{ margin: '3rem 0' }} onClick={() => { count === words?.length - 1 ? navigate('/quiz') : nextHandler() }}>
        {count === words?.length - 1 ? 'Test Me' : 'Next'}
      </Button>
    </Container>
  )
}

export default Learn