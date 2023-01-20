
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import * as THREE from 'three'

export const lightPalette = {
    landColor1: new THREE.Color(0xffe600),
    landColor2: new THREE.Color(0xff7b2e),
    landBorderColor: new THREE.Color(0x8c0106),
    backgroundColor: new THREE.Color(0xfaeac8),
    constrastColor: new THREE.Color(0x000000)

}
export const darkPalette = {
    landColor1: new THREE.Color(0xFFFFFF),
    landColor2: new THREE.Color(0x000000),
    landBorderColor: new THREE.Color(0x0020a0),
    backgroundColor: new THREE.Color(0x303040),
    constrastColor: new THREE.Color(0xFFFFFF)
}

type Theme = "light" | "dark"
type ThemeContextType = ["light" | "dark", Dispatch<SetStateAction<Theme>>];

const ThemeContext = React.createContext<ThemeContextType>(['light', null!])


export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>('light');


    return <ThemeContext.Provider value={[theme, setTheme]}>
        {children}
    </ThemeContext.Provider>


}

export function useTheme() {

    const [theme, setTheme] = useContext(ThemeContext);
    const [palette, setPalette] = useState(lightPalette)

    function switchTheme() {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    useEffect(() => {
        if (theme === 'dark') {
            setPalette(darkPalette)
        } else {
            setPalette(lightPalette)
        }

    }, [theme])



    return {
        theme,
        palette,
        switchTheme
    }
}
