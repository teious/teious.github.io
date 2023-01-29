import { GithubIcon, LinkedInIcon } from '../../icons';
import { useTheme } from '../../theme';
import './Links.css'; 

function Links() {
  const { palette } = useTheme()

  const highlightTextStyle = {
    transition: 'all 0.3s',
    fill: palette.constrastColor
  }
  return <div className='links-container'>
      <a target="_blank" rel="noreferrer" href="https://github.com/teious">
      <GithubIcon style={highlightTextStyle}/>
    </a>
    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/talespinto/">
      <LinkedInIcon style={highlightTextStyle}/>
    </a>
  </div>
}

export { Links }