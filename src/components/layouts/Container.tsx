function Container({ children }) {
  function greeting() {
    const time = new Date().getHours()
    if (time < 12) {
      return "Good Morning!"
    }
    if (time < 18) {
      return "Good Afternoon!"
    }
    return "Good Evening!"
  }
  return (
    <div
      style={{
        padding: "60px 40px",
        background: "linear-gradient(to top, #BADBFB , #FFFFFF )"
      }}>
      <div>
        <p className="text-xl font-medium bg-gradient-to-r from-blue-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          {greeting()}
        </p>
      </div>
      {children}
    </div>
  )
}

export default Container
