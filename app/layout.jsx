import '@styles/globals.css'

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: "BGVoter",
  description: "Streamline your game nights! Create custom game rooms, vote for the next game, and archive completed games for future reference. The ultimate platform for collaborative gaming decisions."
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"/> {/* background here */}
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout