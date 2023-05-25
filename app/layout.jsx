import '@styles/globals.css'

export const metadata = {
  title: "BGVoter",
  description: "Create & Join Rooms to Vote for Board Game of the Night"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div /> {/* background here */}
        </div>

        <main className="app">
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout