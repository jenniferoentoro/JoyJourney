import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet"/>


          <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/images/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#3D210F"/>
          <meta name="msapplication-TileColor" content="#f3f2ed"/>
          <meta name="theme-color" content="#f3f2ed"/>


          <title>{process.env.APP_TITLE}</title>

        </Head>
        <body className='max-w-[100vw] overflow-x-hidden '>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
