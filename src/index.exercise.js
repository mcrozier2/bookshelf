import * as React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function App() {
  const [openDialog, setOpenDialog] = React.useState('none');

  const closeDialog = () => setOpenDialog('none');

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenDialog('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenDialog('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openDialog === 'login'}>
        <div>
          <button onClick={closeDialog}>close</button>
        </div>
        <h3>Login</h3>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openDialog === 'register'}>
        <div>
          <button onClick={closeDialog}>close</button>
        </div>
        <h3>Register</h3>
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
