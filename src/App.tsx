import { useEffect } from "react";
import { BackgroundScene } from "./background/BackgroundScene"
import { useTheme } from "./theme";
import { Links } from "./components/Links/Links";
import './App.css'

export default function App() {
  const { palette, switchTheme, theme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = palette.backgroundColor;
    document.body.style.color = palette.constrastColor;
  }, [palette])

  return (
    <>
      <div className="background-container" >
        <BackgroundScene />
      </div>
      <main>
        <h1>tales pinto</h1>
        <h4>fullstack developer</h4>
        <Links/>
        <div role="button" className="theme-button" onClick={switchTheme}>
          {theme === 'dark'? '☀':'☾'}
        </div>
      </main>
    </>
  )
}
