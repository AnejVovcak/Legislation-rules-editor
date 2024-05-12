import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

export function TextEditor ({onChange, value}: {onChange: (value: any) => void, value: string}) {
    const handleChange = (content: string) => {
        onChange(content);
    };
    return (
        <div className="text-editor" style={{width: '100%'}}>
            <EditorToolbar />
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                placeholder={""}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default TextEditor;