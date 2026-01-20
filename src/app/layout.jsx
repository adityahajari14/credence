import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollButton from '@/components/ScrollButton'

export const metadata = {
  title: 'Credence Realtor - Dubai Real Estate',
  description: 'Find the right property in Dubai - Backed by Insight, Not Guesswork',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollButton />
      </body>
    </html>
  )
}
