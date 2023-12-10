import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MarkDownEditor from "../src/components/MarkDownEditor";
import HtmlView from "../src/components/HtmlView";
import {BACKEND_DOMAIN} from "./env"

function App() {
  let [markdown, setMarkdown] = useState(null);
  let [html, setHtml] = useState(null);
  let htmlPaneContainer = useRef(null);

  useEffect(() => {
    let markD = localStorage.getItem("contentMarkdown");

    setMarkdown("" ||  markD)
  }, [])

  useEffect(() => {
    /* Reload html when markdown text changed 
    *
    */

    (async () => {
      let htmlContent
      let res
      htmlContent = "Rendered Html from Markup"
      
      if (markdown !== null) {
        

        // convert markdown to html
        try {
          res = await axios.post(BACKEND_DOMAIN + "/md2html", {
            markdown: markdown
          })

          if (res.status === 200) {
            htmlContent = res.data.html;
            htmlPaneContainer.current.classList.remove("skeleton-animation");
          }
        } catch (error) {
          htmlPaneContainer.current.classList.add("skeleton-animation");
          console.log(error)
        }
        
        // save markdown in local storage
        localStorage.setItem("contentMarkdown", markdown);
      }

    //Set Html to Update it
      setHtml(htmlContent)
    })();
    
  }, [markdown])

  return (
    <div className="App min-height-full">
      <div className="ide-container">
        <MarkDownEditor content={markdown} setMarkdown={setMarkdown} rel="noopener" />
        <HtmlView content={html} objRef={htmlPaneContainer} />
      </div>

      <a href="https://github.com/ijazahamed108" target="_blank" rel="noreferrer">
        <div className="github-btn-container">
          <div className="github-btn">
            {/* Github svg icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </div>
          <span className="github-btn-text"> 
             Ijaz Ahamed
            </span>
        </div>
        </a>
    </div>
  );
}

export default App;
