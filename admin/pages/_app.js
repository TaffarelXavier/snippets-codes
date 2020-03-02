import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

class MyApp extends App {
  
  // componentDidMount() {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentNode.removeChild(jssStyles);
  //   }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Admin</title>
          <link rel="stylesheet" href="http://192.168.129.141:5000/assets/js/highlight.min.js" />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/dracula.min.css'/>
        </Head>
          <CssBaseline />
          <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
