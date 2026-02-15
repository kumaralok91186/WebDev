import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor
            initialValue={defaultValue}
            init={
                {   initialValue: defaultValue,
                    height:500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table code help wordcount'
                    ],
                    toolbar: 
                        'undo redo | formatselect | bold italic | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | removeformat | help',
                    content_style: `
                            body {
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 16px;
                                line-height: 1.6;
                            }

                            h1 { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
                            h2 { font-size: 28px; margin-bottom: 10px; }
                            h3 { font-size: 24px; margin-bottom: 10px; }

                            p { margin: 0 0 15px 0; }

                            ul, ol { padding-left: 24px; margin-bottom: 15px; }

                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-bottom: 15px;
                            }
                            table, th, td {
                                border: 1px solid #ddd;
                            }
                            th, td {
                                padding: 8px;
                                text-align: left;
                            }

                            img {
                                max-width: 100%;
                                height: auto;
                                border-radius: 4px;
                            }

                            a {
                                color: #0d6efd;
                                text-decoration: underline;
                            }

                            .note {
                                background: #fffa9e;
                                padding: 10px;
                                border-left: 4px solid #f0c000;
                            }

                            .warning {
                                background: #ffe2e2;
                                padding: 10px;
                                border-left: 4px solid #e60000;
                            }`
                }}
                onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}