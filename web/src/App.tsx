import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { ContentStatus } from './components/ContentStatus'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import type { SiteSettings } from './content/types'
import { useContent } from './content/useContent'
import { BiographyPage } from './pages/BiographyPage'
import { ContactPage } from './pages/ContactPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SchedulePage } from './pages/SchedulePage'

export function App() {
  const settings = useContent('settings')
  if (settings.status !== 'ready') return <ContentStatus {...settings} />

  return (
    <Routes>
      <Route element={<Layout settings={settings.data} />}>
        <Route index element={<HomePage settings={settings.data} />} />
        <Route path="biography" element={<BiographyPage settings={settings.data} />} />
        <Route path="schedule" element={<SchedulePage settings={settings.data} />} />
        <Route path="gallery" element={<GalleryPage settings={settings.data} />} />
        <Route path="contact" element={<ContactPage settings={settings.data} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

function Layout({ settings }: { settings: SiteSettings }) {
  const { pathname } = useLocation()

  // A new page starts at the top, like a normal page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Nav name={settings.name} />
      <main>
        <Outlet />
      </main>
      {/* The contact page already lists every link, so its footer skips the icons */}
      <Footer settings={settings} showSocial={pathname !== '/contact'} />
    </>
  )
}
