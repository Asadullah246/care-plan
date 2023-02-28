import { Editor } from '@tinymce/tinymce-react';
import { Button, Input, notification } from "antd";
import { useContext, useEffect, useRef, useState } from 'react';
import { createNewTemplate, updateTemplate } from "../../api";
import { replaceData } from '../../hooks/templateHooks';
import { AppContext } from "../../states/app.context";

const TemplateEditor = ({ data, mode }) => {
    const { gettingTemplateBuilderList, user, codesBreakdown, clientPlan, placeHolderData, patient } = useContext(AppContext);
    const [tiny, setTiny] = useState();
    const [name, setName] = useState('');
    console.log(codesBreakdown, "codesBreakdown");
    const editorRef = useRef(null);
    const handleChange = (e) => {
        setName(e.target.value);
    };
    const handleData = async () => {

        // if (tiny == null) return;
        let response;
        if (mode === "edit") {
            response = await updateTemplate(
                {
                    name: name,
                    data: editorRef.current.getContent(),
                    type: "Correctness-Care",
                },
                data._id
            );
        } else if (mode === "clone") {
            response = await createNewTemplate({
                name: name,
                data: editorRef.current.getContent(),
                type: "Correctness-Care",
            });
        } else {
            response = await createNewTemplate({
                name: name,
                data: editorRef.current.getContent(),
                type: "Correctness-Care",
            });
        }
        gettingTemplateBuilderList();
        // console.log(response);
        if (response?.status === 200 || response?.status === 201) {
            notification["success"]({
                message: `${mode === undefined ? "Creation" : mode} done`,
                description: `Template ${mode} completed`,
            });
        } else if (response.response.status === 413) {
            notification["warn"]({
                message: "File size too large",
                description: "Please try to keep your uploaded file size below 1MB",
            });
        } else {
            notification["error"]({
                message: "Error",
                description: "Something went wrong!",
            });
        }
    };
    useEffect(() => {
        if (data) {
            setName(data.name)
            if (mode === "pdf") {
                if (clientPlan.carePlan !== undefined) {
                    data.data = replaceData(data.data, patient, placeHolderData, codesBreakdown);
                } else {
                    notification['warn']({
                        message: "Not enough data!",
                        description: "Select all possible data to get template"
                    })
                }
            }
            setTiny(data.data);
        }
    }, [data, clientPlan]);
    return (
        <>
            <div style={{ margin: "0rem 1.5rem", textAlign: "center" }}>
                {mode === "pdf" ? (
                    <h1>{data?.name}</h1>
                ) : (
                    <p>
                        Template Name{" "}
                        <Input
                            name="name"
                            placeholder={data ? data.name : "Enter name"}
                            value={name}
                            style={{ width: 200 }}
                            onChange={handleChange}
                            type="text"
                        />
                    </p>
                )}
            </div>
            <Editor
                apiKey='bdpdsg55gk52c24y557d8v4h1ucxiyw0j3ln4xt3haugjyjb'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={tiny}
                init={{
                    height: 800,
                    menubar: 'file edit insert view format table tools help',
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'table', 'code', 'help', 'wordcount', 'pagebreak'
                    ],
                    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify' + 'pagebreak' +
                        'forecolor backcolor table pagebreak | help' +
                        'bullist numlist outdent indent | link image | print fullscreen | ',
                    pagebreak_separator: '<!-- page break here -->',
                    pagebreak_split_block: true,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
            {mode !== "pdf" ? (
                <Button onClick={handleData} style={{ margin: "2rem" }} type="primary">
                    {mode === "edit" ? "Update" : mode === "clone" ? "Clone" : "Save"}{" "}
                    Template
                </Button>
            ) : ''}
        </>
    );
};

export default TemplateEditor;