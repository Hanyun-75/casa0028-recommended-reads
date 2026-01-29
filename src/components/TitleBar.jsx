
function TitleBar({ title = "📚 My Reading List", subtitle }) {
  return (
    <header className="bg-white">
      <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-lg font-bold italic">
          {title}
        </h3>

        {subtitle ? (
          <p className="mt-1 text-center text-sm text-gray-600">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  )
}

export default TitleBar
