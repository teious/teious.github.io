import { useEffect } from "react";
import { BackgroundScene } from "./background/BackgroundScene"
import { useTheme } from "./background/theme";

export default function App() {
  const { palette } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = `#${palette.backgroundColor.getHexString()}`;
    document.body.style.color = `#${palette.constrastColor.getHexString()}`;
  }, [palette])

  return (
    <>
      <div className="background-container" >
        <BackgroundScene />
      </div>
      <main>
        <h1><span>t</span>ales pinto</h1>
        <h4>fullstack developer</h4>
      </main>
    </>
  )
}
