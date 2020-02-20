import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;