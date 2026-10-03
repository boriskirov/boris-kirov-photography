import Head from "next/head";

const Metadata = ({ title, description, image }) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <link rel="icon" href="/ico.ico" />
      <link rel="apple-touch-icon" href="/ico.ico" />
      <meta name="title" content="Boris Kirov" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Boris Kirov" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta name="og:title" property="og:title" content={title} />
      <meta
        property="og:site_name"
        content="Boris Kirov- movement, photography & brain stuff"
      />
      <meta property="og:url" content="https://boriskirov.photos" />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://boriskirov.photos/" />
      <meta property="twitter:title" content="Boris Kirov" />
      <meta
        property="twitter:description"
        content="Boris Kirov- movement, photography & brain stuff"
      />
    </Head>
  );
};
export default Metadata;
