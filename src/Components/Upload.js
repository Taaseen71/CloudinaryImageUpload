import React, { useState } from 'react'
export default function Upload() {

    const [fileInputState, setFileInputState] = useState('')
    // const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState()
    const [fileSize, setFileSize] = useState()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        setFileSize(e.target.files[0].size)
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }


    const uploadImage = async (base64EncodedImage) => {
        // console.log(base64EncodedImage)
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' }
            })
            setFileInputState('');
            setPreviewSource('');
            setFileSize('');
        } catch (error) {
            console.error(error)
        }
    }
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource)
    }



    return (
        <div>
            <h1>Upload</h1>
            <p>Please Upload an Image File under 10 mb</p>
            {previewSource && (
                <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
            )}
            {fileSize && (
                <p style={{ color: 'red' }}>FileSize = {fileSize / 1000000} mb</p>
            )}
            <form onSubmit={handleSubmitFile}>
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
                <button className='btn' type='submit'>Submit</button>
            </form>
        </div>
    )
}
