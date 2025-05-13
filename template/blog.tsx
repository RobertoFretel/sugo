export type TemplateProps = {
  children: React.ReactNode
  title: string,
  author: string
}

export default function ({ title, author, children } : TemplateProps) {
  return (
    <html className="w-full h-full m-0 p-0">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/stile.css" />
      </head>
    <body className="w-full h-full m-0 p-0 flex justify-center">
      <main id="app" className="p-4 w-9/10 h-full sm:w-7/10 md:w-6/10">
        {children}
      </main>
    </body>
    </html>
  )
}