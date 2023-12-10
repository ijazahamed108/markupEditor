import axios from "axios";
import DownloadButton from "../components/DownloadButton"
import {APP_DOMAIN, BACKEND_DOMAIN} from "../env"

function createHtmlFileContent(body) {
    body = body.replaceAll("\n", "\n\t\t")

    return `<!DOCTYPE html>
<html>
\t<head>
\t\t<meta charset="utf-8" />
\t\t<title>Html from markdown | mdeditor </title>
\t\t<link rel="stylesheet" href="${APP_DOMAIN}/markdown.css" />
\t</head>
\t<body>
\t\t<div class="markdown-body">
\t\t\t${body}
\t\t</div>
\t</body>
</html>
`
}

const HtmlView = (props) => {
    let contentHtml = props.content;

    async function handleClick(e) {
        if (contentHtml) {
            let body = {
                fileContent: createHtmlFileContent(contentHtml),
                file: {
                    truename: "index",
                    extension: "html"
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

    return (
        <div className="html-pane pane-container" ref={props.objRef}>
            <div 
                className="pane-text markdown-body" 
                dangerouslySetInnerHTML={{__html: contentHtml}}
            >
                
            </div>

            <DownloadButton onClick={handleClick} />
        </div>
    )
}

export default HtmlView