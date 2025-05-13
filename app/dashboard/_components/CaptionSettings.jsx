import React from 'react';

function CaptionSettings({ videoData, onVideoDataChange }) {
    const fonts = [
        "Arial",
        "Arial Black",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Lucida Sans Unicode",
        "Palatino Linotype",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
        "Helvetica",
        "Gill Sans",
        "Century Gothic",
        "Candara",
        "Comic Sans MS",
        "Consolas",
        "Cambria",
        "Garamond",
        "Perpetua",
        "Monaco",
        "Franklin Gothic Medium",
        "Didot",
        "Optima",
        "Bookman",
        "Rockwell",
        "Bodoni MT",
        "Baskerville",
        "Century Schoolbook",
        "Futura",
        "Lucida Bright",
        "Copperplate",
        "Brush Script MT",
        "Gill Sans MT",
    ];
    return (
        <div>
                <label htmlFor="showCaptions" className="mr-2 text-white text-xs">Show Captions:</label>
                <br></br>
                <input width="200"
                    type="checkbox"
                    id="showCaptions"
                    checked={videoData.showCaptions || false} // Default to false if not provided
                    onChange={(e) => onVideoDataChange({ ...videoData, showCaptions: e.target.checked })}
                    className="bg-neutral-700 rounded"
                /><br></br>
            {/* ... (Other settings similarly structured) ... */}
            <label htmlFor="captionPosition" className="mr-2 text-white">Caption Position:</label>
            <select style={{width: 136}}
                id="captionPosition"
                value={videoData.captionPosition || "bottom"}
                onChange={(e) => onVideoDataChange({ ...videoData, captionPosition: e.target.value })}
                className="bg-neutral-700 text-white p-1 rounded"
            >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
            </select>

            {/* ... (Other caption settings follow the same pattern) ... */}
            <br></br>
            <label htmlFor="captionSize" className="mr-2 text-white">Caption Size:</label>
            <input style={{width: 136}}
                type="number"
                id="captionSize"
                value={videoData.captionSize || 50} // Default size if not provided
                onChange={(e) => onVideoDataChange({ ...videoData, captionSize: parseInt(e.target.value, 10) || 24 })}
                className="bg-neutral-700 text-white p-1 rounded w-16"
                min="10"
                max="100"
            />


            <br></br>
            <label htmlFor="captionColor" className="mr-2 text-white">
                Caption Color:
            </label>
            <input
                type="color"
                id="captionColor"
                value={videoData.captionColor || "#FFFFFF"}
                onChange={(e) => onVideoDataChange({ ...videoData, captionColor: e.target.value })}
                className="bg-neutral-700 rounded"
            />
            {/* ... (Other settings similarly structured) ... */}
            <br></br>
            <label htmlFor="captionFont" className="mr-2 text-white">
                Caption Font:
            </label>
            <select style={{width: 136}}
                id="captionFont"
                value={videoData.captionFont || fonts[0]} // Default to first font
                onChange={(e) => onVideoDataChange({ ...videoData, captionFont: e.target.value })}
                className="bg-neutral-700 text-white p-1 rounded"
            >
                {fonts.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                        {font}
                    </option>
                ))}
            </select>
            {/* ... other settings ... */}


                <label htmlFor="captionBold" className="mr-2 text-white">Bold:</label>
                <input
                    type="checkbox"
                    id="captionBold"
                    checked={videoData.captionBold || false}  // Default to false
                    onChange={(e) => onVideoDataChange({ ...videoData, captionBold: e.target.checked })}
                    className="bg-neutral-700 rounded"
                />

                <label htmlFor="captionItalic" className="mr-2 text-white">Italic:</label>
                <input
                    type="checkbox"
                    id="captionItalic"
                    checked={videoData.captionItalic || false} // Default to false
                    onChange={(e) => onVideoDataChange({ ...videoData, captionItalic: e.target.checked })}
                    className="bg-neutral-700 rounded"
                />

                <label htmlFor="captionUppercase" className="mr-2 text-white">Uppercase:</label>
                <input
                    type="checkbox"
                    id="captionUppercase"
                    checked={videoData.captionUppercase || false} // Default to false
                    onChange={(e) => onVideoDataChange({ ...videoData, captionUppercase: e.target.checked })}
                    className="bg-neutral-700 rounded"
                />



        </div>
    );
}


export default CaptionSettings;
