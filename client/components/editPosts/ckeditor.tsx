import { FC } from "react";
import CustomEditor from "ckeditor5-custom-build";
import CKEditor from "@ckeditor/ckeditor5-react";

interface CKEditorWrapperProps {
  data?: string;
  disabled?: boolean;
  onReady?: (editor: any) => void;
  onChange?: (event: any, editor: any) => void;
  onBlur?: (event: any, editor: any) => void;
  onFocus?: (event: any, editor: any) => void;
}

const CKEditorWrapper: FC<CKEditorWrapperProps> = (props) => {
  return (
    <CKEditor
      editor={CustomEditor}
      config={{
        // Pass the config for SimpleUploadAdapter
        // https://ckeditor.com/docs/ckeditor5/latest/features/image-upload/simple-upload-adapter.html
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: "http://example.com",

          // Enable the XMLHttpRequest.withCredentials property.
          withCredentials: true,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            "X-CSRF-TOKEN": "CSRF-Token",
            Authorization: "Bearer <JSON Web Token>",
          },
        },
        imageRemoveEvent: {
          callback: (imagesSrc: string, nodeObjects: any) => {
            // note: imagesSrc is array of src & nodeObjects is array of nodeObject
            // node object api: https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_node-Node.html

            console.log("callback called", imagesSrc, nodeObjects);
          },
        },
      }}
      {...props}
    />
  );
};

export default CKEditorWrapper;
