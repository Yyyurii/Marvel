import ErrorMessage from '../components/errorMessage/ErrorMessage';

import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ textAlign: 'center', fontSize: '28px', margin: '20px auto' }}>
      <ErrorMessage />
      <p>Path does not exist</p>
      <Link
        to='/'
        style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', margin: '20px auto', color: '#9F0013' }}>
        Back to the home page
      </Link>
    </div>
  )
}

export default Page404;