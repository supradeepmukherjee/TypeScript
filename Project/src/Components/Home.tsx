import { Button, Container, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const languages = [
    {
        name: 'Nepali',
        code: 'ne'
    },
    {
        name: 'Hindi',
        code: 'hi'
    },
    {
        name: 'Bangla',
        code: 'bn'
    },
]

const Home = () => {
    const navigate = useNavigate()
    return (
        <Container maxWidth='sm'>
            <Typography variant="h3" p='2rem' textAlign='center'>
                Welcome to the world of Self Learning New Languages
            </Typography>
            <Stack direction='row' spacing='2rem' p='2rem' alignItems='center' justifyContent='center'>
                {languages.map(({ name, code }) => (
                    <Button key={code} variant='contained' onClick={() => navigate(`/learn?l=${code}`)}>
                        {name}
                    </Button>
                ))}
            </Stack>
            <Typography textAlign='center'>
                Choose 1 language from above
            </Typography>
        </Container>
    )
}

export default Home