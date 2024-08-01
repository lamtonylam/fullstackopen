const Error = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className='error'>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  )
}

export default Error
