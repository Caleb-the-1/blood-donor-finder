import { useState, useEffect } from 'react'

function ThemeToggle() {

  
    
  const savedTheme = localStorage.getItem('theme')
  const [isLight, setIsLight] = useState(savedTheme === 'light')

  function toggleTheme() {
    const newTheme = !isLight
    setIsLight(newTheme)

    if (newTheme) {
      document.body.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }

  
  useEffect(() => {
    if (savedTheme === 'light') {
      document.body.classList.add('light')
    }
  }, [])

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isLight ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export default ThemeToggle