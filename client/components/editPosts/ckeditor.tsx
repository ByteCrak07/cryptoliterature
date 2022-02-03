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
  return <CKEditor editor={CustomEditor} {...props} />;
};

export default CKEditorWrapper;
