import { FC } from "react";
import CustomEditor from "ckeditor5-custom-build";
import CKEditor from "@ckeditor/ckeditor5-react";
import { ApiUrl } from "../../lib/keys";
import { getCookie } from "../../lib/general/cookies";

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
          uploadUrl: `${ApiUrl}/v1/upload/posts`,

          // Enable the XMLHttpRequest.withCredentials property.
          // withCredentials: true,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        },
      }}
      {...props}
    />
  );
};

export default CKEditorWrapper;
