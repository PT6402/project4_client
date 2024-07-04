import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
// import * as FontFamilyPlugin from "@ckeditor/ckeditor5-font/src/fontfamily";
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
export default function CateFormDes() {
  return (
    <div className="my-10 w-full flex-1">
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
              // "|",
              // "bulletedList",
              // "numberedList",
              // "blockQuote",
              "|",
              "fontfamily",
              "fontsize",
              "fontColor",
              "fontBackgroundColor",
            ],
            // },
            // toolbar: [
            //   "bold",
            //   "italic",
            //   "|",
            //   "fontfamily",
            //   "fontsize",
            //   "fontColor",
            //   "fontBackgroundColor",
            // ],
          }}
          data={""}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event) => {
            console.log(event);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}
