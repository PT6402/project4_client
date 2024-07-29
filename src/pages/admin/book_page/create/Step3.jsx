/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import {
  FontColor,
  FontFamily,
  FontBackgroundColor,
  FontSize,
} from "@ckeditor/ckeditor5-font";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";

export default function Step3({ onChange }) {
  return (
    <div className="m-10 w-full">
      <div
        className="p-4 bg-gray-50 border-2 border-dashed border-gray-400 rounded-xl flex-1 h-full"
        id="editor"
      >
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [
              Undo,
              Essentials,
              Paragraph,
              Bold,
              Italic,
              FontColor,
              FontFamily,
              FontBackgroundColor,
              FontSize,
            ],
            toolbar: [
              "undo",
              "redo",
              "|",
              "bold",
              "italic",
              "|",
              "fontfamily",
              "fontsize",
              "fontColor",
              "fontBackgroundColor",
            ],
          }}
          // data={editorText}
          // onReady={(editor) => {
          //   editorRef.current = editor;
          //   console.log("Editor is ready to use!", editor);
          // }}
          onChange={onChange}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      {/* <div className="mt-4">
        <h2>Editor Text</h2>
        <pre>{editorText}</pre>
      </div> */}
    </div>
  );
}
