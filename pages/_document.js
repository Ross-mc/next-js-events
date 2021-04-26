import Document, {Html, Head, Main, NextScript} from "next/document"

//this is the default structure
//If we do not define a _document.js file
//next generates this structure on our behalf
//if we want to overwrite the defaul we must use the correct structure

//eg html has no default lang. We have added lang=en and therefore the page has lang
class MyDocument extends Document{
  render(){
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* <div id="overlays"/>  here we can add html elements that are outside
          the tree which next/react controls*/}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument