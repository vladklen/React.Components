import GitLogo from '../assets/github.svg';
import RssLogo from '../assets/rss.svg';

const Footer = () => {
  return (
    <footer>
      <a href="https://rs.school/react" target="_blank" rel="noreferrer">
        <img src={RssLogo} />
      </a>
      <p>2023</p>
      <a href="https://github.com/vladklen" target="_blank" rel="noreferrer">
        <img src={GitLogo} />
      </a>
    </footer>
  );
};

export default Footer;
