import {motion} from "framer-motion";
import IconDownlaod from "../assets/icons/download.svg"

const DownloadButton = (props) => {
    let content = props.content;
    let handleClick = props.onClick;

    return (
        <motion.button 
        whileHover={{scale: 1.1, opacity: 1}}
        transition={{
            type: "spring",
            damping: 10,
            stiffness: 500
          }}
        style={{fontWeight: "bold"}}
        whileTap={{scale: 1.05}}
        onClick={handleClick} 
        className="btn download-btn"
        >
            <img src={IconDownlaod} alt="download icon" />
            {content} 
        </motion.button>
    )
}

export default DownloadButton;

