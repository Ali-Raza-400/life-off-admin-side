import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, FormInstance } from "antd";
import Typography from "./Typography";

interface CkProps {
	form: FormInstance;
	dynamicField: string;
	label: string;
}

export default function GenericCkEditor({
	form,
	dynamicField,
	label,
}: CkProps) {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				"undo",
				"redo",
				"|",
				"heading",
				"|",
				"bold",
				"italic",
				"|",
				"link",
				"insertTable",
				"blockQuote",
				"|",
				"bulletedList",
				"numberedList",
				"outdent",
				"indent",
			],
		},
		initialData: form?.getFieldValue(dynamicField),
		placeholder: "Type or paste your content here!",
	};

	return (
		<div>
			<div className="main-container">
				<div
					className="editor-container editor-container_classic-editor"
					ref={editorContainerRef}
				>
					<div className="editor-container__editor">
						<div ref={editorRef}>
							<Typography variant="bodyMediumMedium" className="mb-2">
								{label}
							</Typography>

							<Form.Item name={dynamicField}>
								{isLayoutReady && (
									<CKEditor
										editor={ClassicEditor}
										config={editorConfig}
										onChange={(_event, editor) => {
											const data = editor?.getData();
											form?.setFieldsValue({ [dynamicField]: data });
										}}
										onBlur={(_event, editor) => {
											const data = editor.getData();
											form?.setFieldsValue({ [dynamicField]: data });
										}}
									/>
								)}
							</Form.Item>
						</div>
					</div>
				</div>
			</div>
			<Form />
		</div>
	);
}