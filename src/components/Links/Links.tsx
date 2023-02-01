import { GithubIcon, LinkedInIcon } from '../../icons';
import { useTheme } from '../../theme';
import './Links.css';

function Links() {
  const { palette } = useTheme()

  return <div className='links-container'>
    <a target="_blank" rel="noreferrer" href="https://github.com/teious">
      <GithubIcon className="link-icon" fill={palette.constrastColor} />
    </a>
    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/talespinto/">
      <LinkedInIcon className="link-icon" fill={palette.constrastColor} />
    </a>
  </div>
}

export { Links }