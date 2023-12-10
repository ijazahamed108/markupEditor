import axios from "axios";
import {useEffect, useRef} from "react"
import DownloadButton from "../components/DownloadButton"
import {BACKEND_DOMAIN} from "../env"


const MarkDownEditor = (props) => {
    let contentMarkdown = props.content
    let setMarkdown = props.setMarkdown
    let textarea = useRef(null)

    function handleChange(event) {
        let markD = event.target.value;
        setMarkdown(markD);
    }

    async function handleClickDownload(e) {
        if (contentMarkdown) {
            let body = {
                fileContent: contentMarkdown,
                file: {
                    truename: "README",
                    extension: "md"
                }
            }
            let res;
    
            try {
                res = await axios.post(BACKEND_DOMAIN + "/files", body);
    
                if (res.status === 200) {
                    let {filename, token} = res.data;
                    window.location = `${BACKEND_DOMAIN}/files/${filename}?token=${token}`;
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    function handleClickClear(e) {
        setMarkdown("")
    }

    useEffect(() => {
        textarea.current.focus()
    })

    return (
        <div className="markdown-pane pane-container">
            {/* Use dangerously set html */}
            <textarea 
                ref={textarea} 
                className="pane-text" 
                onChange={handleChange} 
                value={contentMarkdown || ""}
                placeholder="Input your Markdown here"
            >
            </textarea>

            <DownloadButton onClick={handleClickDownload} />

            <button onClick={handleClickClear} className="btn clear-btn">
                Clear
            </button>
        </div>
    )
}

export default MarkDownEditor;