import { Link } from 'react-router-dom';
import '../CSS/HomePage.css';
import pic from '../Images/blovks.svg';

export default function Home() {


  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
      <header>
        <img src={pic} alt="mock" />
      </header>
      <main>
        <h1>Welcome to our website!</h1>
        <p>Explore our features and Sign up now to have a better experience.</p>
      </main>
      <footer>
        <p>Copyright ©2022 MyWebsite</p>
      </footer>
    </div>
  );
}
