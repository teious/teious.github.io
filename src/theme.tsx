
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

export const lightPalette = {
    landColor1: '#ffe600',
    landColor2: '#ff7b2e',
    landBorderColor: '#8c0106',
    backgroundColor: '#faeac8',
    constrastColor: '#000000'
}
export const darkPalette = {
    landColor1: '#FFFFFF',
    landColor2: '#000000',
    landBorderColor: '#2088ff',
    backgroundColor: '#303040',
    constrastColor: '#FFFFFF'
}

export type Theme = "light" | "dark"
type ThemeContextType = ["light" | "dark", Dispatch<SetStateAction<Theme>>];

const ThemeContext = React.createContext<ThemeContextType>(['light', null!])


export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const storedTheme = localStorage.getItem('theme') as Theme | null
    const [theme, setTheme] = useState<Theme>(storedTheme || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

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
