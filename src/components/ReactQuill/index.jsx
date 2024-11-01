import React, { useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react'; // Import ImageResize module
import 'react-quill/dist/quill.snow.css';

// Register ImageResize module
Quill.register('modules/imageResize', ImageResize);

const CustomQuillEditor = ({ value, onChange }) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ 'header': 1 }, { 'header': 2 }], // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
    [{ 'direction': 'rtl' }], // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,

    imageResize: {
      modules: ['Resize', 'DisplaySize'], 
    },
  };

  useEffect(() => {
    // Optional: Perform any setup or cleanup if necessary
  }, []);

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder=""
    />
  );
};

export default CustomQuillEditor;
