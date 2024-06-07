import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" mr='auto'>
        LEARNLANG
      </Typography>
      <Link
        to='/'
        style={{
          color: 'white',
          margin: '.5rem',
          textDecoration: 'none'
        }}
      >
        Home
      </Link>
    </Toolbar>
  </AppBar>
)

export default Header