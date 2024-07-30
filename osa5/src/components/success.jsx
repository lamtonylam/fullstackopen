const Success = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className='success'>
      <p style={{ color: 'green' }}>{message}</p>
    </div>
  );
};

export default Success;
